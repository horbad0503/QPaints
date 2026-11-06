<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../helpers/auth.php';
require_once __DIR__ . '/../../helpers/secrets.php';

require_method('POST');
$user_id = require_login();
$input = body();

$reference = $input['reference'] ?? '';
$shipping = $input['shipping'] ?? [];

if (!$reference || empty($shipping['fullname']) || empty($shipping['address'])) {
    json_response(['error' => 'Missing required data'], 400);
}

$secretKey = secret('PAYSTACK_SECRET_KEY');

// 1. Verify with Paystack
$url = "https://api.paystack.co/transaction/verify/" . rawurlencode($reference);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer $secretKey"]);
$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);

if (!$result || !isset($result['data']['status']) || $result['data']['status'] !== 'success') {
    json_response(['error' => 'Payment verification failed'], 400);
}

$amount = $result['data']['amount'] / 100; // Convert from kobo

try {
    $pdo->beginTransaction();

    // 2. Insert into orders
    $stmt = $pdo->prepare("
        INSERT INTO orders (user_id, reference, fullname, email, phone, address, city, state, additional_info, total_amount, status) 
        VALUES (:uid, :ref, :fullname, :email, :phone, :address, :city, :state, :info, :total, 'paid')
    ");
    $stmt->execute([
        'uid' => $user_id,
        'ref' => $reference,
        'fullname' => $shipping['fullname'],
        'email' => $shipping['email'],
        'phone' => $shipping['phone'],
        'address' => $shipping['address'],
        'city' => $shipping['city'],
        'state' => $shipping['state'],
        'info' => $shipping['additional_info'] ?? '',
        'total' => $amount
    ]);
    
    $order_id = $pdo->lastInsertId();

    // 3. Move cart items to order_items
    $stmt = $pdo->prepare("
        SELECT c.*, p.price 
        FROM cart c 
        JOIN products p ON c.product_id = p.id 
        WHERE c.user_id = :uid
    ");
    $stmt->execute(['uid' => $user_id]);
    $cartItems = $stmt->fetchAll();

    foreach ($cartItems as $item) {
        $subtotal = $item['price'] * $item['quantity'];
        $insertItem = $pdo->prepare("
            INSERT INTO order_items (order_id, product_id, quantity, price, subtotal) 
            VALUES (:oid, :pid, :qty, :price, :sub)
        ");
        $insertItem->execute([
            'oid' => $order_id,
            'pid' => $item['product_id'],
            'qty' => $item['quantity'],
            'price' => $item['price'],
            'sub' => $subtotal
        ]);
    }

    // 4. Clear cart
    $stmt = $pdo->prepare("DELETE FROM cart WHERE user_id = :uid");
    $stmt->execute(['uid' => $user_id]);

    $pdo->commit();

    json_response(['success' => true, 'order_id' => $order_id]);

} catch (Exception $e) {
    $pdo->rollBack();
    json_response(['error' => 'Database error: ' . $e->getMessage()], 500);
}
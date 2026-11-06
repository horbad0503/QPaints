<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../helpers/auth.php';

require_method('POST');
$user_id = require_login();
$input = body();

$product_id = (int)($input['product_id'] ?? 0);
$quantity = (int)($input['quantity'] ?? 1);

if ($product_id <= 0) json_response(['error' => 'Invalid product'], 400);

// Check stock
$checkStmt = $pdo->prepare("SELECT stock_status FROM products WHERE id = :id");
$checkStmt->execute(['id' => $product_id]);
$product = $checkStmt->fetch();

if (!$product || $product['stock_status'] !== 'In Stock') {
    json_response(['error' => 'Product out of stock'], 400);
}

$stmt = $pdo->prepare("SELECT id, quantity FROM cart WHERE user_id = :uid AND product_id = :pid");
$stmt->execute(['uid' => $user_id, 'pid' => $product_id]);
$existing = $stmt->fetch();

if ($existing) {
    $newQty = $existing['quantity'] + $quantity;
    $update = $pdo->prepare("UPDATE cart SET quantity = :qty WHERE id = :id");
    $update->execute(['qty' => $newQty, 'id' => $existing['id']]);
} else {
    $insert = $pdo->prepare("INSERT INTO cart (user_id, product_id, quantity) VALUES (:uid, :pid, :qty)");
    $insert->execute(['uid' => $user_id, 'pid' => $product_id, 'qty' => $quantity]);
}

$countStmt = $pdo->prepare("SELECT SUM(quantity) FROM cart WHERE user_id = :uid");
$countStmt->execute(['uid' => $user_id]);
$cart_count = (int)$countStmt->fetchColumn();

json_response(['success' => true, 'cart_count' => $cart_count]);
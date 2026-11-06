<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../helpers/auth.php';

$user_id = require_login();

$stmt = $pdo->prepare("
    SELECT c.id as cart_id, c.quantity, p.id as product_id, p.product_name, p.price, p.image_url, p.stock_status 
    FROM cart c 
    JOIN products p ON c.product_id = p.id 
    WHERE c.user_id = :uid
    ORDER BY c.created_at DESC
");
$stmt->execute(['uid' => $user_id]);
$items = $stmt->fetchAll();

$total = 0;
foreach ($items as &$item) {
    $item['subtotal'] = $item['price'] * $item['quantity'];
    $total += $item['subtotal'];
}

json_response([
    'items' => $items,
    'total' => $total,
    'count' => count($items)
]);
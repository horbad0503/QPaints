<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../helpers/auth.php';

$user_id = require_login();
$ref = $_GET['ref'] ?? '';

if (!$ref) {
    json_response(['error' => 'Order reference required'], 400);
}

// Fetch order
$stmt = $pdo->prepare("SELECT * FROM orders WHERE reference = :ref AND user_id = :uid LIMIT 1");
$stmt->execute(['ref' => $ref, 'uid' => $user_id]);
$order = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$order) {
    json_response(['error' => 'Order not found'], 404);
}

// Fetch items
$itemsStmt = $pdo->prepare("
    SELECT oi.*, p.product_name, p.image_url, p.size, p.color
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = :oid
");
$itemsStmt->execute(['oid' => $order['id']]);
$items = $itemsStmt->fetchAll(PDO::FETCH_ASSOC);

json_response([
    'order' => $order,
    'items' => $items
]);
<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../helpers/auth.php';

require_method('POST');
$user_id = require_login();
$input = body();

$product_id = (int)($input['product_id'] ?? 0);
$action = $input['action'] ?? '';

if ($product_id <= 0) json_response(['error' => 'Invalid product'], 400);

if ($action === 'like') {
    $stmt = $pdo->prepare("INSERT IGNORE INTO product_likes (user_id, product_id) VALUES (:uid, :pid)");
    $stmt->execute(['uid' => $user_id, 'pid' => $product_id]);
    $status = 'liked';
} else {
    $stmt = $pdo->prepare("DELETE FROM product_likes WHERE user_id = :uid AND product_id = :pid");
    $stmt->execute(['uid' => $user_id, 'pid' => $product_id]);
    $status = 'unliked';
}

$countStmt = $pdo->prepare("SELECT COUNT(*) FROM product_likes WHERE user_id = :uid");
$countStmt->execute(['uid' => $user_id]);
$wishlist_count = (int)$countStmt->fetchColumn();

json_response(['status' => $status, 'wishlist_count' => $wishlist_count]);
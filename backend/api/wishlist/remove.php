<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../helpers/auth.php';

require_method('POST');
$user_id = require_login();
$input = body();

$product_id = (int)($input['product_id'] ?? 0);
if ($product_id <= 0) json_response(['error' => 'Invalid product'], 400);

$stmt = $pdo->prepare("DELETE FROM product_likes WHERE user_id = :uid AND product_id = :pid");
$stmt->execute(['uid' => $user_id, 'pid' => $product_id]);

json_response(['success' => true]);
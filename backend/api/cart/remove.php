<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../helpers/auth.php';

require_method('POST');
$user_id = require_login();
$input = body();

$cart_id = (int)($input['cart_id'] ?? 0);
if ($cart_id <= 0) json_response(['error' => 'Invalid data'], 400);

$stmt = $pdo->prepare("DELETE FROM cart WHERE id = :id AND user_id = :uid");
$stmt->execute(['id' => $cart_id, 'uid' => $user_id]);

json_response(['success' => true]);
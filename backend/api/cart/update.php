<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../helpers/auth.php';

require_method('POST');
$user_id = require_login();
$input = body();

$cart_id = (int)($input['cart_id'] ?? 0);
$quantity = (int)($input['quantity'] ?? 1);

if ($cart_id <= 0 || $quantity < 1) json_response(['error' => 'Invalid data'], 400);

$stmt = $pdo->prepare("UPDATE cart SET quantity = :qty WHERE id = :id AND user_id = :uid");
$stmt->execute(['qty' => $quantity, 'id' => $cart_id, 'uid' => $user_id]);

json_response(['success' => true]);
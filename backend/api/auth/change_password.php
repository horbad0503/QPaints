<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../helpers/auth.php';

require_method('POST');
$user_id = require_login();
$input = body();

$current = $input['current_password'] ?? '';
$new = $input['new_password'] ?? '';

if (empty($current) || empty($new)) {
    json_response(['error' => 'All fields are required'], 422);
}
if (strlen($new) < 6) {
    json_response(['error' => 'New password must be at least 6 characters'], 422);
}

$stmt = $pdo->prepare("SELECT password FROM users WHERE id = :uid");
$stmt->execute(['uid' => $user_id]);
$user = $stmt->fetch();

if (!password_verify($current, $user['password'])) {
    json_response(['error' => 'Current password is incorrect'], 401);
}

$hashed = password_hash($new, PASSWORD_DEFAULT);
$update = $pdo->prepare("UPDATE users SET password = :pw WHERE id = :uid");
$update->execute(['pw' => $hashed, 'uid' => $user_id]);

json_response(['success' => true, 'message' => 'Password changed successfully']);
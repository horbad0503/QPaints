<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../config/session.php';

require_method('POST');
$input = body();
$username = trim($input['username'] ?? '');
$password = $input['password'] ?? '';

$stmt = $pdo->prepare("SELECT id, username, password FROM admins WHERE username = :u LIMIT 1");
$stmt->execute(['u' => $username]);
$admin = $stmt->fetch();

if (!$admin || !password_verify($password, $admin['password'])) {
    json_response(['error' => 'Invalid admin credentials'], 401);
}

$_SESSION['admin_id'] = $admin['id'];
$_SESSION['admin_username'] = $admin['username'];

json_response(['success' => true, 'message' => 'Welcome to the Admin Panel']);
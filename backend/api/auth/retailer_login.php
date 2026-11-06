<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../config/session.php';

require_method('POST');
$input = body();

$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

if (empty($email) || empty($password)) {
    json_response(['error' => 'All fields are required.'], 422);
}

$stmt = $pdo->prepare("SELECT id, full_name, email, password, is_verified, rc_verified FROM retailers WHERE email = :email LIMIT 1");
$stmt->execute(['email' => $email]);
$retailer = $stmt->fetch();

if (!$retailer || !password_verify($password, $retailer['password'])) {
    json_response(['error' => 'Invalid email or password.'], 401);
}

if ((int)$retailer['is_verified'] !== 1) {
    json_response(['error' => 'Please verify your email before logging in.'], 403);
}

$_SESSION['retailer_id']    = $retailer['id'];
$_SESSION['retailer_name']  = $retailer['full_name'];
$_SESSION['retailer_email'] = $retailer['email'];

json_response(['success' => true, 'message' => 'Login successful.']);
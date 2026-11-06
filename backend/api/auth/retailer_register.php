<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../config/session.php';

require_method('POST');
$input = body();

$fullname = trim($input['fullname'] ?? '');
$email    = trim($input['email'] ?? '');
$rc       = trim($input['rc'] ?? '');
$password = $input['password'] ?? '';

if (empty($fullname) || empty($email) || empty($rc) || empty($password)) {
    json_response(['error' => 'Please fill in all required fields'], 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['error' => 'Invalid email address'], 422);
}

if (strlen($password) < 6) {
    json_response(['error' => 'Password must be at least 6 characters'], 422);
}

// Check if email exists in retailers or users
$stmt = $pdo->prepare("SELECT id FROM retailers WHERE email = :email UNION SELECT id FROM users WHERE email = :email");
$stmt->execute(['email' => $email]);
if ($stmt->rowCount() > 0) {
    json_response(['error' => 'Email already registered'], 409);
}

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert retailer (auto-verified for testing)
$stmt = $pdo->prepare("
    INSERT INTO retailers (full_name, email, rc, password, is_verified, rc_verified) 
    VALUES (:fullname, :email, :rc, :password, 1, 1)
");
$stmt->execute([
    'fullname' => $fullname,
    'email' => $email,
    'rc' => $rc,
    'password' => $hashed_password
]);

$retailer_id = $pdo->lastInsertId();

// Log them in
$_SESSION['retailer_id']   = $retailer_id;
$_SESSION['retailer_name'] = $fullname;
$_SESSION['retailer_email'] = $email;

json_response(['success' => true, 'message' => 'Retailer account created successfully']);
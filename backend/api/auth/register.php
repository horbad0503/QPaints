<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../config/session.php';

require_method('POST');
$input = body();

$fullname = trim($input['fullname'] ?? '');
$username = trim($input['username'] ?? '');
$email    = trim($input['email'] ?? '');
$phone    = trim($input['phone'] ?? '');
$password = $input['password'] ?? '';

if (empty($fullname) || empty($username) || empty($email) || empty($password)) {
    json_response(['error' => 'Please fill in all required fields'], 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['error' => 'Invalid email address'], 422);
}

if (strlen($password) < 6) {
    json_response(['error' => 'Password must be at least 6 characters'], 422);
}

// Check if email or username exists
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email OR username = :username");
$stmt->execute(['email' => $email, 'username' => $username]);
if ($stmt->rowCount() > 0) {
    json_response(['error' => 'Username or email already taken'], 409);
}

// Hash password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert user (is_verified set to 1 for immediate testing, change to 0 for production email verification)
$stmt = $pdo->prepare("
    INSERT INTO users (full_name, username, email, phone, password, is_verified) 
    VALUES (:fullname, :username, :email, :phone, :password, 1)
");
$stmt->execute([
    'fullname' => $fullname,
    'username' => $username,
    'email' => $email,
    'phone' => $phone,
    'password' => $hashed_password
]);

$user_id = $pdo->lastInsertId();

// Automatically log the user in
$_SESSION['user_id']   = $user_id;
$_SESSION['username']  = $username;
$_SESSION['full_name'] = $fullname;
$_SESSION['email']     = $email;

json_response(['success' => true, 'message' => 'Account created successfully']);
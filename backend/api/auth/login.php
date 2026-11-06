<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../config/session.php';

require_method('POST');
$input = body();
$identifier = trim($input['identifier'] ?? '');
$password   = $input['password'] ?? '';

if ($identifier === '' || $password === '') {
    json_response(['error' => 'All fields are required.'], 422);
}

$stmt = $pdo->prepare(
    "SELECT id, full_name, username, email, password, is_verified
     FROM users WHERE username = :u OR email = :u LIMIT 1"
);
$stmt->execute(['u' => $identifier]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password'])) {
    json_response(['error' => 'Invalid username/email or password.'], 401);
}
if ((int)$user['is_verified'] !== 1) {
    json_response(['error' => 'Please verify your email before logging in.'], 403);
}

$_SESSION['user_id']   = $user['id'];
$_SESSION['username']  = $user['username'];
$_SESSION['full_name'] = $user['full_name'];
$_SESSION['email']     = $user['email'];

json_response([
    'success' => true,
    'user' => [
        'id'        => $user['id'],
        'username'  => $user['username'],
        'fullName'  => $user['full_name'],
        'email'     => $user['email'],
    ],
]);
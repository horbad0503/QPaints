<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../helpers/auth.php';

require_method('POST');
$user_id = require_login();
$input = body();

$fullname = trim($input['full_name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$address = trim($input['address'] ?? '');
$city = trim($input['city'] ?? '');
$state = trim($input['state'] ?? '');
$bio = trim($input['bio'] ?? '');

if (empty($fullname) || empty($email)) {
    json_response(['error' => 'Name and email are required'], 422);
}

$check = $pdo->prepare("SELECT id FROM users WHERE email = :email AND id != :uid");
$check->execute(['email' => $email, 'uid' => $user_id]);
if ($check->rowCount() > 0) {
    json_response(['error' => 'Email is already in use by another account'], 409);
}

$stmt = $pdo->prepare("UPDATE users SET full_name = :fn, email = :em, phone = :ph, address = :addr, city = :city, state = :state, bio = :bio WHERE id = :uid");
$stmt->execute([
    'fn' => $fullname, 'em' => $email, 'ph' => $phone, 
    'addr' => $address, 'city' => $city, 'state' => $state, 'bio' => $bio, 
    'uid' => $user_id
]);

$_SESSION['full_name'] = $fullname;
$_SESSION['email'] = $email;

json_response(['success' => true, 'message' => 'Profile updated successfully']);
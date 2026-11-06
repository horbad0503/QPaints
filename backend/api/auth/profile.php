<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../helpers/auth.php';

$user_id = require_login();

$stmt = $pdo->prepare("SELECT id, full_name, username, email, phone, address, city, state, bio, profile_picture, created_at FROM users WHERE id = :uid");
$stmt->execute(['uid' => $user_id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user['profile_picture'] && strpos($user['profile_picture'], 'http') === false) {
    $user['profile_picture'] = 'http://localhost/qualitas-rebuild/backend/' . $user['profile_picture'];
}

json_response(['user' => $user]);
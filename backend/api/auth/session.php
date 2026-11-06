<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../config/session.php';

if (empty($_SESSION['user_id'])) {
    json_response(['authenticated' => false]);
}

$uid = $_SESSION['user_id'];

// Fetch fresh user data
$stmt = $pdo->prepare("SELECT id, username, full_name, email, profile_picture FROM users WHERE id = :uid");
$stmt->execute(['uid' => $uid]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Format the profile picture URL if it exists
$profilePic = $user['profile_picture'] ?? null;
if ($profilePic && strpos($profilePic, 'http') === false) {
    $profilePic = 'http://localhost/qualitas-rebuild/backend/' . $profilePic;
}

// Include cart + wishlist counts
$cart = $pdo->prepare("SELECT COALESCE(SUM(quantity),0) FROM cart WHERE user_id = ?");
$cart->execute([$uid]);

$wish = $pdo->prepare("SELECT COUNT(*) FROM product_likes WHERE user_id = ?");
$wish->execute([$uid]);

json_response([
    'authenticated' => true,
    'user' => [
        'id'       => $user['id'],
        'username' => $user['username'],
        'fullName' => $user['full_name'] ?? '',
        'email'    => $user['email'] ?? '',
        'profile_picture' => $profilePic
    ],
    'cartCount'     => (int)$cart->fetchColumn(),
    'wishlistCount' => (int)$wish->fetchColumn(),
]);
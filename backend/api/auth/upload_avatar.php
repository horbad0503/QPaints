<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../helpers/auth.php';

require_method('POST');
$user_id = require_login();

if (!isset($_FILES['avatar']) || $_FILES['avatar']['error'] !== UPLOAD_ERR_OK) {
    json_response(['error' => 'No file uploaded or upload error'], 400);
}

$file = $_FILES['avatar'];
$allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
$maxSize = 5 * 1024 * 1024; // 5MB

if (!in_array($file['type'], $allowedTypes)) {
    json_response(['error' => 'Invalid file type. Only JPG, PNG, and WEBP allowed.'], 400);
}
if ($file['size'] > $maxSize) {
    json_response(['error' => 'File is too large. Max 5MB.'], 400);
}

$uploadDir = __DIR__ . '/../../uploads/avatars/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = 'avatar_' . $user_id . '_' . time() . '.' . $extension;
$destination = $uploadDir . $filename;

// Remove old avatar if exists
$stmt = $pdo->prepare("SELECT profile_picture FROM users WHERE id = :uid");
$stmt->execute(['uid' => $user_id]);
$oldAvatar = $stmt->fetchColumn();

if ($oldAvatar && strpos($oldAvatar, 'uploads/') === 0) {
    $oldPath = __DIR__ . '/../../' . $oldAvatar;
    if (file_exists($oldPath) && is_file($oldPath)) {
        unlink($oldPath);
    }
}

if (move_uploaded_file($file['tmp_name'], $destination)) {
    $dbPath = 'uploads/avatars/' . $filename;
    $stmt = $pdo->prepare("UPDATE users SET profile_picture = :pic WHERE id = :uid");
    $stmt->execute(['pic' => $dbPath, 'uid' => $user_id]);
    
    // Return full URL for frontend display
    $fullUrl = 'http://localhost/qualitas-rebuild/backend/' . $dbPath;
    json_response(['success' => true, 'profile_picture' => $fullUrl]);
} else {
    json_response(['error' => 'Failed to move uploaded file.'], 500);
}
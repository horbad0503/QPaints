<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';

$username = 'admin';
$password = password_hash('admin123', PASSWORD_DEFAULT);

try {
    // Fix: Use :p1 and :p2 instead of reusing :p
    $stmt = $pdo->prepare("INSERT INTO admins (username, password) VALUES (:u, :p1) ON DUPLICATE KEY UPDATE password = :p2");
    $stmt->execute(['u' => $username, 'p1' => $password, 'p2' => $password]);
    
    echo "Admin created successfully!<br>";
    echo "Username: <strong>admin</strong><br>";
    echo "Password: <strong>admin123</strong>";
} catch (PDOException $e) {
    echo "Error creating admin: " . $e->getMessage();
}
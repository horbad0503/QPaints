<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../config/session.php';

if (empty($_SESSION['admin_id'])) json_response(['error' => 'Unauthorized'], 401);

$stmt = $pdo->query("
    SELECT o.*, u.full_name as user_name 
    FROM orders o 
    JOIN users u ON o.user_id = u.id 
    ORDER BY o.created_at DESC
");
json_response(['orders' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
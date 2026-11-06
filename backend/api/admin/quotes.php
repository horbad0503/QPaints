<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../config/session.php';

if (empty($_SESSION['admin_id'])) json_response(['error' => 'Unauthorized'], 401);

$stmt = $pdo->query("
    SELECT q.*, u.full_name as user_name, u.email as user_email 
    FROM quote_requests q 
    JOIN users u ON q.user_id = u.id 
    ORDER BY q.created_at DESC
");
json_response(['quotes' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
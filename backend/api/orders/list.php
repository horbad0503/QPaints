<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../helpers/auth.php';

$user_id = require_login();

$stmt = $pdo->prepare("
    SELECT id, reference, total_amount, status, created_at 
    FROM orders 
    WHERE user_id = :uid 
    ORDER BY created_at DESC
");
$stmt->execute(['uid' => $user_id]);
$orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

json_response(['orders' => $orders]);
<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../helpers/auth.php';

$user_id = require_login();

$stmt = $pdo->prepare("
    SELECT p.*, pl.created_at as liked_date 
    FROM product_likes pl 
    JOIN products p ON pl.product_id = p.id 
    WHERE pl.user_id = :uid 
    ORDER BY pl.created_at DESC
");
$stmt->execute(['uid' => $user_id]);
$items = $stmt->fetchAll(PDO::FETCH_ASSOC);

json_response(['items' => $items]);
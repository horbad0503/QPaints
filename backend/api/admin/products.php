<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../config/session.php';

if (empty($_SESSION['admin_id'])) json_response(['error' => 'Unauthorized'], 401);

$stmt = $pdo->query("SELECT * FROM products ORDER BY created_at DESC");
json_response(['products' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
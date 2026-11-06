<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../config/session.php';

if (empty($_SESSION['admin_id'])) {
    json_response(['error' => 'Unauthorized'], 401);
}

// Get Stats
$totalSales = $pdo->query("SELECT SUM(total_amount) FROM orders WHERE status = 'paid'")->fetchColumn() ?: 0;
$totalOrders = $pdo->query("SELECT COUNT(*) FROM orders")->fetchColumn() ?: 0;
$totalProducts = $pdo->query("SELECT COUNT(*) FROM products")->fetchColumn() ?: 0;
$pendingQuotes = $pdo->query("SELECT COUNT(*) FROM quote_requests WHERE status = 'pending'")->fetchColumn() ?: 0;

// Recent Orders
$recentOrders = $pdo->query("
    SELECT o.id, o.reference, u.full_name, o.total_amount, o.status, o.created_at 
    FROM orders o 
    JOIN users u ON o.user_id = u.id 
    ORDER BY o.created_at DESC LIMIT 5
")->fetchAll(PDO::FETCH_ASSOC);

json_response([
    'stats' => [
        'sales' => (float)$totalSales,
        'orders' => (int)$totalOrders,
        'products' => (int)$totalProducts,
        'quotes' => (int)$pendingQuotes
    ],
    'recentOrders' => $recentOrders
]);
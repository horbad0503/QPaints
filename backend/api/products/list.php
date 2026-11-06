<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../config/session.php';

$user_id = $_SESSION['user_id'] ?? 0;

$search     = $_GET['search'] ?? '';
$categories = $_GET['category'] ?? [];
$stocks     = $_GET['stock'] ?? [];
$sizes      = $_GET['size'] ?? [];
$colors     = $_GET['color'] ?? [];
$sort       = $_GET['sort'] ?? 'newest';
$page       = max(1, (int)($_GET['page'] ?? 1));
$limit      = 6;
$offset     = ($page - 1) * $limit;

$where = [];
$params = [];

if ($search) {
    $where[] = "p.product_name LIKE :search";
    $params[':search'] = "%$search%";
}

if (!empty($categories)) {
    $in = [];
    foreach ($categories as $i => $c) {
        $key = ":cat_$i";
        $in[] = $key;
        $params[$key] = $c;
    }
    $where[] = "p.category IN (" . implode(',', $in) . ")";
}

if (!empty($stocks)) {
    $in = [];
    foreach ($stocks as $i => $s) {
        $key = ":stock_$i";
        $in[] = $key;
        $params[$key] = $s;
    }
    $where[] = "p.stock_status IN (" . implode(',', $in) . ")";
}

if (!empty($sizes)) {
    $in = [];
    foreach ($sizes as $i => $s) {
        $key = ":size_$i";
        $in[] = $key;
        $params[$key] = $s;
    }
    $where[] = "p.size IN (" . implode(',', $in) . ")";
}

if (!empty($colors)) {
    $in = [];
    foreach ($colors as $i => $c) {
        $key = ":color_$i";
        $in[] = $key;
        $params[$key] = $c;
    }
    $where[] = "p.color IN (" . implode(',', $in) . ")";
}

$whereClause = count($where) > 0 ? "WHERE " . implode(" AND ", $where) : "";

$sortMap = [
    'newest' => 'p.created_at DESC',
    'name_asc' => 'p.product_name ASC',
    'name_desc' => 'p.product_name DESC',
    'price_low' => 'p.price ASC',
    'price_high' => 'p.price DESC',
    'popular' => 'p.review_count DESC'
];
$orderBy = $sortMap[$sort] ?? $sortMap['newest'];

// Count Query
$countSql = "SELECT COUNT(*) FROM products p $whereClause";
$countStmt = $pdo->prepare($countSql);
$countStmt->execute($params);
$total = $countStmt->fetchColumn();
$totalPages = ceil($total / $limit);

// Data Query
$sql = "SELECT p.*, IF(pl.id IS NULL, 0, 1) as is_liked 
        FROM products p 
        LEFT JOIN product_likes pl ON p.id = pl.product_id AND pl.user_id = :user_id
        $whereClause
        ORDER BY $orderBy
        LIMIT :limit OFFSET :offset";

$stmt = $pdo->prepare($sql);
foreach ($params as $k => $v) {
    $stmt->bindValue($k, $v);
}
$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();

$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

json_response([
    'products' => $products,
    'total' => (int)$total,
    'totalPages' => (int)$totalPages,
    'currentPage' => $page
]);
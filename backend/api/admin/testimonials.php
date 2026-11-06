<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../config/session.php';

if (empty($_SESSION['admin_id'])) json_response(['error' => 'Unauthorized'], 401);

try {
    $individual = $pdo->query("SELECT * FROM individual_testimonials ORDER BY submission_date DESC")->fetchAll(PDO::FETCH_ASSOC);
    $company = $pdo->query("SELECT * FROM company_testimonials ORDER BY submission_date DESC")->fetchAll(PDO::FETCH_ASSOC);

    json_response([
        'individual' => $individual ?: [],
        'company' => $company ?: []
    ]);
} catch (PDOException $e) {
    // If tables don't exist, return empty arrays instead of crashing
    json_response([
        'individual' => [],
        'company' => [],
        'debug_error' => $e->getMessage()
    ]);
}
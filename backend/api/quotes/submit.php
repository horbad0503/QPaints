<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../helpers/auth.php';

require_method('POST');
$user_id = require_login();
$input = body();

if (empty($input['project_type']) || empty($input['building_type']) || empty($input['plan'])) {
    json_response(['error' => 'Missing required fields'], 422);
}

$stmt = $pdo->prepare("
    INSERT INTO quote_requests (user_id, project_type, building_type, plan, room_area, liters, estimated_cost) 
    VALUES (:uid, :proj, :build, :plan, :area, :liters, :cost)
");

try {
    $stmt->execute([
        'uid' => $user_id,
        'proj' => $input['project_type'],
        'build' => $input['building_type'],
        'plan' => $input['plan'],
        'area' => $input['room_area'],
        'liters' => $input['liters'],
        'cost' => $input['estimated_cost']
    ]);
    
    json_response(['success' => true, 'message' => 'Quote requested successfully! We will contact you soon.']);
} catch (PDOException $e) {
    json_response(['error' => 'Failed to submit quote request'], 500);
}
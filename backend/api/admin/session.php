<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/session.php';
require_once __DIR__ . '/../../helpers/response.php';

if (empty($_SESSION['admin_id'])) {
    json_response(['authenticated' => false]);
}

json_response([
    'authenticated' => true,
    'admin' => [
        'id' => $_SESSION['admin_id'],
        'username' => $_SESSION['admin_username']
    ]
]);
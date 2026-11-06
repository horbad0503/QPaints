<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/session.php';
require_once __DIR__ . '/../../helpers/response.php';

unset($_SESSION['admin_id']);
unset($_SESSION['admin_username']);
session_destroy();

json_response(['success' => true]);
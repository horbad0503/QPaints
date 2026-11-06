<?php
// backend/helpers/auth.php
require_once __DIR__ . '/../config/session.php';

function require_login(): int {
    if (empty($_SESSION['user_id'])) {
        json_response(['error' => 'Unauthenticated'], 401);
    }
    return (int) $_SESSION['user_id'];
}

function require_admin(): string {
    if (empty($_SESSION['admin_logged_in'])) {
        json_response(['error' => 'Forbidden'], 403);
    }
    return $_SESSION['admin_username'] ?? 'admin';
}
<?php
require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../helpers/secrets.php';

$client = new Google_Client();
$client->setClientId(secret('GOOGLE_CLIENT_ID'));
$client->setClientSecret(secret('GOOGLE_CLIENT_SECRET'));
$client->setRedirectUri('http://localhost/qualitas-rebuild/backend/api/auth/google_callback.php');
$client->addScope('email');
$client->addScope('profile');

header('Location: ' . $client->createAuthUrl());
exit;
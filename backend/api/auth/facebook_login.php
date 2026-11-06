<?php
session_start();
require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../helpers/secrets.php';

$fb = new \Facebook\Facebook([
  'app_id' => secret('FACEBOOK_APP_ID'),
  'app_secret' => secret('FACEBOOK_APP_SECRET'),
  'default_graph_version' => 'v18.0',
]);

$helper = $fb->getRedirectLoginHelper();
$permissions = ['public_profile', 'email'];
$callbackUrl = 'http://localhost/qualitas-rebuild/backend/api/auth/facebook_callback.php';
$loginUrl = $helper->getLoginUrl($callbackUrl, $permissions);

header('Location: ' . $loginUrl);
exit;
<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/session.php';
require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../helpers/secrets.php';

$fb = new \Facebook\Facebook([
  'app_id' => secret('FACEBOOK_APP_ID'),
  'app_secret' => secret('FACEBOOK_APP_SECRET'),
  'default_graph_version' => 'v18.0',
]);

$helper = $fb->getRedirectLoginHelper();

try {
    $accessToken = $helper->getAccessToken();
    if (!isset($accessToken)) {
        header("Location: http://localhost:3000/login?error=facebook_no_token");
        exit;
    }

    $response = $fb->get('/me?fields=id,name,email', $accessToken);
    $user = $response->getGraphUser();

    $facebookId = $user['id'];
    $fullName = $user['name'];
    $email = $user['email'] ?? ($facebookId . '@facebook.com');

    $stmt = $pdo->prepare("SELECT * FROM users WHERE facebook_id = :fid OR email = :em LIMIT 1");
    $stmt->execute(['fid' => $facebookId, 'em' => $email]);
    $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existingUser) {
        if (empty($existingUser['facebook_id'])) {
            $update = $pdo->prepare("UPDATE users SET facebook_id = :fid WHERE id = :id");
            $update->execute(['fid' => $facebookId, 'id' => $existingUser['id']]);
        }
        $userId = $existingUser['id'];
        $username = $existingUser['username'];
        $sessionFullName = $existingUser['full_name'] ?? $fullName;
    } else {
        $username = 'fb_' . $facebookId;
        $stmt = $pdo->prepare("INSERT INTO users (full_name, email, username, password, facebook_id, is_verified) VALUES (:fn, :em, :un, '', :fid, 1)");
        $stmt->execute(['fn' => $fullName, 'em' => $email, 'un' => $username, 'fid' => $facebookId]);
        $userId = $pdo->lastInsertId();
        $sessionFullName = $fullName;
    }

    $_SESSION['user_id']   = $userId;
    $_SESSION['username']  = $username;
    $_SESSION['full_name'] = $sessionFullName;
    $_SESSION['email']     = $email;

    header("Location: http://localhost:3000/");
    exit;

} catch (Exception $e) {
    error_log("Facebook OAuth exception: " . $e->getMessage());
    header("Location: http://localhost:3000/login?error=facebook_exception");
    exit;
}
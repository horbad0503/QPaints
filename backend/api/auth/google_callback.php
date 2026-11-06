<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/session.php';
require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../helpers/secrets.php';

$client = new Google_Client();
$client->setClientId(secret('GOOGLE_CLIENT_ID'));
$client->setClientSecret(secret('GOOGLE_CLIENT_SECRET'));
$client->setRedirectUri('http://localhost/qualitas-rebuild/backend/api/auth/google_callback.php');

// No code = someone hit this URL directly
if (!isset($_GET['code'])) {
    header("Location: http://localhost:3000/login?error=google_no_code");
    exit;
}

try {
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);

    if (isset($token["error"])) {
        // Log error and redirect to login with error message
        error_log("Google OAuth error: " . $token['error'] . " - " . ($token['error_description'] ?? ''));
        header("Location: http://localhost:3000/login?error=google_auth_failed");
        exit;
    }

    $client->setAccessToken($token['access_token']);
    $oauth = new Google_Service_Oauth2($client);
    $userInfo = $oauth->userinfo->get();

    $email = $userInfo->email;
    $fullName = $userInfo->name;
    $googleId = $userInfo->id;

    // Check if user exists
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email OR google_id = :gid LIMIT 1");
    $stmt->execute(['email' => $email, 'gid' => $googleId]);
    $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existingUser) {
        if (empty($existingUser['google_id'])) {
            $update = $pdo->prepare("UPDATE users SET google_id = :gid WHERE id = :id");
            $update->execute(['gid' => $googleId, 'id' => $existingUser['id']]);
        }
        $userId = $existingUser['id'];
        $username = $existingUser['username'];
        $sessionFullName = $existingUser['full_name'] ?? $fullName;
    } else {
        $username = explode("@", $email)[0];
        $originalUsername = $username;
        $i = 1;
        while (true) {
            $check = $pdo->prepare("SELECT id FROM users WHERE username = :username");
            $check->execute(['username' => $username]);
            if ($check->rowCount() == 0) break;
            $username = $originalUsername . $i;
            $i++;
        }
        $stmt = $pdo->prepare("INSERT INTO users (full_name, email, username, password, google_id, is_verified) VALUES (:fn, :em, :un, '', :gid, 1)");
        $stmt->execute(['fn' => $fullName, 'em' => $email, 'un' => $username, 'gid' => $googleId]);
        $userId = $pdo->lastInsertId();
        $sessionFullName = $fullName;
    }

    // Set session
    $_SESSION['user_id']   = $userId;
    $_SESSION['username']  = $username;
    $_SESSION['full_name'] = $sessionFullName;
    $_SESSION['email']     = $email;

    // Silent redirect to app
    header("Location: http://localhost:3000/");
    exit;

} catch (Exception $e) {
    error_log("Google OAuth exception: " . $e->getMessage());
    header("Location: http://localhost:3000/login?error=google_exception");
    exit;
}
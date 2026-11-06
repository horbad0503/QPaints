<?php
/**
 * Secret Loader
 * Returns a secret by key from secrets.php, or falls back to env/getenv.
 */
function secret(string $key, $default = null) {
    static $secrets = null;
    if ($secrets === null) {
        $path = __DIR__ . '/../config/secrets.php';
        if (file_exists($path)) {
            $secrets = require $path;
        } else {
            $secrets = [];
        }
    }
    return $secrets[$key] ?? getenv($key) ?: $default;
}
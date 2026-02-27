<?php
// This generates the hash for password123
$password = 'password123';
$hash = password_hash($password, PASSWORD_DEFAULT);

echo "Password: " . $password . "\n";
echo "Hash: " . $hash . "\n";
echo "\nNow run this SQL:\n";
echo "UPDATE users SET password = '" . $hash . "' WHERE id = 1;";
?>
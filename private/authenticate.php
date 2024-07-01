<?php
// authenticate.php
session_start();
require 'users.php';

$username = $_POST['username'];
$password = $_POST['password'];

// Assuming $users array is defined in users.php with hashed passwords
if (isset($users[$username]) && password_verify($password, $users[$username])) {
    $_SESSION['loggedin'] = true;
    $_SESSION['username'] = $username;
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>

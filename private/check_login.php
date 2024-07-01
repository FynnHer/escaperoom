<?php
session_start();

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    echo json_encode(['loggedIn' => false]);
    exit;
}

echo json_encode(['loggedIn' => true]);
?>

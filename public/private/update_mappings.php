<?php
// public/private/update_mappings.php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    file_put_contents('../mappings.json', json_encode($data, JSON_PRETTY_PRINT));
    echo json_encode(['success' => true]);
}
?>

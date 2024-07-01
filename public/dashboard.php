<?php
session_start();
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header('Location: login.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/ScrollMagic.min.js"></script>
    <script src="scripts/main.js" defer></script>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#" id="nav-puzzles">Rätsel</a></li>
                <li><a href="#" id="nav-mappings">Mappings</a></li>
                <li><a href="#" id="nav-camera">Kamera</a></li>
                <li><a href="#">Einstellungen</a></li>
                <li><a href="#" id="logout">Logout</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section id="puzzles-section">
            <h2>Rätsel</h2>
            <div id="puzzle-list"></div>
        </section>
        <section id="mappings-section" class="hidden">
            <h2>Mappings</h2>
            <div id="mapping-list"></div>
            <button id="add-mapping">Mapping hinzufügen</button>
        </section>
        <section id="camera-section" class="hidden">
            <h2>Kamera</h2>
            <div>
                <img src="{{ url_for('video_feed', camera_id=0) }}" width="320" height="240">
                <img src="{{ url_for('video_feed', camera_id=1) }}" width="320" height="240">
                <img src="{{ url_for('video_feed', camera_id=2) }}" width="320" height="240">
                <img src="{{ url_for('video_feed', camera_id=3) }}" width="320" height="240">
            </div>
        </section>
    </main>
</body>
</html>

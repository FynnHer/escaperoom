<?php
session_start();

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    // Redirect to login page or handle unauthorized access
    header('Location: /login.php');
    exit;
}
?>

<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Escape Room Kontrollseite</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="login-page">
        <h2>Login</h2>
        <form id="login-form" action="../private/authenticate.php" method="post">
            <input type="text" id="username" name="username" placeholder="Benutzername" required>
            <input type="password" id="password" name="password" placeholder="Passwort" required>
            <button type="submit">Login</button>
        </form>
        <p id="login-error" class="hidden">Falscher Benutzername oder Passwort</p>
    </div>
    <div id="main-page" class="hidden">
        <header>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Puzzles</a></li>
                    <li><a href="#">Über uns</a></li>
                    <li><a href="#">Kontakt</a></li>
                    <li><a href="#" id="logout">Logout</a></li>
                </ul>
            </nav>
        </header>
        <main>
            <section id="live-view">
                <h1>Live-Ansicht</h1>
                <img src="placeholder.jpg" alt="Platzhalter für den Live-Stream" style="width:100%;max-width:600px;">
            </section>
            <section id="puzzles">
                <h2>Puzzles</h2>
                <div id="puzzle-list"></div>
            </section>
        </main>
    </div>
    <script src="scripts.js"></script>
</body>
</html>

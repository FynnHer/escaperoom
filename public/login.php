<?php
// login.php
session_start();

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    header('Location: dashboard.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
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
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const loginForm = document.getElementById('login-form');
            const loginError = document.getElementById('login-error');

            loginForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(loginForm);
                fetch(loginForm.action, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        window.location.href = 'dashboard.php';
                    } else {
                        loginError.classList.remove('hidden');
                    }
                })
                .catch(error => {
                    console.error('Error during login:', error);
                    loginError.classList.remove('hidden');
                });
            });
        });
    </script>
</body>
</html>

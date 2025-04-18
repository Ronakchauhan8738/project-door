<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header("Location: ../auth/login.php");
    exit();
}

// Load header and footer with HTML content in between

readfile('dashboard.html');
?>

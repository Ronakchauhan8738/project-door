<?php
session_start();
include '../includes/db_connect.php'; // Go back one level

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    // Simple authentication (No security for now)
    $sql = "SELECT * FROM admin WHERE username = '$user' AND password = '$pass'";
    $result = mysqli_query($connect, $sql);

    if (mysqli_num_rows($result) > 0) {
        $_SESSION['admin'] = $user;
        header("Location: ../dashboard/dashboard.php"); // Go back to root folder
        exit;
    } else {
        echo "<h3>Invalid Username or Password</h3>";
    }
}
?>

<?php
session_start();
session_unset(); // Remove session variables
session_destroy(); // Destroy session
header("Location: ../login/admin_login.html"); // Redirect to login page
exit;
?>
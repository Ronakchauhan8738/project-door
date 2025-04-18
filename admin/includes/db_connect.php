<?php
$server = "localhost";
$username = "root";
$password = "";
$database = "desistardoors";

$connect = mysqli_connect($server, $username, $password, $database);

if (!$connect) {
    die("Connection Failed: " . mysqli_connect_error());
}
?>
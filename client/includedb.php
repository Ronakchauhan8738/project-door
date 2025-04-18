<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "desistardoors";

    $connect = mysqli_connect($servername, $username, $password, $dbname);

    if(!$connect){
        echo "Error connecting to database";
    }
?>
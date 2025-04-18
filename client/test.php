<?php
    include 'includedb.php';

    // Get and sanitize form data
    $name = $connect->real_escape_string($_POST['name']);
    $email = $connect->real_escape_string($_POST['email']);
    $phone = $connect->real_escape_string($_POST['phone']);
    $state = $connect->real_escape_string($_POST['state']);
    $message = $connect->real_escape_string($_POST['message']);

    // Insert data into database
    $sql = "INSERT INTO contact_form (name, email, phone, state, message)
            VALUES ('$name', '$email', '$phone', '$state', '$message')";

    if ($connect->query($sql) === TRUE) {
        echo "Form submitted successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $connect->error;
    }

    $connect->close();

?>
<?php
    include 'includedb.php';


    // Geting Data form Form

    $name = mysqli_real_escape_string($connect, $_POST['name']);
    $address = mysqli_real_escape_string($connect, $_POST['address']);
    $city = mysqli_real_escape_string($connect, $_POST['city']);
    $state = mysqli_real_escape_string($connect, $_POST['state']);
    $zipcode = mysqli_real_escape_string($connect, $_POST['zip']);
    $phone = mysqli_real_escape_string($connect, $_POST['phone']);
    $productName = $_POST['products'];
    $paymentMode = mysqli_real_escape_string($connect, $_POST['payment']);
    // mysqli_real_escape_string($connect, $_POST['products']);


    // Inserting Order Details into Database

    $sql = "INSERT INTO `orders` (`id`, `name`, `address`, `city`, `state`, `zipcode`, `phone`, `productName`, `paymentMode`) VALUES (NULL, '$name', '$address', '$city', '$state', '$zipcode', '$phone', '$productName', '$paymentMode');";


    $query = mysqli_query($connect, $sql);

    if($query){
        echo "<script>
            alert('Order Placed');
            window.location.href = 'index.html';
          </script>";
    }
    else{
        echo "<script>alert('Error submitting form');</script>";
    }

?>
<?php
include '../includes/db_connect.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="css/usersMessage.css">
</head>

<body>

    <body>
        <!-- Sidebar Navigation -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <h2>Admin Panel</h2>
            </div>

            <nav class="sidebar-nav">
                <ul>
                    <li class="active">
                        <a href="../dashboard/dashboard.php">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="../users/usersMessage.php">
                            <i class="fas fa-users"></i>
                            <span>Users Message</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fas fa-box"></i>
                            <span>Products</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fas fa-shopping-cart"></i>
                            <span>Orders</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fas fa-chart-bar"></i>
                            <span>Analytics</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fas fa-cog"></i>
                            <span>Settings</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>

        <!-- Main Content Area -->
        <main class="main-content">
            <!-- Header -->
            <header class="header">
                <div class="search-bar">
                    <input type="text" placeholder="Search...">
                </div>
                <div class="user-actions">
                    <div class="user-profile">
                        <a href="../auth/logout.php" id="logout">Logout</a>
                    </div>
                </div>
            </header>

            <!-- Dashboard Overview -->
            <section class="dashboard-overview">
                <h1>Dashboard Overview</h1>

                <!-- Stats Cards -->
                <div class="stats-cards">
                    <div class="card">
                        <h3>Total Users</h3>
                        <p class="stat-value">1,245</p>
                        <p class="stat-change">+12% from last month</p>
                    </div>
                </div>
            </section>
            <h1>Orders</h1>
            <div class="messages">
                <table class="styled-table"style="width: 100%;">
                    <tr>
                        <th>Sno.</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zipcode</th>
                        <th>Phone</th>
                        <th>Item Name</th>
                        <th>Payment Mode</th>
                    </tr>
                    <?php
                        $sql = "SELECT * FROM `orders`";
                        $res = mysqli_query($connect, $sql);
                        $i = 1;
                        while($row = mysqli_fetch_assoc($res)){
                            echo "<tr>";
                            echo "<td>". $i++ ."</td>";
                            echo "<td>".$row['name']."</td>";
                            echo "<td>".$row['address']."</td>";
                            echo "<td>".$row['city']."</td>";
                            echo "<td>".$row['state']."</td>";
                            echo "<td>".$row['zipcode']."</td>";
                            echo "<td>".$row['phone']."</td>";
                            echo "<td>".$row['productName']."</td>";
                            echo "<td>".$row['paymentMode']."</td>";
                            echo "</tr>";
                        }
                    ?>
                </table>
    </body>

</html>
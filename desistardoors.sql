-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2025 at 03:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `desistardoors`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `contact_form`
--

CREATE TABLE `contact_form` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `message` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_form`
--

INSERT INTO `contact_form` (`id`, `name`, `email`, `phone`, `state`, `message`) VALUES
(1, 'Toseef Iqbal', 'iqbaltoseef@gmail.com', '123456789', 'Jammu & kashmir', 'Hello!'),
(6, 'Akansha singh', '12307104@neocolab.ai', '7894561235', 'jammu', 'helloo'),
(7, 'Akansha singh', 'akansha06jan@gmail.com', '7894561235', 'Chhattisgarh', 'hhghj'),
(8, 'Akansha singh', 'akansha.singh23@lpu.in', '7894561235', 'Chhattisgarh', 'adjflkajs'),
(9, 'Akansha singh', 'akansha.singh23@lpu.in', '7894561235', 'Nagaland', 'adfklaj'),
(10, 'Akansha singh', 'akansha06jan@gmail.com', '7894561235', 'Haryana', 'adfkajskfj'),
(11, 'aryan', '12306346@neocolab.ai', '7894561235', 'Maharashtra', 'adfjklsjf');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `zipcode` bigint(20) DEFAULT NULL,
  `phone` bigint(20) DEFAULT NULL,
  `productName` varchar(100) DEFAULT NULL,
  `paymentMode` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `name`, `address`, `city`, `state`, `zipcode`, `phone`, `productName`, `paymentMode`) VALUES
(24, 'Toseef Iqbal', 'Jammu & Kashmir Dis. Poonch Teh. Mendhar Vill. Kalaban', 'Mendhar', 'Andhra Pradesh', 185211, 9119066379, 'Vrishabh Luxury Door', 'cod'),
(26, 'Toseef Iqbal', 'Jammu & Kashmir Dis. Poonch Teh. Mendhar Vill. Kalaban', 'Mendhar', 'Andhra Pradesh', 185211, 9119066379, 'Kutumb Designer Door', 'cod'),
(27, 'Toseef Iqbal', 'Jammu & Kashmir Dis. Poonch Teh. Mendhar Vill. Kalaban,', 'Poonch', 'Arunachal Pradesh', 185211, 9119066379, 'Kutumb Designer Door', 'cod'),
(28, 'Toseef Iqbal', 'Jammu & Kashmir Dis. Poonch Teh. Mendhar Vill. Kalaban', 'Mendhar', 'Arunachal Pradesh', 185211, 9119066379, 'Window Door', 'online'),
(30, 'Toseef Iqbal', 'Jammu & Kashmir Dis. Poonch Teh. Mendhar Vill. Kalaban', 'Mendhar', 'Assam', 185211, 9119066379, 'Mother and Son Door', 'cod'),
(31, 'Toseef Iqbal', 'Jammu & Kashmir Dis. Poonch Teh. Mendhar Vill. Kalaban', 'Mendhar', 'Arunachal Pradesh', 185211, 9119066379, 'Security Steel Door', 'cod'),
(32, 'Ayush', 'Phagwar', 'Jalandhar', 'Punjab', 140001, 123456789, 'Security Steel Door', 'cod');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_form`
--
ALTER TABLE `contact_form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact_form`
--
ALTER TABLE `contact_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

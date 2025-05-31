-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2025 at 07:32 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vaccine-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` bigint(20) NOT NULL,
  `appointment_date` date DEFAULT NULL,
  `appointment_time` time(6) DEFAULT NULL,
  `status` enum('CANCELLED','COMPLETED','PENDING','PROCESSING') DEFAULT NULL,
  `cashier_id` bigint(20) DEFAULT NULL,
  `center_id` bigint(20) DEFAULT NULL,
  `doctor_id` bigint(20) DEFAULT NULL,
  `patient_id` bigint(20) DEFAULT NULL,
  `vaccine_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `centers`
--

CREATE TABLE `centers` (
  `center_id` bigint(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `capacity` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `working_hours` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` bigint(20) NOT NULL,
  `amount` double NOT NULL,
  `payment_date` date DEFAULT NULL,
  `payment_method` enum('CASH','CREDIT_CARD') DEFAULT NULL,
  `status` enum('COMPLETED','FAILED','PENDING') DEFAULT NULL,
  `appointment_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) NOT NULL,
  `api_path` varchar(255) NOT NULL,
  `method` varchar(255) NOT NULL,
  `module` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `api_path`, `method`, `module`, `name`) VALUES
(1, '/centers', 'POST', 'CENTERS', 'Create a center'),
(2, '/centers/{id}', 'PUT', 'CENTERS', 'Update a center'),
(3, '/centers/{id}', 'DELETE', 'CENTERS', 'Delete a center'),
(4, '/centers/{id}', 'GET', 'CENTERS', 'Get a center by id'),
(5, '/centers', 'GET', 'CENTERS', 'Get centers with pagination'),
(6, '/roles', 'GET', 'ROLES', 'Get role with pagination'),
(7, '/vaccines', 'POST', 'VACCINES', 'Create a vaccine'),
(8, '/vaccines/{id}', 'PUT', 'VACCINES', 'Update a vaccine'),
(9, '/vaccines/{id}', 'DELETE', 'VACCINES', 'Delete a vaccine'),
(10, '/vaccines/{id}', 'GET', 'VACCINES', 'Get a vaccine by id'),
(11, '/vaccines', 'GET', 'VACCINES', 'Get vaccines with pagination'),
(12, '/permissions', 'POST', 'PERMISSIONS', 'Create a permission'),
(13, '/permissions', 'PUT', 'PERMISSIONS', 'Update a permission'),
(14, '/permissions/{id}', 'DELETE', 'PERMISSIONS', 'Delete a permission'),
(15, '/permissions/{id}', 'GET', 'PERMISSIONS', 'Get a permission by id'),
(16, '/permissions', 'GET', 'PERMISSIONS', 'Get permissions with pagination'),
(17, '/users', 'POST', 'USERS', 'Create a user'),
(18, '/users/{id}', 'PUT', 'USERS', 'Update a user'),
(19, '/users/{id}', 'DELETE', 'USERS', 'Delete a user'),
(20, '/users/{id}', 'GET', 'USERS', 'Get a user by id'),
(21, '/users', 'GET', 'USERS', 'Get users with pagination'),
(22, '/auth/account', 'GET', 'AUTH', 'Access profile'),
(23, '/files', 'POST', 'FILES', 'Upload a file');

-- --------------------------------------------------------

--
-- Table structure for table `permission_role`
--

CREATE TABLE `permission_role` (
  `role_id` bigint(20) NOT NULL,
  `permission_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permission_role`
--

INSERT INTO `permission_role` (`role_id`, `permission_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 20),
(1, 21),
(1, 22),
(1, 23);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'ADMIN'),
(2, 'PATIENT'),
(3, 'DOCTOR'),
(4, 'CASHIER');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `refresh_token` mediumtext DEFAULT NULL,
  `center_id` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `address`, `birthday`, `email`, `fullname`, `is_deleted`, `password`, `phone_number`, `refresh_token`, `center_id`, `role_id`) VALUES
(1, NULL, NULL, 'admin@gmail.com', 'I\'m admin', b'0', '$2a$10$Q5YKeAhD1Evurc.5/wrVAe85/nyxM8pOWygJwuUBf5jFHpZi.vtqW', NULL, 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJleHAiOjE3NTQ1NzM0NzMsImlhdCI6MTc0NTkzMzQ3MywidXNlciI6eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJmdWxsTmFtZSI6ImFkbWluQGdtYWlsLmNvbSJ9fQ.Z0P757QUmA3IrlLL7wQtQ9tg47VIXp7K202iH_QrSzja37OWNec6zzYwQGqkcY3dEbxJI9mpEubGnBx9lVTSPg', NULL, 1),
(2, NULL, NULL, 'patient@gmail.com', 'I\'m patient', b'0', '$2a$10$GJIj/ctYUGSs6ljYAuWrdeZeTB2pc6Fyinm58P9sWwPatwPij2xV6', NULL, NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `vaccines`
--

CREATE TABLE `vaccines` (
  `vaccine_id` bigint(20) NOT NULL,
  `age_range` varchar(255) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `disease` varchar(255) NOT NULL,
  `dosage` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) NOT NULL,
  `manufacturer` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double DEFAULT NULL,
  `required_doses` int(11) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `FKfpv8ordlgxntjou566y8e476t` (`cashier_id`),
  ADD KEY `FKf75nvdvq1iy15yd9hak17443m` (`center_id`),
  ADD KEY `FK6u6s6egu60m2cbdjno44jbipa` (`doctor_id`),
  ADD KEY `FKopb2h9yhin1rb4dqote8bws6w` (`patient_id`),
  ADD KEY `FK3ge3a4on4aoteccvik8dxu879` (`vaccine_id`);

--
-- Indexes for table `centers`
--
ALTER TABLE `centers`
  ADD PRIMARY KEY (`center_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `FK9a0odew03qao7nlbdsesrux5u` (`appointment_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD KEY `FK6mg4g9rc8u87l0yavf8kjut05` (`permission_id`),
  ADD KEY `FK3vhflqw0lwbwn49xqoivrtugt` (`role_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `FK3f50dcyg88bl203une7wso2x4` (`center_id`),
  ADD KEY `FKp56c1712k691lhsyewcssf40f` (`role_id`);

--
-- Indexes for table `vaccines`
--
ALTER TABLE `vaccines`
  ADD PRIMARY KEY (`vaccine_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `centers`
--
ALTER TABLE `centers`
  MODIFY `center_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vaccines`
--
ALTER TABLE `vaccines`
  MODIFY `vaccine_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `FK3ge3a4on4aoteccvik8dxu879` FOREIGN KEY (`vaccine_id`) REFERENCES `vaccines` (`vaccine_id`),
  ADD CONSTRAINT `FK6u6s6egu60m2cbdjno44jbipa` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `FKf75nvdvq1iy15yd9hak17443m` FOREIGN KEY (`center_id`) REFERENCES `centers` (`center_id`),
  ADD CONSTRAINT `FKfpv8ordlgxntjou566y8e476t` FOREIGN KEY (`cashier_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `FKopb2h9yhin1rb4dqote8bws6w` FOREIGN KEY (`patient_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `FK9a0odew03qao7nlbdsesrux5u` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`appointment_id`);

--
-- Constraints for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `FK3vhflqw0lwbwn49xqoivrtugt` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `FK6mg4g9rc8u87l0yavf8kjut05` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK3f50dcyg88bl203une7wso2x4` FOREIGN KEY (`center_id`) REFERENCES `centers` (`center_id`),
  ADD CONSTRAINT `FKp56c1712k691lhsyewcssf40f` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2024 at 05:08 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uas_dpsi`
--

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id_barang` int(11) NOT NULL,
  `kd_barang` varchar(255) NOT NULL,
  `nama_barang` varchar(255) NOT NULL,
  `harga_barang` varchar(255) NOT NULL,
  `stok_barang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id_barang`, `kd_barang`, `nama_barang`, `harga_barang`, `stok_barang`) VALUES
(1, 'BRG001', 'Sofa', '10.000.000', 5),
(2, 'BRG002', 'Lemari jati', '10.000.000', 5),
(3, 'BRG003', 'Meja Belajar', '3.000.000', 3),
(4, 'BRG004', 'Meja Makan', '5.000.000', 10);

-- --------------------------------------------------------

--
-- Table structure for table `laporans`
--

CREATE TABLE `laporans` (
  `id_laporan` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `jenis` varchar(255) NOT NULL,
  `tanggal` datetime NOT NULL,
  `data_laporan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `laporans`
--

INSERT INTO `laporans` (`id_laporan`, `id_barang`, `jenis`, `tanggal`, `data_laporan`) VALUES
(1, 1, 'jenis_laporan', '2024-07-25 00:00:00', 'data laporan contoh'),
(2, 2, 'jenis_laporan', '2024-07-26 00:00:00', 'data laporan contoh'),
(3, 4, 'jenis_laporan', '2024-07-29 00:00:00', 'data laporan contoh');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('kasir') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'gin01', '$2a$10$F2Ek/ukMsTNvVuQI9nPt6ORIGH8gtN4QYkbd7piLcrxSDjgu8gdKK', 'kasir', '2024-07-25 09:56:44', '2024-07-25 09:56:44'),
(2, 'gin0122', '$2a$10$nmlNhfPCSSZ.q4NwylVADumlnbvmo5SeEriXL4umufKBI0HbFyX1e', 'kasir', '2024-07-25 11:13:38', '2024-07-25 11:13:38'),
(3, 'regina', '$2a$10$IqPI7FOv7DSYG.Lb86HQHuOZpbMEzbfgEtG2yH0xdhEL3QnjkhxXC', 'kasir', '2024-07-25 13:18:50', '2024-07-25 13:18:50'),
(4, 'regina ok', '$2a$10$o3KaCH/sGNQmNToL1eRZWeYUgBp3pzB/MWD1A3B03qny/rwzbw2B2', 'kasir', '2024-07-25 13:46:43', '2024-07-25 13:46:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id_barang`);

--
-- Indexes for table `laporans`
--
ALTER TABLE `laporans`
  ADD PRIMARY KEY (`id_laporan`),
  ADD KEY `id_barang` (`id_barang`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id_barang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `laporans`
--
ALTER TABLE `laporans`
  MODIFY `id_laporan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `laporans`
--
ALTER TABLE `laporans`
  ADD CONSTRAINT `laporans_ibfk_1` FOREIGN KEY (`id_barang`) REFERENCES `barang` (`id_barang`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

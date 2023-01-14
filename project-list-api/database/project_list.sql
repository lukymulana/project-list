-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2023 at 04:04 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_list`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_project`
--

CREATE TABLE `data_project` (
  `id_project` int(11) NOT NULL,
  `nama_project` varchar(100) NOT NULL,
  `deskripsi` text NOT NULL,
  `pic` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `due_date` date NOT NULL,
  `priority` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `task_complexity` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data_project`
--

INSERT INTO `data_project` (`id_project`, `nama_project`, `deskripsi`, `pic`, `start_date`, `due_date`, `priority`, `status`, `task_complexity`, `created_at`) VALUES
(1, 'Testing', 'lorem ipsum laforte', 'Coba', '2023-01-01', '2023-01-11', 1, 0, 0, '2023-01-14 20:29:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_project`
--
ALTER TABLE `data_project`
  ADD PRIMARY KEY (`id_project`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_project`
--
ALTER TABLE `data_project`
  MODIFY `id_project` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

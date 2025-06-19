-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2025 at 01:40 AM
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
-- Database: `health_tracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_history`
--

CREATE TABLE `tb_history` (
  `id_history` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_progress` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_progress`
--

CREATE TABLE `tb_progress` (
  `id_progress` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `drink` float NOT NULL,
  `calorine` float NOT NULL,
  `jenis_kegiatan` varchar(255) NOT NULL,
  `duration` time NOT NULL,
  `jarak` float NOT NULL,
  `waktu` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_progress`
--

INSERT INTO `tb_progress` (`id_progress`, `id_user`, `drink`, `calorine`, `jenis_kegiatan`, `duration`, `jarak`, `waktu`) VALUES
(1, 1, 200, 4.3, 'bycycling', '00:00:02', 3, '19:40:00'),
(7, 2, 200, 50, 'running', '00:00:30', 3, '12:30:00'),
(8, 8, 0.5, 720, 'Jump Rope', '02:00:00', 0, '11:40:00'),
(9, 8, 0.5, 180, 'Cycling', '01:00:00', 1, '12:00:00'),
(10, 11, 0.5, 399960, 'Cycling', '01:00:00', 2222, '12:17:00'),
(11, 8, 0.5, 47520, 'Cycling', '04:00:00', 66, '14:22:00'),
(12, 8, 200, 0, 'Water', '00:00:00', 0, '14:39:38'),
(13, 8, 200, 0, 'Water', '00:00:00', 0, '14:40:51'),
(14, 8, 100, 0, 'Water', '00:00:00', 0, '14:43:38'),
(15, 8, 22, 0, 'Water', '00:00:00', 0, '16:42:01'),
(16, 8, 7000, 0, 'Water', '00:00:00', 0, '17:07:32'),
(17, 8, 800000, 0, 'Water', '00:00:00', 0, '17:18:27'),
(18, 8, 10000000, 0, 'Water', '00:00:00', 0, '17:20:12'),
(19, 8, 2, 0, 'Water', '00:00:00', 0, '17:27:53'),
(20, 8, 300, 0, 'Water', '00:00:00', 0, '17:34:12'),
(21, 8, 500, 0, 'Water', '00:00:00', 0, '17:48:17');

-- --------------------------------------------------------

--
-- Table structure for table `tb_reminder`
--

CREATE TABLE `tb_reminder` (
  `id_reminder` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `time` varchar(100) NOT NULL,
  `messeage` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_trainner`
--

CREATE TABLE `tb_trainner` (
  `id_trainner` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `username` varchar(50) NOT NULL,
  `gmail` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `spesialis` varchar(255) NOT NULL,
  `profile` tinyblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_trainner`
--

INSERT INTO `tb_trainner` (`id_trainner`, `id_user`, `username`, `gmail`, `password`, `spesialis`, `profile`) VALUES
(1, 1, 'bambang', 'bambang@gmail.com', '$2b$10$kERO94FVSpvvkVx1gYctH.SvoRG9LiP3dXnkxpCwCs8tIbU22Pl5.', 'Gym speciallis', ''),
(2, 1, 'jhon', 'Jhon@gmail.com', '$2b$10$lszGS2RrHvvHWKKSS.7PPOsIx3j1g7qAFUZ4BEsEZYjywTRPLLrPe', 'Acrobatic', '');

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `gmail` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `umur` tinyint(10) NOT NULL,
  `profile` text NOT NULL,
  `gander` varchar(40) NOT NULL,
  `tinggi_badan` float NOT NULL,
  `berat_badan` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`id_user`, `username`, `gmail`, `password`, `umur`, `profile`, `gander`, `tinggi_badan`, `berat_badan`) VALUES
(1, 'Danil', 'danil@example.com', '$2b$10$cPPWkQ7nEbNbB9dIK5X7kup.4zOl9hKfx8VWMI9VdpH97tn4I.Arm', 22, '', 'male', 190, 120),
(2, 'bambang', 'bambang@example.com', '$2b$10$uh38tb3PVpGh6FgB0NN7Ae19ykE.nh61bq5RAL9gWKhyNrNJcPvBG', 25, 'profile.jpg', 'Male', 175, 70),
(3, 'Nathan Tanaka', 'nathan@gmail.com', '$2b$10$MoRpzTMVXWJm9aiC/iR3ju4JfjRDUi.UmvssCTSxyPnxO4bAjOSEe', 22, 'default.jpg', 'Laki-laki', 170.5, 65.2),
(4, 'Nathann Tanaka', 'nathan@gmail.com', '$2b$10$MoRpzTMVXWJm9aiC/iR3ju4JfjRDUi.UmvssCTSxyPnxO4bAjOSEe', 22, 'default.jpg', 'Laki-laki', 170.5, 65.2),
(5, 'Nathannnnnn Tanaka', 'nathan@gmail.com', '$2b$10$MoRpzTMVXWJm9aiC/iR3ju4JfjRDUi.UmvssCTSxyPnxO4bAjOSEe', 22, 'default.jpg', 'Laki-laki', 170.5, 65.2),
(6, 'Nathan Tanaka', 'nathan@gmail.com', '$2b$10$MoRpzTMVXWJm9aiC/iR3ju4JfjRDUi.UmvssCTSxyPnxO4bAjOSEe', 22, '', 'Laki-laki', 170.5, 65.2),
(7, 'nyoman', 'nyoman@gmail.com', '$2b$10$09QygRYwC.P03AWHkm9liu11W2wXEw0seD3NzcdCyURzJUzYPjUmm', 24, '', 'perempuan', 170.9, 60.8),
(8, 'natan', 'a', '$2b$10$VfDnd9NLfs3GkSkZWUqw/eDjX/F1.JQ/WY8vGKdLFYbCPyaI.n5ea', 45, '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', 'ygvu', 56, 65),
(9, 'Bambang', 'bambang@gmail.com', '$2b$10$816tWmWxBRKJxI0Bw71tIOC46eWSgCe0cU1xGRaJpbS6v1ntPebPW', 21, '', 'male', 170.6, 70.8),
(10, 'q', 'wer', '$2b$10$QhE.mSM82PtAehDrpvrGguIqWtJVQhRxLbpVrIoIslV8lDqcdD.zy', 56, '', 'asd', 234, 234),
(11, 't', 't', '$2b$10$5SrL6l//gjMMTtZIbKuklO8FNSWP6ZZTYTPstkTugdf5BqJzv7Swu', 5, '', 'male', 22, 33);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_history`
--
ALTER TABLE `tb_history`
  ADD PRIMARY KEY (`id_history`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_progress` (`id_progress`);

--
-- Indexes for table `tb_progress`
--
ALTER TABLE `tb_progress`
  ADD PRIMARY KEY (`id_progress`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `tb_reminder`
--
ALTER TABLE `tb_reminder`
  ADD PRIMARY KEY (`id_reminder`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `tb_trainner`
--
ALTER TABLE `tb_trainner`
  ADD PRIMARY KEY (`id_trainner`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_history`
--
ALTER TABLE `tb_history`
  MODIFY `id_history` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_progress`
--
ALTER TABLE `tb_progress`
  MODIFY `id_progress` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tb_reminder`
--
ALTER TABLE `tb_reminder`
  MODIFY `id_reminder` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_trainner`
--
ALTER TABLE `tb_trainner`
  MODIFY `id_trainner` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_history`
--
ALTER TABLE `tb_history`
  ADD CONSTRAINT `tb_history_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `tb_user` (`id_user`),
  ADD CONSTRAINT `tb_history_ibfk_2` FOREIGN KEY (`id_progress`) REFERENCES `tb_progress` (`id_progress`);

--
-- Constraints for table `tb_progress`
--
ALTER TABLE `tb_progress`
  ADD CONSTRAINT `tb_progress_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `tb_user` (`id_user`);

--
-- Constraints for table `tb_reminder`
--
ALTER TABLE `tb_reminder`
  ADD CONSTRAINT `tb_reminder_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `tb_user` (`id_user`);

--
-- Constraints for table `tb_trainner`
--
ALTER TABLE `tb_trainner`
  ADD CONSTRAINT `tb_trainner_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `tb_user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

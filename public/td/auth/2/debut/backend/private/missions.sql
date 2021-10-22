--
-- Table structure for table `agents`
--

DROP TABLE IF EXISTS `agents`;
CREATE TABLE `agents`
(
  `id_agent`      INT(3) NOT NULL auto_increment,
  `ref_status`    INT(1) NOT NULL,
  `firstname`     VARCHAR(45) NOT NULL,
  `lastname`      VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_agent`),
  UNIQUE `idx_identity` (`firstname`, `lastname`, `ref_status`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agents`
--
INSERT INTO `agents` (`id_agent`, `ref_status`, `firstname`, `lastname`)
VALUES
(1, 3, 'Greguar', 'Marki'),
(2, 1, 'Sylvie', 'Bulatov'),
(3, 4, 'Kore', 'Dideriksen'),
(4, 6, 'Gunnar', 'Laustsen'),
(5, 1, 'Alvaro', 'Shiray'),
(6, 2, 'Aliev', 'Kallistrat'),
(7, 4, 'David', 'Verhovskiy'),
(8, 4, 'Marsyal', 'Fabbri');

--
-- Table structure for table `missions`
--

DROP TABLE IF EXISTS `missions`;
CREATE TABLE `missions`
(
  `id_mission`    INT(6) NOT NULL auto_increment,
  `ref_agent`     INT(3) NOT NULL,
  `country`       VARCHAR(30) NOT NULL,
  `cost`          INT(4) NOT NULL,
  `date_from`     VARCHAR(10) NOT NULL,
  `date_to`       VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_mission`),
  INDEX `idx_country` (`country`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `missions`
--
INSERT INTO `missions` (`id_mission`, `ref_agent`, `country`, `cost`, `date_from`, `date_to`)
VALUES
(1, 2, 'Australie', 680, '2021-01-13', '2021-02-10'),
(2, 2, 'Belgique', 167, '2020-09-30', '2020-10-04'),
(3, 4, 'USA', 890, '2020-06-15', '2020-08-01'),
(4, 7, 'France', 45, '2021-03-27', '2021-03-30');

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE `status`
(
  `id_status`     INT(1) NOT NULL auto_increment,
  `status`        VARCHAR(30) NOT NULL,
  `cap`           INT(4) NOT NULL,
  PRIMARY KEY (`id_status`),
  UNIQUE `idx_status` (`status`, `cap`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id_status`, `status`, `cap`)
VALUES
(1, 'Enseignant·e chercheur·se', 1500),
(2, 'Chercheur·se', 1500),
(3, 'Ingénieur·e ou technicien·ne', 1500),
(4, 'Émérite', 1000),
(5, 'Doctorant·e', 2000),
(6, 'Associé·e', 500);

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`
(
  `id_user`       INT(3) NOT NULL auto_increment,
  `email`         VARCHAR(45) NOT NULL,
  `password`      VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE `idx_identity` (`email`, `password`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `email`, `password`)
VALUES
(1, 'admin@envol2021.fr', '$2y$10$lgj2e81t8h/8.r/6MIHEVus8jVVr/Hw1IEZMX1bwya5LsF.g66Bvi');

-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: coetorise.base
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bus`
--

DROP TABLE IF EXISTS `bus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bus` (
  `Id` varchar(10) NOT NULL,
  `LayoutId` varchar(10) DEFAULT 'Standard',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus`
--

LOCK TABLES `bus` WRITE;
/*!40000 ALTER TABLE `bus` DISABLE KEYS */;
INSERT INTO `bus` VALUES ('37B-666.01','limousine'),('51B-272.28','limousine'),('51B-421.55','limousine'),('51B-837.12','standard');
/*!40000 ALTER TABLE `bus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus_assign`
--

DROP TABLE IF EXISTS `bus_assign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bus_assign` (
  `BusId` varchar(10) NOT NULL,
  `ScheduleId` int NOT NULL,
  `Price` int DEFAULT NULL,
  UNIQUE KEY `BusId` (`BusId`,`ScheduleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_assign`
--

LOCK TABLES `bus_assign` WRITE;
/*!40000 ALTER TABLE `bus_assign` DISABLE KEYS */;
INSERT INTO `bus_assign` VALUES ('37B-666.01',4,350000),('37B-666.01',5,100000),('37B-666.01',9,115000),('51B-272.28',2,350000),('51B-272.28',6,400000),('51B-272.28',8,200000),('51B-272.28',10,115000),('51B-272.28',11,200000),('51B-272.28',12,200000),('51B-272.28',13,200000),('51B-272.28',14,200000),('51B-272.28',15,350000),('51B-421.55',3,200000),('51B-421.55',7,250000),('51B-421.55',16,400000),('51B-421.55',17,400000),('51B-837.12',1,200000);
/*!40000 ALTER TABLE `bus_assign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `day_off`
--

DROP TABLE IF EXISTS `day_off`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `day_off` (
  `ScheduleId` int NOT NULL,
  `Date` date NOT NULL,
  UNIQUE KEY `ScheduleId` (`ScheduleId`,`Date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `day_off`
--

LOCK TABLES `day_off` WRITE;
/*!40000 ALTER TABLE `day_off` DISABLE KEYS */;
INSERT INTO `day_off` VALUES (1,'2022-07-20'),(1,'2022-08-26'),(2,'2022-07-20');
/*!40000 ALTER TABLE `day_off` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `end_point`
--

DROP TABLE IF EXISTS `end_point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `end_point` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `District` varchar(100) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `end_point`
--

LOCK TABLES `end_point` WRITE;
/*!40000 ALTER TABLE `end_point` DISABLE KEYS */;
INSERT INTO `end_point` VALUES (1,'Bx. Hà Đông','Hà Nội'),(2,'Bx. Cao Bằng','Cao Bằng'),(3,'Bx. Miền Đông','Hồ Chí Minh (HCM)');
/*!40000 ALTER TABLE `end_point` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_token`
--

DROP TABLE IF EXISTS `refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_token` (
  `Id` varchar(64) NOT NULL,
  `HashedToken` varchar(255) NOT NULL,
  `UserId` int NOT NULL,
  `Revoked` tinyint DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_token`
--

LOCK TABLES `refresh_token` WRITE;
/*!40000 ALTER TABLE `refresh_token` DISABLE KEYS */;
INSERT INTO `refresh_token` VALUES ('0494dec1-0069-4ede-be10-e78b9aa7e97e','bb0c4255ed076636c1befc34fc4860bab6acfe66f2fbb58bb7eb11e3b3e8653a',2,0),('075ce15c-6cf0-4360-bae7-d8f513f4dbd3','b3ab774dc62c22b827e6e438c60205a2c176f5c567bac1e3f62fd0e741310652',2,0),('0fef2d47-3a53-4f50-a07f-b3fbcc4a26ce','dc7fcb064261de1689db560252dd8efebc22aa06fa57076d6fd2d80d3c2d8dba',1,0),('10ef58b3-7b3c-40a2-85d3-690c85c8e3b5','e17f7b2716894c66dd93e6532111846202e77622b04c6a551660c29e82d82937',4,0),('23cd44ad-4ba8-473e-8826-2934c63eb84c','934395033454276a17b311cc4c42bcde11b7523b1a63c9c46182983f4e1e0af4',2,0),('2b613835-4f20-4160-b3f6-e3f750a3cd24','84c3db4d9d9a88588136fbc5c0958742f1d964e732421efa265af4b72e2cdea6',2,0),('387fa6b2-dba9-4303-b688-6514639ce682','f7a96ff3b449a8fea875c67a995e0188f05e528f265895624476c96faa2cc5a0',2,0),('3ff2c11a-7958-42be-a2e7-b4879f1bda84','8930764b9ed9478a0d0390bc2e2005f96eb29eacc596032ae48cf7eb2b2bd4d1',2,0),('431838e1-c20d-47f3-a1e7-748678adfa98','9342b550fb777629feae9356271a15ae98934ac99c224f3d3e4e0e821995b1f3',4,0),('4b3e718b-eb91-4253-959d-48fd2dbd1b6b','673705f5db38be28722f65bb1843c3c54f31ed6c381c014176ec14b4299159fc',4,0),('5c76adb9-c103-476d-a99e-a922e9bff69c','5cad3fcce77aa7a9802c806d1e94441dc5087e0758073202bbfc62231fdb3059',4,0),('68f86cca-59ea-4b48-9266-6d7e79e7d9dd','0cd507fc40c04002d04d13a5bb8f8472b8129767ab5136d2d1618497dea87afd',2,0),('6a7d1994-f568-476b-8754-6fedfee63cf2','5494223d1e6ed751f80ab7f9aa5c53c9ae95c2ce74968b6d2b2e23213cf7f4a0',1,0),('71f627aa-2f00-4941-85d4-af2946fc696d','684b1abef35d66b645f8a62b90c6255b3fe64d2ad03b955b97c83d3e724d2fa8',4,0),('73765fce-48d8-4729-b6c6-f26ddad893e8','df9090620f6fad938c2b7f827f997a9ec309fd1a31208be8aae3df03385171a4',2,0),('78f2bb5b-30c9-41c0-b4e5-c0d0f974ef1c','6c2ea8181cd027d5136471ac99e21c867c8fe0f8d521b7dd70b2486dd104c234',2,0),('7e94c79e-176e-4de8-b394-4fbfd72d9c97','1dd2c4e31b9d09d5fa6f011ab2c0c5db5c3f730957c24fe784171a6d4479a008',4,0),('7febc4fd-0f14-49e1-b680-212f9592b517','fa1e6ada95b3c9d5dfe42f0f6fb2ff36b289fd5d391f1fa36ff5dbacd584252b',4,0),('a5d8c148-9f7e-4fd8-8344-3832c0ae51d5','516edf72d2dc2d8381f0ecbbbac87b2ef055e7bc17975e1f6d2ec5392eac1fb1',3,0),('a65990b2-440c-4321-aeec-438d9ee10483','522f1db48572863c1d3bf3b28f2062f17d4cc9b5ebabe8b6f21db5ecc0e1eb85',2,0),('aade643b-a3d8-46e4-981c-2cb847cc143e','55ba70e1b5b6e3679436e3c3cf36793cf767340220754ac89c3536fa9b823861',2,0),('b651dfdd-294e-43ce-81f0-73d482d3be3d','1653628d2b218aa0af138638c7c23fabf153dbe49ca8478e9cf1ec991e51437c',1,0),('b8ee1fc8-53df-4872-b6c2-21e6f1f2f8d9','3de0c56b981f2c191e384a19d5bcce5f44748d2083535448535e0e2420bbe13a',2,0),('c07bda85-2e0b-4042-9a1d-77a85a88ed17','b9eb17141a0bf12d28ddfd39b6cef90ab8175dfd356ad9c09cad01a6b2ade226',2,0),('c4be9dcb-5980-4b65-b93d-a55cd75c46df','4c9126159c8c06fb3d9150d8ff33858f80e331b0d986d6018e9dc9f2d1962b26',5,0),('c59048ac-9840-49c3-9b4d-80fd92e60e6b','e50030d0d04488ba803f7992f7c0710b4cb37b2cb82ef11649a594525e39c8d0',1,0),('c6bde724-57a2-4d63-8ab2-8a07c277a4b5','ad25598534987189672ff5427eca883aa5c036f02a03ecd0a537f106ed190643',4,0),('d1d802ba-d25b-4dba-b7c6-c6beba8a8307','7722c5627cc417a00f74fc27c9dc664cdf2bd3fe14a4fed12539c1cc7b21d650',1,0),('d81b8eea-0b34-4e80-a279-227681aeaf38','ee5adfd929141c6ff709a18c35027e982877c9de4ca2cab3663ae3d940fdccab',4,0),('dd783098-def1-4718-b6f3-931bf4865d50','b4fdbb63add7c30c5b933498f415d25f484e4187e38f03c1fd75adbf942da1e6',2,0),('e1ada221-16a3-43bb-814d-c868f3d4b5ba','bb189741ec4d27929dfd241fd2f161352af808060a3f4e92de601572f4af770d',4,0),('ef049315-d0fa-4c70-a093-bc9938bca5a0','3ca2dea7810384fa85ace7b161fb57fb593ebbc72474a69d39cc98a5dcf614fd',1,0),('f25dd85e-b14a-44fd-9c25-df913770217e','bf75fbcd45df2c23efe9457b4fc422c83786e9fb74b793f81ef68dab970fb143',2,0),('fcb8ba77-d3ae-45e6-a39d-236b0caea9db','cd8490141e85f08439c76ee570a21c8ce8c652af15d762db284bbf768bcb79a4',2,0),('fcba5b7e-2df5-424e-a8cb-1354e84588b3','7739e35c75b57e15488ff8c1064755697c7ffe0c90c07cd97cf5461f2ad4cc41',2,0);
/*!40000 ALTER TABLE `refresh_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ScheduleId` int NOT NULL,
  `Date` date NOT NULL,
  `SeatId` varchar(10) NOT NULL,
  `UserId` int NOT NULL,
  `ticketId` varchar(64) NOT NULL DEFAULT 'come on man',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `ScheduleId` (`ScheduleId`,`Date`,`SeatId`)
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (72,2,'2022-08-04','A13',1,'come on man'),(73,2,'2022-08-04','B04',1,'come on man'),(74,1,'2022-12-25','A01',1,'come on man'),(75,1,'2022-12-25','A10',1,'come on man'),(85,2,'2022-08-11','A01',1,'come on man'),(86,4,'2022-08-31','A07',1,'come on man'),(91,4,'2022-08-31','A13',1,'come on man'),(115,3,'2022-09-03','A04',1,'come on man'),(116,5,'2022-08-31','A14',1,'come on man'),(117,5,'2022-08-31','A13',1,'come on man'),(118,5,'2022-08-31','A08',1,'come on man'),(134,3,'2022-09-03','A07',1,'863af2c2-c5a3-4ddc-8649-4c84388f7b0b');
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(100) DEFAULT '',
  `Date` date DEFAULT NULL,
  `Start` time NOT NULL,
  `End` time NOT NULL,
  `Cron` varchar(100) NOT NULL,
  `CronType` varchar(10) DEFAULT 'Daily',
  `Note` varchar(100) DEFAULT '',
  `TripId` int NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (1,'Christmas day','2022-12-25','07:00:00','09:30:00','0 0 0 25 DEC ? 2022','Once','Remember to reduce your packet weight',1),(2,'',NULL,'11:00:00','19:30:00','0 0 11 ? * * *','Daily','',1),(3,'',NULL,'07:30:00','16:00:00','0 0 11 ? * * *','Daily','',1),(4,'',NULL,'09:00:00','15:30:00','0 0 11 ? * * *','Daily','',1),(5,'',NULL,'10:00:00','15:30:00','0 0 11 ? * * *','Daily','',1),(6,'',NULL,'11:30:00','15:30:00','0 0 11 ? * * *','Daily','',1),(7,'',NULL,'12:30:00','15:30:00','0 0 11 ? * * *','Daily','',1),(8,'',NULL,'13:30:00','15:30:00','0 0 11 ? * * *','Daily','',1),(9,'',NULL,'14:30:00','15:30:00','0 0 11 ? * * *','Daily','',1),(10,'',NULL,'15:30:00','15:30:00','0 0 11 ? * * *','Daily','',1),(11,'',NULL,'16:30:00','15:30:00','0 0 11 ? * * *','Daily','',1),(12,'',NULL,'17:30:00','15:30:00','0 0 11 ? * * *','Daily','',1),(13,'',NULL,'18:30:00','15:30:00','0 0 11 ? * * *','Daily','',1),(14,'',NULL,'19:30:00','15:30:00','0 0 11 ? * * *','Daily','',1),(15,'',NULL,'20:30:00','15:30:00','0 0 11 ? * * *','Daily','',1),(16,'',NULL,'21:30:00','15:30:00','0 0 11 ? * * *','Daily','',1),(17,'',NULL,'22:30:00','02:00:00','0 0 11 ? * * *','Daily','',1);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat_on_layout`
--

DROP TABLE IF EXISTS `seat_on_layout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seat_on_layout` (
  `Id` varchar(10) NOT NULL,
  `LayoutId` varchar(10) NOT NULL,
  UNIQUE KEY `Id` (`Id`,`LayoutId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat_on_layout`
--

LOCK TABLES `seat_on_layout` WRITE;
/*!40000 ALTER TABLE `seat_on_layout` DISABLE KEYS */;
INSERT INTO `seat_on_layout` VALUES ('A01','Limousine'),('A02','Limousine'),('A03','Limousine'),('A04','Limousine'),('A05','Limousine'),('A06','Limousine'),('A07','Limousine'),('A08','Limousine'),('A09','Limousine'),('A10','Limousine'),('A11','Limousine'),('A12','Limousine'),('A13','Limousine'),('A14','Limousine'),('B01','Limousine'),('B02','Limousine'),('B03','Limousine'),('B04','Limousine'),('B05','Limousine'),('B06','Limousine'),('B07','Limousine'),('B08','Limousine'),('B09','Limousine'),('B10','Limousine'),('B11','Limousine'),('B12','Limousine'),('B13','Limousine'),('B14','Limousine');
/*!40000 ALTER TABLE `seat_on_layout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `Id` varchar(64) NOT NULL,
  `ScheduleId` int NOT NULL,
  `Date` date NOT NULL,
  `SeatIds` varchar(64) NOT NULL,
  `Total` int NOT NULL,
  `Status` varchar(64) DEFAULT 'WAITING',
  `ExpiredAt` datetime NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES ('1332ed74-6842-4358-9fde-367ca8990b4e',3,'2022-09-03','B03, B04, B05',600000,'CANCELED','2022-09-02 05:33:57','2022-09-02 05:28:57',1),('863af2c2-c5a3-4ddc-8649-4c84388f7b0b',3,'2022-09-03','A07',200000,'PAID','2022-09-02 05:02:50','2022-09-02 04:57:50',1);
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trip`
--

DROP TABLE IF EXISTS `trip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trip` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FromId` int NOT NULL,
  `ToId` int NOT NULL,
  `Distance` int NOT NULL,
  `TravelTime` int NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip`
--

LOCK TABLES `trip` WRITE;
/*!40000 ALTER TABLE `trip` DISABLE KEYS */;
INSERT INTO `trip` VALUES (1,1,2,2000,15),(2,2,3,30000,360);
/*!40000 ALTER TABLE `trip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'jinsei melody','jsm@gmail.com','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'),(4,'jinsei melody','jmedy@gmail.com','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'),(5,'khoi','js@gmail.com','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'coetorise.base'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-03 11:20:53

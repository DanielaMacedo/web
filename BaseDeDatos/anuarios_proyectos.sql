-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: anuarios
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyectos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Num_control` int DEFAULT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `materia` varchar(50) DEFAULT NULL,
  `imagenes` varchar(100) DEFAULT NULL,
  `autor` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Num_control` (`Num_control`),
  CONSTRAINT `proyectos_ibfk_1` FOREIGN KEY (`Num_control`) REFERENCES `alumnos` (`Num_control`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
INSERT INTO `proyectos` VALUES (2,11111111,'ciruelas rojas con sAL','Mejora del medio ambiente','Desarrollo sustentable','738249308ef6fac04b6927be6b71f79e','Lorena'),(7,11111111,'Aves','Mejora del medio ambiente','topicos avanzados','dc616e8c7c8bd94a5f9068cdb27a8689','Lorenas'),(8,22222222,'ciruelas','Mejora del medio ambiente','Plenitud','dfdaf60655b9dbb99fa32e193d82acb2','Litzy'),(9,11111111,'cacahuates','Mejora del medio ambiente','Plenitud','dc96d2515dbee8dfa10b20f68640b3f6','Lorena'),(10,121212,'PAPAYA','entusiasta','Deportes','d2aa5dbdeaf811c4609dfd31a4a8aeac','PAPAPA'),(11,313131,'Camaleon','Diversidad','Plenitud','1befc3cb62a5c806e5324fa6bc1bed9e','Camilo'),(13,313131,'Frutas','Comer saludable es importante','Atletismo','5c9eb2ebd3b20524d49948db135f668d','Camilo'),(15,555,'Aves','Importancia de las aves en nuestro medio ambiente','Deportes','26e59b9db60be7b147387070e6b48162','Dalia');
/*!40000 ALTER TABLE `proyectos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-29 15:18:59

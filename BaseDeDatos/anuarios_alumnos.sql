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
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos` (
  `Num_control` int NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido_paterno` varchar(50) DEFAULT NULL,
  `apellido_materno` varchar(50) DEFAULT NULL,
  `carrera` varchar(50) DEFAULT NULL,
  `semestre` int DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `contrasena` varchar(50) DEFAULT NULL,
  `fotografia` varchar(100) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `intereses_academicos` varchar(200) DEFAULT NULL,
  `habilidades` varchar(200) DEFAULT NULL,
  `fortalezas` varchar(200) DEFAULT NULL,
  `objetivos_corto_plazo` varchar(200) DEFAULT NULL,
  `objetivos_largo_plazo` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`Num_control`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (555,'Dalia','Castro','Jose','SISTEMAS',3,'pv555@vallarta.tecmm.edu.mx','12345678','3c1427c6e7f6672f0d79c7c3bb540636','entusiasta','Economia','virtuales','valentia','hacer ejercicio','Escribir un libro'),(121212,'Pantaleon ','Macedo','macedo','turismo',1,'pv121212@vallarta.tecmm.edu.mx','12345678','5b4b0500ae4800ea4c5c8fb5816ef432','Mejora del medio ambiente','artes','economia','valentia','Escribir un articulo','Escribir un libro'),(313131,'Camilo','aguiar','Perez','Turismo',2,'pv313131@vallarta.tecmm.edu.mx','12345678','23dcbd9cd3f4b24fc09294a73179b0f7','Alta y guapa','artes','Negocio','Entusiasmos, Alegria','cantar','Escribir un libro'),(414141,'Felipe','Andrade','Patino','Ing Civil',1,'pv414141@vallarta.tecmm.edu.mx','12345678','a059979c0b71d41c6586411454f67285','Alto y guapo','Artes','economia','valentia','cantar','Escribir un libro'),(7777777,'Pepitp','perex','Lopex','turismo',2,'pv7777777@vallarta.tecmm.edu.mx','12345678','97bbc478d18356e426313c4e866dbaa0','Alta y guapa','Artes','virtuales','Entusiasmos, Alegria','tomar mas agua','Escribir un libro'),(11111111,'Lorena','Catriona','Perea','Gestion',6,'pv11111111@vallarta.tecmm.edu.mx','12345678','177d319c6c8798b20ec1927e18617efa','Alta y guapa','artes','virtuales','valor','hacer ejercicio','correr'),(22222222,'Patricio A','Estrella','Alcazar','SISTEMAS',7,'pv22222222@vallarta.tecmm.edu.mx','12345678','bc4347a090a9b3e0c234517457945b6c','Alto y guapo','Economia','virtuales','Entusiasmo','tomar mas agua','comer sano'),(190117211,'Daniela Monserrat','Macedo','Mendoza','SISTEMAS',8,'pv190117211@vallarta.tecmm.edu.mx','12345678','ca3f7db7225e369219485585fa955320','Alta y guapa','Matematicas','virtuales','valor','cantar','correr');
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
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

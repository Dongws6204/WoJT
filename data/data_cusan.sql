-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: web_cusan
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `address_name` text,
  `phone` varchar(20) DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`address_id`),
  KEY `fk_customer` (`customer_id`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  CONSTRAINT `fk_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `analytics`
--

DROP TABLE IF EXISTS `analytics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analytics` (
  `analytics_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `views` int unsigned DEFAULT '0',
  `purchases` int unsigned DEFAULT '0',
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`analytics_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `analytics_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analytics`
--

LOCK TABLES `analytics` WRITE;
/*!40000 ALTER TABLE `analytics` DISABLE KEYS */;
/*!40000 ALTER TABLE `analytics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `total_amout` decimal(10,2) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `id_prod` int DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `products_fk_4` (`product_id`),
  KEY `customers_fk_3` (`customer_id`),
  KEY `cart_fk_1` (`id_prod`),
  CONSTRAINT `cart_fk_1` FOREIGN KEY (`id_prod`) REFERENCES `product_detail` (`id_prod`),
  CONSTRAINT `customers_fk_3` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  CONSTRAINT `products_fk_4` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_logs`
--

DROP TABLE IF EXISTS `chat_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_logs` (
  `chat_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `bot_message` text NOT NULL,
  `user_message` text NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`chat_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `chat_logs_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_logs`
--

LOCK TABLES `chat_logs` WRITE;
/*!40000 ALTER TABLE `chat_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clothes_evaluate`
--

DROP TABLE IF EXISTS `clothes_evaluate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes_evaluate` (
  `product_id` int DEFAULT NULL,
  `product_rate` float DEFAULT '0',
  `sum_rate` int DEFAULT '0',
  `sum_star` int DEFAULT '0',
  KEY `product_id` (`product_id`),
  CONSTRAINT `clothes_evaluate_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clothes_evaluate`
--

LOCK TABLES `clothes_evaluate` WRITE;
/*!40000 ALTER TABLE `clothes_evaluate` DISABLE KEYS */;
INSERT INTO `clothes_evaluate` VALUES (1,0,0,0),(2,0,0,0),(3,0,0,0),(4,0,0,0),(5,0,0,0),(6,0,0,0),(7,0,0,0),(8,0,0,0),(9,0,0,0),(10,0,0,0),(11,0,0,0),(12,0,0,0),(13,0,0,0),(14,0,0,0),(15,0,0,0),(16,0,0,0),(17,0,0,0),(18,0,0,0),(19,0,0,0),(20,0,0,0),(21,0,0,0),(22,0,0,0),(23,0,0,0),(24,0,0,0),(25,0,0,0),(26,0,0,0),(27,0,0,0),(28,0,0,0),(29,0,0,0),(30,0,0,0),(31,0,0,0),(32,0,0,0),(33,0,0,0),(34,0,0,0),(35,0,0,0),(36,0,0,0),(37,0,0,0),(38,0,0,0),(39,0,0,0),(40,0,0,0),(41,0,0,0),(42,0,0,0),(43,0,0,0),(44,0,0,0),(45,0,0,0),(46,0,0,0),(47,0,0,0),(48,0,0,0),(49,0,0,0),(50,0,0,0),(51,0,0,0),(52,0,0,0),(53,0,0,0),(54,0,0,0),(55,0,0,0),(56,0,0,0),(57,0,0,0),(58,0,0,0),(59,0,0,0),(60,0,0,0),(61,0,0,0),(62,0,0,0),(63,0,0,0),(64,0,0,0),(65,0,0,0),(66,0,0,0),(67,0,0,0),(68,0,0,0),(69,0,0,0),(70,0,0,0),(71,0,0,0),(72,0,0,0),(73,0,0,0),(74,0,0,0),(75,0,0,0),(76,0,0,0),(77,0,0,0),(78,0,0,0),(79,0,0,0),(80,0,0,0),(81,0,0,0),(82,0,0,0),(83,0,0,0),(84,0,0,0),(85,0,0,0),(86,0,0,0),(87,0,0,0),(88,0,0,0),(89,0,0,0),(90,0,0,0),(91,0,0,0),(92,0,0,0),(93,0,0,0),(94,0,0,0),(95,0,0,0),(96,0,0,0);
/*!40000 ALTER TABLE `clothes_evaluate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthday` date NOT NULL,
  `role` int DEFAULT '1',
  `pass_word` varchar(500) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (12,'Nguyễn Hữu Cứ','22026532@vnu.edu.vn','0342348237',NULL,'2024-11-14',2,'20004','abcxyz12'),(13,'sdfsdjkhfjk','dksfhsdjkhf@kgjkhsjk','239489',NULL,'2024-12-06',NULL,'2004','abcxyz'),(14,'Nguyễn Hữu Cứ','cucu0375726692@gmail.com','0375726692','Cầu giấy, Hà Nội','2024-12-24',1,'pbkdf2_sha256$390000$9AKWGddgfUawQ6VKx3Y3Zw$2iqW0Wka5Y6YSfygY14CyxyNYBVZFWE1TMa1LQejddo=','cuK67J204'),(15,'Vo Quang Sang','sangv6548@gmail.com','0974583072','Nghi Xuan Ha Tinh','2003-12-15',1,'pbkdf2_sha256$870000$gi26Xc4Tk03KDP3HG1IvNZ$vMYqsdPT53DVU4mtAlfz4Pj+nPnPnUFniz7hGZFl5X4=','San525');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluate`
--

DROP TABLE IF EXISTS `evaluate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluate` (
  `customer_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `comments` varchar(200) DEFAULT NULL,
  `star` int DEFAULT NULL,
  `date_posted` date DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `evaluate_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  CONSTRAINT `evaluate_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluate`
--

LOCK TABLES `evaluate` WRITE;
/*!40000 ALTER TABLE `evaluate` DISABLE KEYS */;
INSERT INTO `evaluate` VALUES (13,1,'Great product!',5,'2024-10-27',1),(13,2,'Good value for money',4,'2024-10-28',2),(13,3,'Satisfactory',3,'2024-10-29',3),(12,1,'Excellent quality!',5,'2024-11-01',4),(12,2,'Very comfortable',4,'2024-11-02',5),(12,3,'Could be better',3,'2024-11-03',6),(13,1,'Hay đấy nhá',5,'2024-10-27',7);
/*!40000 ALTER TABLE `evaluate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `inventory_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `stock_quantity` int unsigned NOT NULL DEFAULT '0',
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inventory_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `object`
--

DROP TABLE IF EXISTS `object`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `object` (
  `object_id` int NOT NULL AUTO_INCREMENT,
  `object_name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`object_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `object`
--

LOCK TABLES `object` WRITE;
/*!40000 ALTER TABLE `object` DISABLE KEYS */;
INSERT INTO `object` VALUES (1,'NAM'),(2,'NỮ'),(3,'BÉ TRAI'),(4,'BÉ GÁI');
/*!40000 ALTER TABLE `object` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetail`
--

DROP TABLE IF EXISTS `orderdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `id_prod` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_fk_2` (`order_id`),
  KEY `orderdetail_fk3_id_prod` (`id_prod`),
  CONSTRAINT `orderdetail_fk3_id_prod` FOREIGN KEY (`id_prod`) REFERENCES `product_detail` (`id_prod`),
  CONSTRAINT `orders_fk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetail`
--

LOCK TABLES `orderdetail` WRITE;
/*!40000 ALTER TABLE `orderdetail` DISABLE KEYS */;
INSERT INTO `orderdetail` VALUES (1,3,2,100.00,1),(2,3,1,100.00,2),(3,6,1,499000.00,128),(4,7,1,299000.00,144),(5,7,1,499000.00,159),(6,8,2,498000.00,13),(7,8,1,279000.00,29);
/*!40000 ALTER TABLE `orderdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `status` int DEFAULT '1',
  PRIMARY KEY (`order_id`),
  KEY `orders_fk_1` (`customer_id`),
  CONSTRAINT `orders_fk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (3,13,'2024-12-10',200.00,1),(4,13,'2024-12-10',NULL,1),(5,13,'2024-12-10',200.00,1),(6,15,'2024-12-14',499000.00,1),(7,15,'2024-12-14',798000.00,1),(8,15,'2024-12-14',777000.00,1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `payment_method` enum('Credit Card','Debit Card','PayPal','Bank Transfer','Cash') NOT NULL,
  `payment_status` enum('Pending','Completed','Failed') NOT NULL DEFAULT 'Pending',
  `payment_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `transaction_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolio`
--

DROP TABLE IF EXISTS `portfolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portfolio` (
  `id_port` int NOT NULL AUTO_INCREMENT,
  `port_name` varchar(200) DEFAULT NULL,
  `object_id` int DEFAULT NULL,
  PRIMARY KEY (`id_port`),
  KEY `object_id` (`object_id`),
  CONSTRAINT `portfolio_ibfk_1` FOREIGN KEY (`object_id`) REFERENCES `object` (`object_id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio`
--

LOCK TABLES `portfolio` WRITE;
/*!40000 ALTER TABLE `portfolio` DISABLE KEYS */;
INSERT INTO `portfolio` VALUES (1,'Áo phông & Áo thun',1),(2,'Áo nỉ & Áo Hoodie',1),(3,'Áo khoác',1),(4,'Áo & Quần giữ nhiệt',1),(5,'Áo len',1),(6,'Quần nỉ',1),(7,'Đồ ngủ',1),(8,'Đồ bộ',1),(9,'Quần dài & Quần jean',1),(10,'Áo Polo',1),(11,'Áo sơ mi',1),(12,'Áo chống nắng',1),(13,'Quần Áo Thể Thao',1),(14,'Quần Short',1),(15,'Đồ lót',1),(16,'Tất & vớ',1),(17,'Áo phông & Áo thun',2),(18,'Áo nỉ & Áo Hoodie',2),(19,'Áo khoác',2),(20,'Áo & Quần giữ nhiệt',2),(21,'Áo len',2),(22,'Quần nỉ',2),(23,'Đồ ngủ',2),(24,'Đồ bộ',2),(25,'Quần dài & Quần jean',2),(26,'Váy',2),(27,'Quần Áo Thể Thao',2),(28,'Áo Polo',2),(29,'Áo sơ mi',2),(30,'Áo chống nắng',2),(31,'Quần Short',2),(32,'Đồ lót',2),(33,'Tất & vớ',2),(34,'Áo phông & Áo thun',3),(35,'Áo nỉ & Áo Hoodie',3),(36,'Áo khoác',3),(37,'Áo & Quần giữ nhiệt',3),(38,'Áo len',3),(39,'Quần nỉ',3),(40,'Đồ ngủ',3),(41,'Đồ bộ',3),(42,'Quần dài & Quần jean',3),(43,'Áo Polo',3),(44,'Áo sơ mi',3),(45,'Áo chống nắng',3),(46,'Quần Áo Thể Thao',3),(47,'Quần Short',3),(48,'Đồ lót',3),(49,'Tất & vớ',3),(50,'Áo phông & Áo thun',4),(51,'Áo nỉ & Áo Hoodie',4),(52,'Áo khoác',4),(53,'Áo & Quần giữ nhiệt',4),(54,'Áo len',4),(55,'Quần nỉ',4),(56,'Đồ ngủ',4),(57,'Đồ bộ',4),(58,'Quần dài & Quần jean',4),(59,'Váy',4),(60,'Quần Áo Thể Thao',4),(61,'Áo Polo',4),(62,'Áo sơ mi',4),(63,'Áo chống nắng',4),(64,'Quần Short',4),(65,'Đồ lót',4),(66,'Tất & vớ',4);
/*!40000 ALTER TABLE `portfolio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_detail`
--

DROP TABLE IF EXISTS `product_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_detail` (
  `id_prod` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `size` varchar(10) DEFAULT NULL,
  `quantity_of_size` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id_prod`),
  KEY `products_fk_2` (`product_id`),
  CONSTRAINT `products_fk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=481 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_detail`
--

LOCK TABLES `product_detail` WRITE;
/*!40000 ALTER TABLE `product_detail` DISABLE KEYS */;
INSERT INTO `product_detail` VALUES (1,1,'S',50),(2,1,'M',50),(3,1,'L',50),(4,1,'XL',50),(5,1,'2XL',50),(6,2,'S',50),(7,2,'M',50),(8,2,'L',50),(9,2,'XL',50),(10,2,'2XL',50),(11,3,'S',50),(12,3,'M',50),(13,3,'L',50),(14,3,'XL',50),(15,3,'2XL',50),(16,4,'S',50),(17,4,'M',50),(18,4,'L',50),(19,4,'XL',50),(20,4,'2XL',50),(21,5,'S',50),(22,5,'M',50),(23,5,'L',50),(24,5,'XL',50),(25,5,'2XL',50),(26,6,'S',50),(27,6,'M',50),(28,6,'L',50),(29,6,'XL',50),(30,6,'2XL',50),(31,7,'S',50),(32,7,'M',50),(33,7,'L',50),(34,7,'XL',50),(35,7,'2XL',50),(36,8,'S',50),(37,8,'M',50),(38,8,'L',50),(39,8,'XL',50),(40,8,'2XL',50),(41,9,'S',50),(42,9,'M',50),(43,9,'L',50),(44,9,'XL',50),(45,9,'2XL',50),(46,10,'S',50),(47,10,'M',50),(48,10,'L',50),(49,10,'XL',50),(50,10,'2XL',50),(51,11,'S',50),(52,11,'M',50),(53,11,'L',50),(54,11,'XL',50),(55,11,'2XL',50),(56,12,'S',50),(57,12,'M',50),(58,12,'L',50),(59,12,'XL',50),(60,12,'2XL',50),(61,13,'S',50),(62,13,'M',50),(63,13,'L',50),(64,13,'XL',50),(65,13,'2XL',50),(66,14,'S',50),(67,14,'M',50),(68,14,'L',50),(69,14,'XL',50),(70,14,'2XL',50),(71,15,'S',50),(72,15,'M',50),(73,15,'L',50),(74,15,'XL',50),(75,15,'2XL',50),(76,16,'S',50),(77,16,'M',50),(78,16,'L',50),(79,16,'XL',50),(80,16,'2XL',50),(81,17,'S',50),(82,17,'M',50),(83,17,'L',50),(84,17,'XL',50),(85,17,'2XL',50),(86,18,'S',50),(87,18,'M',50),(88,18,'L',50),(89,18,'XL',50),(90,18,'2XL',50),(91,19,'S',50),(92,19,'M',50),(93,19,'L',50),(94,19,'XL',50),(95,19,'2XL',50),(96,20,'S',50),(97,20,'M',50),(98,20,'L',50),(99,20,'XL',50),(100,20,'2XL',50),(101,21,'S',50),(102,21,'M',50),(103,21,'L',50),(104,21,'XL',50),(105,21,'2XL',50),(106,22,'S',50),(107,22,'M',50),(108,22,'L',50),(109,22,'XL',50),(110,22,'2XL',50),(111,23,'S',50),(112,23,'M',50),(113,23,'L',50),(114,23,'XL',50),(115,23,'2XL',50),(116,24,'S',50),(117,24,'M',50),(118,24,'L',50),(119,24,'XL',50),(120,24,'2XL',50),(121,25,'S',50),(122,25,'M',50),(123,25,'L',50),(124,25,'XL',50),(125,25,'2XL',50),(126,26,'S',50),(127,26,'M',50),(128,26,'L',50),(129,26,'XL',50),(130,26,'2XL',50),(131,27,'S',50),(132,27,'M',50),(133,27,'L',50),(134,27,'XL',50),(135,27,'2XL',50),(136,28,'S',50),(137,28,'M',50),(138,28,'L',50),(139,28,'XL',50),(140,28,'2XL',50),(141,29,'S',50),(142,29,'M',50),(143,29,'L',50),(144,29,'XL',50),(145,29,'2XL',50),(146,30,'S',50),(147,30,'M',50),(148,30,'L',50),(149,30,'XL',50),(150,30,'2XL',50),(151,31,'S',50),(152,31,'M',50),(153,31,'L',50),(154,31,'XL',50),(155,31,'2XL',50),(156,32,'S',50),(157,32,'M',50),(158,32,'L',50),(159,32,'XL',50),(160,32,'2XL',50),(161,33,'S',50),(162,33,'M',50),(163,33,'L',50),(164,33,'XL',50),(165,33,'2XL',50),(166,34,'S',50),(167,34,'M',50),(168,34,'L',50),(169,34,'XL',50),(170,34,'2XL',50),(171,35,'S',50),(172,35,'M',50),(173,35,'L',50),(174,35,'XL',50),(175,35,'2XL',50),(176,36,'S',50),(177,36,'M',50),(178,36,'L',50),(179,36,'XL',50),(180,36,'2XL',50),(181,37,'S',50),(182,37,'M',50),(183,37,'L',50),(184,37,'XL',50),(185,37,'2XL',50),(186,38,'S',50),(187,38,'M',50),(188,38,'L',50),(189,38,'XL',50),(190,38,'2XL',50),(191,39,'S',50),(192,39,'M',50),(193,39,'L',50),(194,39,'XL',50),(195,39,'2XL',50),(196,40,'S',50),(197,40,'M',50),(198,40,'L',50),(199,40,'XL',50),(200,40,'2XL',50),(201,41,'S',50),(202,41,'M',50),(203,41,'L',50),(204,41,'XL',50),(205,41,'2XL',50),(206,42,'S',50),(207,42,'M',50),(208,42,'L',50),(209,42,'XL',50),(210,42,'2XL',50),(211,43,'S',50),(212,43,'M',50),(213,43,'L',50),(214,43,'XL',50),(215,43,'2XL',50),(216,44,'S',50),(217,44,'M',50),(218,44,'L',50),(219,44,'XL',50),(220,44,'2XL',50),(221,45,'S',50),(222,45,'M',50),(223,45,'L',50),(224,45,'XL',50),(225,45,'2XL',50),(226,46,'S',50),(227,46,'M',50),(228,46,'L',50),(229,46,'XL',50),(230,46,'2XL',50),(231,47,'S',50),(232,47,'M',50),(233,47,'L',50),(234,47,'XL',50),(235,47,'2XL',50),(236,48,'S',50),(237,48,'M',50),(238,48,'L',50),(239,48,'XL',50),(240,48,'2XL',50),(241,49,'S',50),(242,49,'M',50),(243,49,'L',50),(244,49,'XL',50),(245,49,'2XL',50),(246,50,'S',50),(247,50,'M',50),(248,50,'L',50),(249,50,'XL',50),(250,50,'2XL',50),(251,51,'S',50),(252,51,'M',50),(253,51,'L',50),(254,51,'XL',50),(255,51,'2XL',50),(256,52,'S',50),(257,52,'M',50),(258,52,'L',50),(259,52,'XL',50),(260,52,'2XL',50),(261,53,'S',50),(262,53,'M',50),(263,53,'L',50),(264,53,'XL',50),(265,53,'2XL',50),(266,54,'S',50),(267,54,'M',50),(268,54,'L',50),(269,54,'XL',50),(270,54,'2XL',50),(271,55,'S',50),(272,55,'M',50),(273,55,'L',50),(274,55,'XL',50),(275,55,'2XL',50),(276,56,'S',50),(277,56,'M',50),(278,56,'L',50),(279,56,'XL',50),(280,56,'2XL',50),(281,57,'S',50),(282,57,'M',50),(283,57,'L',50),(284,57,'XL',50),(285,57,'2XL',50),(286,58,'S',50),(287,58,'M',50),(288,58,'L',50),(289,58,'XL',50),(290,58,'2XL',50),(291,59,'S',50),(292,59,'M',50),(293,59,'L',50),(294,59,'XL',50),(295,59,'2XL',50),(296,60,'S',50),(297,60,'M',50),(298,60,'L',50),(299,60,'XL',50),(300,60,'2XL',50),(301,61,'S',50),(302,61,'M',50),(303,61,'L',50),(304,61,'XL',50),(305,61,'2XL',50),(306,62,'S',50),(307,62,'M',50),(308,62,'L',50),(309,62,'XL',50),(310,62,'2XL',50),(311,63,'S',50),(312,63,'M',50),(313,63,'L',50),(314,63,'XL',50),(315,63,'2XL',50),(316,64,'S',50),(317,64,'M',50),(318,64,'L',50),(319,64,'XL',50),(320,64,'2XL',50),(321,65,'S',50),(322,65,'M',50),(323,65,'L',50),(324,65,'XL',50),(325,65,'2XL',50),(326,66,'S',50),(327,66,'M',50),(328,66,'L',50),(329,66,'XL',50),(330,66,'2XL',50),(331,67,'S',50),(332,67,'M',50),(333,67,'L',50),(334,67,'XL',50),(335,67,'2XL',50),(336,68,'S',50),(337,68,'M',50),(338,68,'L',50),(339,68,'XL',50),(340,68,'2XL',50),(341,69,'S',50),(342,69,'M',50),(343,69,'L',50),(344,69,'XL',50),(345,69,'2XL',50),(346,70,'S',50),(347,70,'M',50),(348,70,'L',50),(349,70,'XL',50),(350,70,'2XL',50),(351,71,'S',50),(352,71,'M',50),(353,71,'L',50),(354,71,'XL',50),(355,71,'2XL',50),(356,72,'S',50),(357,72,'M',50),(358,72,'L',50),(359,72,'XL',50),(360,72,'2XL',50),(361,73,'S',50),(362,73,'M',50),(363,73,'L',50),(364,73,'XL',50),(365,73,'2XL',50),(366,74,'S',50),(367,74,'M',50),(368,74,'L',50),(369,74,'XL',50),(370,74,'2XL',50),(371,75,'S',50),(372,75,'M',50),(373,75,'L',50),(374,75,'XL',50),(375,75,'2XL',50),(376,76,'S',50),(377,76,'M',50),(378,76,'L',50),(379,76,'XL',50),(380,76,'2XL',50),(381,77,'S',50),(382,77,'M',50),(383,77,'L',50),(384,77,'XL',50),(385,77,'2XL',50),(386,78,'S',50),(387,78,'M',50),(388,78,'L',50),(389,78,'XL',50),(390,78,'2XL',50),(391,79,'S',50),(392,79,'M',50),(393,79,'L',50),(394,79,'XL',50),(395,79,'2XL',50),(396,80,'S',50),(397,80,'M',50),(398,80,'L',50),(399,80,'XL',50),(400,80,'2XL',50),(401,81,'S',50),(402,81,'M',50),(403,81,'L',50),(404,81,'XL',50),(405,81,'2XL',50),(406,82,'S',50),(407,82,'M',50),(408,82,'L',50),(409,82,'XL',50),(410,82,'2XL',50),(411,83,'S',50),(412,83,'M',50),(413,83,'L',50),(414,83,'XL',50),(415,83,'2XL',50),(416,84,'S',50),(417,84,'M',50),(418,84,'L',50),(419,84,'XL',50),(420,84,'2XL',50),(421,85,'S',50),(422,85,'M',50),(423,85,'L',50),(424,85,'XL',50),(425,85,'2XL',50),(426,86,'S',50),(427,86,'M',50),(428,86,'L',50),(429,86,'XL',50),(430,86,'2XL',50),(431,87,'S',50),(432,87,'M',50),(433,87,'L',50),(434,87,'XL',50),(435,87,'2XL',50),(436,88,'S',50),(437,88,'M',50),(438,88,'L',50),(439,88,'XL',50),(440,88,'2XL',50),(441,89,'S',50),(442,89,'M',50),(443,89,'L',50),(444,89,'XL',50),(445,89,'2XL',50),(446,90,'S',50),(447,90,'M',50),(448,90,'L',50),(449,90,'XL',50),(450,90,'2XL',50),(451,91,'S',50),(452,91,'M',50),(453,91,'L',50),(454,91,'XL',50),(455,91,'2XL',50),(456,92,'S',50),(457,92,'M',50),(458,92,'L',50),(459,92,'XL',50),(460,92,'2XL',50),(461,93,'S',50),(462,93,'M',50),(463,93,'L',50),(464,93,'XL',50),(465,93,'2XL',50),(466,94,'S',50),(467,94,'M',50),(468,94,'L',50),(469,94,'XL',50),(470,94,'2XL',50),(471,95,'S',50),(472,95,'M',50),(473,95,'L',50),(474,95,'XL',50),(475,95,'2XL',50),(476,96,'S',50),(477,96,'M',50),(478,96,'L',50),(479,96,'XL',50),(480,96,'2XL',50);
/*!40000 ALTER TABLE `product_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(150) DEFAULT NULL,
  `quantity_stock` int unsigned DEFAULT NULL,
  `id_port` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `img_1` text,
  `ing_2` text,
  `quantity_sold` int DEFAULT '0',
  PRIMARY KEY (`product_id`),
  KEY `portfolio_fk_1` (`id_port`),
  CONSTRAINT `portfolio_fk_1` FOREIGN KEY (`id_port`) REFERENCES `portfolio` (`id_port`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Áo phông nữ cổ tim',150,17,149000.00,'https://canifa.com/img/500/750/resize/6/t/6ts25a002-sg425-m-1-u.webp',NULL,0),(2,'Áo phông nữ cổ tròn',150,17,149000.00,'https://canifa.com/img/500/750/resize/6/t/6ts25a001-sn010-m-1-u.webp',NULL,0),(3,'Áo phông nữ',150,17,249000.00,'https://canifa.com/img/500/750/resize/6/t/6ts24w001-sn014-thumb.webp',NULL,0),(4,'Áo body nữ cổ lửng',150,17,279000.00,'https://canifa.com/img/500/750/resize/6/i/6it24w004-sa191-l-1-u.webp',NULL,0),(5,'Áo phông nữ dài tay',150,17,249000.00,'https://canifa.com/img/500/750/resize/6/t/6tl24w006-sb508-thumb.webp',NULL,0),(6,'Áo body nữ cổ tròn',150,17,279000.00,'https://canifa.com/img/500/750/resize/6/i/6it24w003-se136-thumb.webp',NULL,0),(7,'Áo phông dài tay nữ',150,17,299000.00,'https://canifa.com/img/500/750/resize/6/t/6tl24w002-sa702-l-1-u.webp',NULL,0),(8,'Áo giữ nhiệt nữ cổ tròn',150,17,279000.00,'https://canifa.com/img/500/750/resize/6/i/6it24w005-se068-thumb.webp',NULL,0),(9,'Áo phông nữ cổ vuống dáng ôm',150,17,249000.00,'https://canifa.com/img/500/750/resize/6/t/6tl24w007-sb508-m-1-u.webp',NULL,0),(10,'Áo phông dài tay nữ',150,17,349000.00,'https://canifa.com/img/500/750/resize/6/t/6tl24w008-sk010-thumb.webp',NULL,0),(11,'Áo phông dài tay nữ cổ cao',150,17,349000.00,'https://canifa.com/img/500/750/resize/6/t/6tl24w003-sk010-thumb.webp',NULL,0),(12,'Áo phông nữ cotton USA dáng oversize',150,17,399000.00,'https://canifa.com/img/500/750/resize/6/t/6ts24w004-sp141-thumb.webp',NULL,0),(13,'Áo phông nữ cotton USA dáng oversize',150,17,399000.00,'https://canifa.com/img/500/750/resize/6/t/6ts24w004-sk010-thumb.webp',NULL,0),(14,'Áo phông nữ cotton USA dáng oversize',150,17,399000.00,'https://canifa.com/img/500/750/resize/6/t/6ts24w004-sa130-thumb.webp',NULL,0),(15,'Áo phông nữ cotton USA dáng oversize',150,17,399000.00,'https://canifa.com/img/500/750/resize/6/t/6ts24w004-sw001-thumb.webp',NULL,0),(16,'Áo phông dài tay nữ',150,17,299000.00,'https://canifa.com/img/500/750/resize/6/t/6tl24w010-sw113-thumb.webp',NULL,0),(17,'Áo phông dài tay nữ',150,17,299000.00,'https://canifa.com/img/500/750/resize/6/t/6tl24w010-se097-thumb.webp',NULL,0),(18,'Áo phông nữ in hình công chúa',150,17,399000.00,'https://canifa.com/img/500/750/resize/6/t/6ts24w006-sp141-thumb.webp',NULL,0),(19,'Áo phông nữ in hình công chúa',150,17,399000.00,'https://canifa.com/img/500/750/resize/6/t/6ts24w006-sw001-thumb.webp',NULL,0),(20,'Áo phông nữ in hình công chúa',150,17,399000.00,'https://canifa.com/img/500/750/resize/6/t/6ts24w006-sk010-thumb.webp',NULL,0),(21,'Áo phông nữ',150,17,249000.00,'https://canifa.com/img/500/750/resize/6/t/6ts24w005-sg541-l-1-u-a.webp',NULL,0),(22,'Áo phông nữ cổ cao phối khoá',150,17,349000.00,'https://canifa.com/img/500/750/resize/6/t/6ts24w002-sa873-thumb.webp',NULL,0),(23,'Áo phông dài tay nữ active',150,17,349000.00,'https://canifa.com/img/500/750/resize/6/t/6tl24w009-sg541-l-1-u.webp',NULL,0),(24,'Áo phông nữ cotton dáng rộng',150,17,299000.00,'https://canifa.com/img/500/750/resize/6/t/6ts24w003-sk010-thumb.webp',NULL,0),(25,'Áo phông nam',150,1,149000.00,'https://canifa.com/img/500/750/resize/8/t/8ts25a002-se409-xl-1-u.webp',NULL,0),(26,'Áo phông dài tay nam',150,1,499000.00,'https://canifa.com/img/500/750/resize/8/t/8tl24w002-sk010-thumb.webp',NULL,0),(27,'Áo phông active nam',150,1,399000.00,'https://canifa.com/img/500/750/resize/8/t/8tl24w005-sa815-xl-1-u.webp',NULL,0),(28,'Áo phông nam',150,1,449000.00,'https://canifa.com/img/500/750/resize/8/t/8ts24w004-se331-xl-1-u.webp',NULL,0),(29,'Áo phông nam in chữ',150,1,299000.00,'https://canifa.com/img/500/750/resize/8/t/8ts24w002-sg650-thumb.webp',NULL,0),(30,'Áo phông nam in chữ',150,1,299000.00,'https://canifa.com/img/500/750/resize/8/t/8ts24w002-sk010-thumb.webp',NULL,0),(31,'Áo phông nam in chữ',150,1,299000.00,'https://canifa.com/img/500/750/resize/8/t/8ts24w001-sg650-thumb.webp',NULL,0),(32,'Áo phông dài tay nam',150,1,499000.00,'https://canifa.com/img/500/750/resize/8/t/8tl24w007-se384-thumb.webp',NULL,0),(33,'Áo phông nam cổ tròn dáng suông',150,1,149000.00,'https://canifa.com/img/500/750/resize/8/t/8ts24a001-sb001-thumb.webp',NULL,0),(34,'Áo phông nam cotton cổ tròn dáng suông',150,1,149000.00,'https://canifa.com/img/500/750/resize/8/t/8ts24a005-sl178-l-1-u.webp',NULL,0),(35,'Áo phông nam cổ tim dáng suông',150,1,149000.00,'https://canifa.com/img/500/750/resize/8/t/8ts24a002-sb001-thumb.webp',NULL,0),(36,'Áo phông nam cổ tròn dáng suông',150,1,149000.00,'https://canifa.com/img/500/750/resize/8/t/8ts24a004-sa050-thumb.webp',NULL,0),(37,'Áo phông nam in chữ',150,1,399000.00,'https://canifa.com/img/500/750/resize/8/t/8ts24c005-sw001-thumb.webp',NULL,0),(38,'Áo phông nam in chữ',150,1,399000.00,'https://canifa.com/img/500/750/resize/8/t/8ts24c005-sb001-thumb.webp',NULL,0),(39,'Áo phông nam in chữ',150,1,399000.00,'https://canifa.com/img/500/750/resize/8/t/8ts24c005-sa096-thumb.webp',NULL,0),(40,'Áo phông nam có túi ngực',150,1,315000.00,'https://canifa.com/img/500/750/resize/8/t/8ts24c003-sk010-thumb.webp',NULL,0),(41,'Áo phông nam có hình in',150,1,399000.00,'https://canifa.com/img/500/750/resize/8/t/8ts24c001-sg498-thumb.webp',NULL,0),(42,'Áo phông nam cotton USA dáng oversize',150,1,399000.00,'https://canifa.com/img/500/750/resize/8/t/8ts24c004-se346-1-thumb.webp',NULL,0),(43,'Áo phông nam có hình in',150,1,279000.00,'https://canifa.com/img/500/750/resize/8/t/8ts24c001-sw012-thumb.webp',NULL,0),(44,'Áo phông nam có hình in',150,1,399000.00,'https://canifa.com/img/500/750/resize/8/t/8ts24c001-sb001-thumb.webp',NULL,0),(45,'Áo phông nam có hình in',150,1,299000.00,'https://canifa.com/img/500/750/resize/8/t/8ts24s001-sb001-thumb.webp',NULL,0),(46,'Áo phông unisex người lớn cotton dáng boxy',150,1,209000.00,'https://canifa.com/img/500/750/resize/5/t/5ts24s011-sw386-thumb.webp',NULL,0),(47,'Áo phông nam hoạ tiết kẻ',150,1,399000.00,'https://canifa.com/img/500/750/resize/8/t/8ts24s011-pb441-thumb.webp',NULL,0),(48,'Áo phông nam có hình in',150,1,195000.00,'https://canifa.com/img/500/750/resize/8/t/8ts24s003-sw001-thumb.webp',NULL,0),(49,'Áo body unisex trẻ em cotton',150,50,159000.00,'https://canifa.com/img/500/750/resize/3/i/3it24w001-fb473-thumb.webp',NULL,0),(50,'Áo body bé gái cổ lửng',150,50,159000.00,'https://canifa.com/img/500/750/resize/1/i/1it24w003-sw011-thumb.webp',NULL,0),(51,'Áo phông dài tay bé gái in hình Wolfoo',150,50,219000.00,'https://canifa.com/img/500/750/resize/1/t/1tl24w002-sm128-thumb.webp',NULL,0),(52,'Áo phông dài tay bé gái cotton USA hình Wolfoo',150,50,219000.00,'https://canifa.com/img/500/750/resize/1/t/1tl24w002-sw001-thumb.webp',NULL,0),(53,'Áo phông dài tay bé gái cotton USA hình Wolfoo',150,50,219000.00,'https://canifa.com/img/500/750/resize/1/t/1tl24w002-sp020-thumb.webp',NULL,0),(54,'Áo phông bé gái cotton USA có hình in',150,50,199000.00,'https://canifa.com/img/500/750/resize/1/t/1ts24w004-sm192-thumb.webp',NULL,0),(55,'Áo phông bé gái cotton USA có hình in',150,50,199000.00,'https://canifa.com/img/500/750/resize/1/t/1ts24w004-sg570-thumb.webp',NULL,0),(56,'Áo phông bé gái đính patch trang trí',150,50,199000.00,'https://canifa.com/img/500/750/resize/1/t/1tl24w001-sm085-128-1-u.webp',NULL,0),(57,'Áo phông bé gái in hình Minnie',150,50,249000.00,'https://canifa.com/img/500/750/resize/1/t/1tl24w004-fm295-128-1-u.webp',NULL,0),(58,'Áo phông bé gái thêu nơ',150,50,149000.00,'https://canifa.com/img/500/750/resize/1/t/1ts24w001-sm085-128-1-u.webp',NULL,0),(59,'Áo phông dài tay bé gái',150,50,299000.00,'https://canifa.com/img/500/750/resize/1/t/1tl24w007-se293-134-1-u.webp',NULL,0),(60,'Áo phông bé gái cotton USA in hình mèo Marie',150,50,199000.00,'https://canifa.com/img/500/750/resize/1/t/1ts24w002-sw001-122-1-u.webp',NULL,0),(61,'Áo phông bé gái cotton USA in hình mèo Marie',150,50,199000.00,'https://canifa.com/img/500/750/resize/1/t/1ts24w002-sm133-thumb.webp',NULL,0),(62,'Áo phông bé gái cotton USA in hình mèo Marie',150,50,199000.00,'https://canifa.com/img/500/750/resize/1/t/1ts24w002-sp260-thumb.webp',NULL,0),(63,'Áo phông bé gái cotton USA có hình in',150,50,249000.00,'	https://canifa.com/img/500/750/resize/1/t/1ts24c001-sw001-thumb.webp',NULL,0),(64,'Áo phông bé gái cotton USA có hình in',150,50,175000.00,'https://canifa.com/img/500/750/resize/1/t/1ts24c001-sp091-thumb.webp',NULL,0),(65,'Áo phông bé gái cotton USA dáng ngắn đính patch',150,50,188000.00,'https://canifa.com/img/500/750/resize/1/t/1ts24c005-sm052-thumb.webp',NULL,0),(66,'Áo phông bé gái cotton USA có hình in',150,50,209000.00,'https://canifa.com/img/500/750/resize/1/t/1ts24c004-se068-thumb.webp',NULL,0),(67,'Áo phông bé gái cotton USA có hình in',150,50,299000.00,'https://canifa.com/img/500/750/resize/1/t/1ts24c004-sk010-thumb.webp',NULL,0),(68,'Áo phông bé gái cotton dáng oversize có hình in',150,50,299000.00,'https://canifa.com/img/500/750/resize/1/t/1ts24c002-fm285-thumb.webp',NULL,0),(69,'Áo phông bé gái cotton dáng oversize có hình in',150,50,299000.00,'https://canifa.com/img/500/750/resize/1/t/1ts24c002-sw001-thumb.webp',NULL,0),(70,'Áo phông bé gái cotton dáng oversize có hình in',150,50,299000.00,'https://canifa.com/img/500/750/resize/1/t/1ts24c002-sw001-thumb.webp',NULL,0),(71,'Áo phông unisex trẻ em có hình in',150,50,118000.00,'https://canifa.com/img/500/750/resize/3/t/3ts24s005-sw001-thumb.webp',NULL,0),(72,'Áo phông unisex trẻ em có hình in',150,50,118000.00,'https://canifa.com/img/500/750/resize/3/t/3ts24s005-sy284-thumb.webp',NULL,0),(73,'Áo body unisex trẻ em cotton',150,34,159000.00,'https://canifa.com/img/500/750/resize/3/i/3it24w001-fb473-thumb.webp',NULL,0),(74,'Áo phông bé trai cotton USA có hình in',150,34,149000.00,'https://canifa.com/img/500/750/resize/2/t/2ts24w001-sy029-128-1-u.webp',NULL,0),(75,'Áo phông bé trai cotton USA có hình in',150,34,149000.00,'https://canifa.com/img/500/750/resize/2/t/2ts24w001-sr304-1-thumb.webp',NULL,0),(76,'Áo phông bé trai cotton USA có hình in',150,34,149000.00,'https://canifa.com/img/500/750/resize/2/t/2ts24w001-sk010-128-1-u.webp',NULL,0),(77,'Áo phông bé trai cotton USA có hình in',150,34,149000.00,'https://canifa.com/img/500/750/resize/2/t/2ts24w001-sb004-128-1-u.webp',NULL,0),(78,'Áo phông bé trai cotton dài tay',150,34,299000.00,'https://canifa.com/img/500/750/resize/2/t/2tl24w005-pg115-1-thumb.webp',NULL,0),(79,'Áo phông bé trai có hình in',150,34,199000.00,'https://canifa.com/img/500/750/resize/2/t/2ts24w002-sw001-thumb.webp',NULL,0),(80,'Áo phông bé trai có hình in',150,34,199000.00,'https://canifa.com/img/500/750/resize/2/t/2ts24w002-sb148-thumb.webp',NULL,0),(81,'Áo phông bé trai có hình in',150,34,199000.00,'https://canifa.com/img/500/750/resize/2/t/2ts24w002-sk010-thumb.webp',NULL,0),(82,'Áo phông bé trai in hình Spiderman',150,34,249000.00,'https://canifa.com/img/500/750/resize/2/t/2ts24w003-sw001-thumb.webp',NULL,0),(83,'Áo phông dài tay bé trai in Avenger',150,34,249000.00,'https://canifa.com/img/500/750/resize/2/t/2tl24w008-sw001-128-1-u.webp',NULL,0),(84,'Áo phông dài tay bé trai in Avenger',150,34,249000.00,'https://canifa.com/img/500/750/resize/2/t/2tl24w008-sk010-thumb.webp',NULL,0),(85,'Áo phông dài tay bé trai in Avenger',150,34,249000.00,'https://canifa.com/img/500/750/resize/2/t/2tl24w008-sg313-128-1-u.webp',NULL,0),(86,'Áo phông dài tay bé trai in Avenger',150,34,249000.00,'https://canifa.com/img/500/750/resize/2/t/2tl24w008-sb148-thumb.webp',NULL,0),(87,'Áo body bé trai',150,34,159000.00,'https://canifa.com/img/500/750/resize/2/i/2it24w001-sa014-thumb.webp',NULL,0),(88,'Áo phông dài tay bé trai có hình in',150,34,299000.00,'https://canifa.com/img/500/750/resize/2/t/2tl24w013-se477-128-1-u.webp',NULL,0),(89,'Áo phông dài tay bé trai in hình Mickey & Friends',150,34,249000.00,'https://canifa.com/img/500/750/resize/2/t/2tl24w003-sb511-thumb.webp',NULL,0),(90,'Áo phông dài tay bé trai in hình Mickey & Friends',150,34,249000.00,'https://canifa.com/img/500/750/resize/2/t/2tl24w003-sw001-thumb.webp',NULL,0),(91,'Áo phông dài tay bé trai in hình Mickey & Friends',150,34,249000.00,'https://canifa.com/img/500/750/resize/2/t/2tl24w003-sk010-thumb.webp',NULL,0),(92,'Áo phông active bé trai có hình in',150,34,269000.00,'https://canifa.com/img/500/750/resize/2/t/2tl24w006-sw001-128-1-u.webp',NULL,0),(93,'Áo phông bé trai in hình Spiderman',150,34,249000.00,'https://canifa.com/img/500/750/resize/2/t/2ts24w003-sk010-thumb.webp',NULL,0),(94,'Áo phông dài tay bé trai in chữ',150,34,199000.00,'https://canifa.com/img/500/750/resize/2/t/2tl24w004-sa423-thumb.webp',NULL,0),(95,'Áo phông dài tay bé trai in chữ',150,34,199000.00,'https://canifa.com/img/500/750/resize/2/t/2tl24w004-sw142-thumb.webp',NULL,0),(96,'Áo phông dài tay bé trai in chữ',150,34,199000.00,'https://canifa.com/img/500/750/resize/2/t/2tl24w004-sr074-thumb.webp',NULL,0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `sale_id` int NOT NULL AUTO_INCREMENT,
  `product` int DEFAULT NULL,
  `discount` int DEFAULT NULL,
  PRIMARY KEY (`sale_id`),
  KEY `products_fk_3` (`product`),
  CONSTRAINT `products_fk_3` FOREIGN KEY (`product`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (1,25,42),(2,26,38),(3,27,36),(4,28,38),(5,29,32),(6,30,38),(7,31,42),(8,32,44),(9,33,44),(10,34,39),(11,35,31),(12,36,30),(13,37,49),(14,38,40),(15,39,46),(16,40,37),(17,41,39),(18,42,34),(19,43,45),(20,44,31),(21,45,30),(22,46,30),(23,47,49),(24,48,41),(25,1,30),(26,2,38),(27,3,31),(28,4,33),(29,5,41),(30,6,35),(31,7,44),(32,8,45),(33,9,42),(34,10,44),(35,11,44),(36,12,37),(37,13,43),(38,14,35),(39,15,38),(40,16,35),(41,17,50),(42,18,34),(43,19,30),(44,20,39),(45,21,34),(46,22,43),(47,23,45),(48,24,44),(49,73,33),(50,74,47),(51,75,44),(52,76,50),(53,77,46),(54,78,31),(55,79,50),(56,80,45),(57,81,42),(58,82,48),(59,83,43),(60,84,40),(61,85,42),(62,86,37),(63,87,33),(64,88,45),(65,89,31),(66,90,35),(67,91,30),(68,92,38),(69,93,30),(70,94,46),(71,95,48),(72,96,33),(73,49,30),(74,50,45),(75,51,40),(76,52,36),(77,53,31),(78,54,36),(79,55,40),(80,56,40),(81,57,31),(82,58,47),(83,59,47),(84,60,46),(85,61,38),(86,62,44),(87,63,33),(88,64,48),(89,65,46),(90,66,35),(91,67,49),(92,68,49),(93,69,49),(94,70,47),(95,71,39),(96,72,43);
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_info`
--

DROP TABLE IF EXISTS `shipping_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_info` (
  `shipping_id` int NOT NULL AUTO_INCREMENT,
  `shipping_status` enum('Pending','In Transit','Delivered','Failed') DEFAULT 'Pending',
  `shipping_cost` decimal(10,2) NOT NULL DEFAULT '0.00',
  `address_id` int DEFAULT NULL,
  PRIMARY KEY (`shipping_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `shipping_info_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_info`
--

LOCK TABLES `shipping_info` WRITE;
/*!40000 ALTER TABLE `shipping_info` DISABLE KEYS */;
INSERT INTO `shipping_info` VALUES (1,'Pending',50.00,NULL);
/*!40000 ALTER TABLE `shipping_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `view_history`
--

DROP TABLE IF EXISTS `view_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `view_history` (
  `view_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `product_id` int NOT NULL,
  `action` enum('viewed','purchased') NOT NULL,
  `action_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`view_id`),
  KEY `customer_id` (`customer_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `view_history_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  CONSTRAINT `view_history_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `view_history`
--

LOCK TABLES `view_history` WRITE;
/*!40000 ALTER TABLE `view_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `view_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'web_cusan'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-14 20:55:24

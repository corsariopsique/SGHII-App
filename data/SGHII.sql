-- MySQL Script generated by MySQL Workbench
-- Fri Oct 27 08:47:20 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema SGHII
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema SGHII
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `SGHII` DEFAULT CHARACTER SET utf8 ;
USE `SGHII` ;

-- -----------------------------------------------------
-- Table `SGHII`.`herramienta`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `SGHII`.`herramienta` (
  `idherramienta` VARCHAR(5) NOT NULL,
  `nombre` VARCHAR(25) NOT NULL,
  `categoria` VARCHAR(25) NOT NULL,
  `rol` VARCHAR(25) NOT NULL,
  `marca` VARCHAR(25) NOT NULL,    
  `fecha_in` DATE NOT NULL,
  `fecha_out` DATE,
  `cantidad` INT NOT NULL,
  `cantidad_disponible` INT,
  `cantidad_kits` INT,

  PRIMARY KEY (`idherramienta`))  
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SGHII`.`ImagenHerramienta`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `SGHII`.`imagen_herramienta` (
  `idherramienta` VARCHAR(5) NOT NULL,
  `image_name` VARCHAR(30) NOT NULL,
  `image` LONGBLOB,

  PRIMARY KEY (`idherramienta`),  
  INDEX `id_herramienta_img` (`idherramienta` ASC) VISIBLE,
  CONSTRAINT `id_herramienta_img`
    FOREIGN KEY (`idherramienta`)
    REFERENCES `SGHII`.`herramienta` (`idherramienta`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
    
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `SGHII`.`kit`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `SGHII`.`kit` (
  `idkit` VARCHAR(5) NOT NULL,
  `rol` VARCHAR(25) NOT NULL,
  `nombre` VARCHAR(25) NOT NULL,
  `fecha_in` DATE NOT NULL,
  `fecha_out` DATE,
  `disponible` BOOLEAN,
  
  PRIMARY KEY (`idkit`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SGHII`.`operario`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `SGHII`.`operario` (
  `id_worker` VARCHAR(15) NOT NULL,
  `nombre` VARCHAR(50) NOT NULL,
  `rol` VARCHAR(20) NOT NULL,
  `fecha_in` DATE NOT NULL,
  `fecha_out` DATE,
  PRIMARY KEY (`id_worker`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `SGHII`.`Imagen-Operario`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `SGHII`.`imagen_operario` (
  `id_operario` VARCHAR(15) NOT NULL,
  `image_name` VARCHAR(30) NOT NULL,
  `image` LONGBLOB,

  PRIMARY KEY (`id_operario`),  
  INDEX `id_operario_img` (`id_operario` ASC) VISIBLE,
  CONSTRAINT `id_operario_img`
    FOREIGN KEY (`id_operario`)
    REFERENCES `SGHII`.`operario` (`id_worker`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
    
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SGHII`.`Proveedor`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `SGHII`.`proveedor` (
  `id_prove` VARCHAR(5) NOT NULL,
  `nombre` VARCHAR(50) NOT NULL,
  `telefono` VARCHAR(12) NOT NULL,
  `ciudad` VARCHAR(15) NOT NULL,
  `fecha_in` DATE NOT NULL,
  `fecha_out` DATE,
  PRIMARY KEY (`id_prove`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SGHII`.`asignacion-devolucion`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `SGHII`.`asignacion_devolucion` (
  `id_operaciones` VARCHAR(5) NOT NULL,
  `id_trabajador` VARCHAR(15) NOT NULL,
  `tipo` INT NOT NULL,
  `fecha_operacion` DATE NOT NULL,
  PRIMARY KEY (`id_operaciones`),
  INDEX `id_worker_idx` (`id_trabajador` ASC) INVISIBLE,
  CONSTRAINT `id_worker`
    FOREIGN KEY (`id_trabajador`)
    REFERENCES `SGHII`.`operario` (`id_worker`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SGHII`.`asg_dev_tool`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `SGHII`.`asg_dev_tool` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_operacion_tool` VARCHAR(5) NOT NULL,
  `id_tool` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_herramienta_idx` (`id_operacion_tool` ASC) VISIBLE,
  CONSTRAINT `id_operacion_tool`
    FOREIGN KEY (`id_operacion_tool`)
    REFERENCES `SGHII`.`asignacion_devolucion` (`id_operaciones`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `id_herramienta`
    FOREIGN KEY (`id_tool`)
    REFERENCES `SGHII`.`herramienta` (`idherramienta`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SGHII`.`asg_dev_kit`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `SGHII`.`asg_dev_kit` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_operacion_kit` VARCHAR(5) NOT NULL,
  `id_kit` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_kit_idx` (`id_kit` ASC) VISIBLE,
  CONSTRAINT `id_operacion_kit`
    FOREIGN KEY (`id_operacion_kit`)
    REFERENCES `SGHII`.`asignacion_devolucion` (`id_operaciones`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `id_kit`
    FOREIGN KEY (`id_kit`)
    REFERENCES `SGHII`.`kit` (`idkit`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SGHII`.`tool-kit`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `SGHII`.`tool_Kit` (
  `id_reg` INT NOT NULL AUTO_INCREMENT,
  `id_tool` VARCHAR(5),
  `id_kit` VARCHAR(5) NOT NULL,  
  PRIMARY KEY (`id_reg`),
  INDEX `id-kit_idx` (`id_kit` ASC) VISIBLE,
  CONSTRAINT `id-tool`
    FOREIGN KEY (`id_tool`)
    REFERENCES `SGHII`.`herramienta` (`idherramienta`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `id-kit`
    FOREIGN KEY (`id_kit`)
    REFERENCES `SGHII`.`kit` (`idkit`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `SGHII`.`herramienta_proveedor`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTs `SGHII`.`herramienta_proveedor` (
    `id_prove` VARCHAR(5),
    `idherramienta` VARCHAR(5),   
    PRIMARY KEY (`id_prove`, `idherramienta`),
    CONSTRAINT `id_prove_join`      
      FOREIGN KEY (`id_prove`) 
      REFERENCES `SGHII`.`proveedor` (`id_prove`)
      ON DELETE RESTRICT
      ON UPDATE RESTRICT,
    CONSTRAINT `idherramienta`    
      FOREIGN KEY (`idherramienta`) 
      REFERENCES `SGHII`.`herramienta`(`idherramienta`)
      ON DELETE RESTRICT
      ON UPDATE RESTRICT)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla usuarios SGHII
-- -----------------------------------------------------

CREATE TABLE users (
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    enabled BOOLEAN NOT NULL,
    PRIMARY KEY (username))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla roles usuarios SGHII
-- -----------------------------------------------------

CREATE TABLE authorities (
    username VARCHAR(50) NOT NULL,
    authority VARCHAR(50) NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla auxiliar logs SGHII
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTs `SGHII`.`logs`(
  `log_id` INT AUTO_INCREMENT PRIMARY KEY,
  `log_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `log_event` VARCHAR(255),
  `log_message` TEXT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Trigger control kits-herramientas
-- -----------------------------------------------------

DELIMITER $$

CREATE TRIGGER control_kits 
  BEFORE INSERT ON tool_Kit
  FOR EACH ROW
  BEGIN
  
  DECLARE conteo_tool_kits INT;
  DECLARE tool_max INT;
  DECLARE conteo_herramienta INT;
  DECLARE conteo_asignaciones INT;
  DECLARE conteo_devoluciones INT;  
  DECLARE tool_no_disponibles INT;

  SELECT COUNT(*) INTO conteo_asignaciones
  FROM asignacion_devolucion p
  JOIN asg_dev_tool i ON p.id_operaciones = i.id_operacion_tool
  WHERE i.id_tool = NEW.id_tool AND p.tipo = 1;

  SELECT COUNT(*) INTO conteo_devoluciones
  FROM asignacion_devolucion p
  JOIN asg_dev_tool i ON p.id_operaciones = i.id_operacion_tool
  WHERE i.id_tool = NEW.id_tool AND p.tipo = 2;  

  SET conteo_herramienta = conteo_asignaciones - conteo_devoluciones;

  SELECT COUNT(*) INTO conteo_tool_kits
  FROM tool_Kit
  WHERE id_tool = NEW.id_tool;  

  SET tool_no_disponibles = conteo_tool_kits + conteo_herramienta;

  SELECT cantidad INTO tool_max
  FROM herramienta
  WHERE idherramienta = NEW.id_tool;

  IF tool_no_disponibles >= tool_max THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Cantidad maxima de herramientas alcanzada';
    END IF;

END $$


-- -----------------------------------------------------
-- Trigger control asignacion-herramientas
-- -----------------------------------------------------


DELIMITER $$

CREATE TRIGGER control_oper_tools
  BEFORE INSERT ON asg_dev_tool
  FOR EACH ROW
  BEGIN

  DECLARE conteo_herramienta INT;
  DECLARE conteo_asignaciones INT;
  DECLARE conteo_devoluciones INT;
  DECLARE herramientas_totales INT;
  DECLARE herramientas_kits INT;
  DECLARE herramientas_nodisponibles INT;
  DECLARE tipo_nueva_operacion INT;  

  SELECT COUNT(*) INTO conteo_asignaciones
  FROM asignacion_devolucion p
  JOIN asg_dev_tool i ON p.id_operaciones = i.id_operacion_tool
  WHERE i.id_tool = NEW.id_tool AND p.tipo = 1;  

  SELECT COUNT(*) INTO conteo_devoluciones
  FROM asignacion_devolucion p
  JOIN asg_dev_tool i ON p.id_operaciones = i.id_operacion_tool
  WHERE i.id_tool = NEW.id_tool AND p.tipo = 2;  

  SET conteo_herramienta = conteo_asignaciones - conteo_devoluciones;     

  SELECT tipo INTO tipo_nueva_operacion
  FROM asignacion_devolucion  
  WHERE id_operaciones = NEW.id_operacion_tool;  

  SELECT COUNT(*) INTO herramientas_kits
  FROM tool_Kit
  WHERE id_tool = NEW.id_tool;

  SELECT cantidad INTO herramientas_totales
  FROM herramienta
  WHERE idherramienta = NEW.id_tool;    

  SET herramientas_nodisponibles = herramientas_kits + conteo_herramienta;

  IF  (herramientas_nodisponibles >= herramientas_totales AND tipo_nueva_operacion = 1) THEN    
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Cantidad maxima de herramientas asignadas alcanzada';
  END IF;

  IF  (conteo_herramienta <= 0 AND tipo_nueva_operacion = 2) THEN    
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Cantidad maxima de herramientas devueltas alcanzada';
  END IF;  

END $$

-- -----------------------------------------------------
-- Trigger control asignacion-kits
-- -----------------------------------------------------


DELIMITER $$

CREATE TRIGGER control_oper_kits
  BEFORE INSERT ON asg_dev_kit
  FOR EACH ROW
  BEGIN

  DECLARE conteo_kit INT;
  DECLARE conteo_asignaciones INT;
  DECLARE conteo_devoluciones INT;  
  DECLARE tipo_nueva_operacion INT;  

  SELECT COUNT(*) INTO conteo_asignaciones
  FROM asignacion_devolucion p
  JOIN asg_dev_kit i ON p.id_operaciones = i.id_operacion_kit
  WHERE i.id_kit = NEW.id_kit AND p.tipo = 1;  

  SELECT COUNT(*) INTO conteo_devoluciones
  FROM asignacion_devolucion p
  JOIN asg_dev_kit i ON p.id_operaciones = i.id_operacion_kit
  WHERE i.id_kit = NEW.id_kit AND p.tipo = 2;  

  SET conteo_kit = conteo_asignaciones - conteo_devoluciones;     

  SELECT tipo INTO tipo_nueva_operacion
  FROM asignacion_devolucion  
  WHERE id_operaciones = NEW.id_operacion_kit;    

  IF  conteo_kit >= 1 AND tipo_nueva_operacion = 1 THEN    
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Kit no disponible para asignar';
  END IF;

  IF  (conteo_kit <= 0 AND tipo_nueva_operacion = 2) THEN    
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Este kit no se encuentra en estado de prestamo';
  END IF;  

END $$

---------------------------------------------------------------
--Trigger actualizar herramientas disponibles asignacion-tools
---------------------------------------------------------------

DELIMITER $$
CREATE TRIGGER `actualiza_disponibles` AFTER INSERT ON `asg_dev_tool` FOR EACH ROW BEGIN 
  CALL calcular_cant_disponible(NEW.id_tool);
END $$

--------------------------------------------------------------
--Trigger actualizar herramientas disponibles add tool kit
--------------------------------------------------------------

DELIMITER $$
CREATE TRIGGER `actualizar_herramientas_insercion` AFTER INSERT ON `tool_kit` FOR EACH ROW BEGIN 
  CALL calcular_cant_disponible(NEW.id_tool);
END $$

--------------------------------------------------------------
--Trigger actualizar herramientas disponibles delete tool kit
--------------------------------------------------------------

DELIMITER $$
CREATE TRIGGER `actualizar_herramientas_delete` AFTER DELETE ON `tool_kit` FOR EACH ROW BEGIN 
  CALL calcular_cant_disponible(OLD.id_tool);
END $$

----------------------------------------------------------
--Trigger actualizar kit disponibles add asg_dev_kit
----------------------------------------------------------

DELIMITER $$
CREATE TRIGGER `actualiza_kit_disponibles` AFTER INSERT ON `asg_dev_kit` FOR EACH ROW BEGIN 
  CALL kit_disponible(NEW.id_kit);
END $$

--------------------------------------------------------------------------------------------------------------------
---------------Procedimientos---------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------
----calcular cantidad disponible--------------------
-------------------------------------------------------------------------

DELIMITER $$
CREATE PROCEDURE sghii.calcular_cant_disponible(IN id_tool VARCHAR(5))

  BEGIN
    
    DECLARE tool_prestadas INT;
    DECLARE tool_devueltas INT;
    DECLARE tool_kits INT;
    DECLARE tool_totales INT;
    DECLARE tool_disponibles INT;
    DECLARE tool_conteo INT;

    SELECT COUNT(*) INTO tool_prestadas
      FROM asignacion_devolucion p
      JOIN asg_dev_tool i ON p.id_operaciones = i.id_operacion_tool
      WHERE i.id_tool = id_tool AND p.tipo = 1;  
    
    SELECT COUNT(*) INTO tool_devueltas
      FROM asignacion_devolucion p
      JOIN asg_dev_tool i ON p.id_operaciones = i.id_operacion_tool
      WHERE i.id_tool = id_tool AND p.tipo = 2;  

    SET tool_conteo = tool_prestadas - tool_devueltas;

    SELECT COUNT(*) INTO tool_kits
      FROM tool_Kit tk
      WHERE tk.id_tool = id_tool;

    SELECT cantidad INTO tool_totales
      FROM herramienta
      WHERE idherramienta = id_tool;    

    SET tool_disponibles = tool_totales - tool_conteo - tool_kits;
    
    UPDATE herramienta 
      SET cantidad_disponible = tool_disponibles      
      WHERE idherramienta = id_tool;

    UPDATE herramienta      
      SET cantidad_kits = tool_kits
      WHERE idherramienta = id_tool;
END $$

-------------------------------------------------------------------------
----calcular kit disponible--------------------
-------------------------------------------------------------------------

DELIMITER $$
CREATE PROCEDURE sghii.kit_disponible(IN id_kit VARCHAR(5))

  BEGIN
    
    DECLARE kit_prestadas INT;
    DECLARE kit_devueltas INT;    
    DECLARE kit_conteo INT;

    SELECT COUNT(*) INTO kit_prestadas
      FROM asignacion_devolucion p
      JOIN asg_dev_kit i ON p.id_operaciones = i.id_operacion_kit
      WHERE i.id_kit = id_kit AND p.tipo = 1;  
    
    SELECT COUNT(*) INTO kit_devueltas
      FROM asignacion_devolucion p
      JOIN asg_dev_kit i ON p.id_operaciones = i.id_operacion_kit
      WHERE i.id_kit = id_kit AND p.tipo = 2;  

    SET kit_conteo = kit_prestadas - kit_devueltas;

    UPDATE kit 
      SET disponible = kit_conteo        
      WHERE idkit = id_kit;          
END $$

USE `SGHII` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
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
  `estado` BOOLEAN DEFAULT FALSE,

  PRIMARY KEY (`idherramienta`))  
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SGHII`.`itemherramienta`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `SGHII`.`itemherramienta` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `idherramienta` VARCHAR(5) NOT NULL,    
  `fecha_in` DATE NOT NULL,
  `fecha_out` DATE,  
  `estado` BOOLEAN DEFAULT FALSE,

  PRIMARY KEY (`id`),
  INDEX `id_herramienta_item` (`idherramienta` ASC) VISIBLE,
  CONSTRAINT `id_herramienta_item`
    FOREIGN KEY (`idherramienta`)
    REFERENCES `SGHII`.`herramienta` (`idherramienta`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)  
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
  `estado` BOOLEAN DEFAULT FALSE,
  
  PRIMARY KEY (`idkit`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SGHII`.`operario`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `SGHII`.`operario` (
  `id_worker` VARCHAR(15) NOT NULL,
  `nombre` VARCHAR(50) NOT NULL,
  `rol` VARCHAR(20) NOT NULL,
  `telefono` VARCHAR(15) NOT NULL,
  `email` VARCHAR(50),
  `fecha_in` DATE NOT NULL,
  `fecha_out` DATE,
  `estado` BOOLEAN DEFAULT FALSE,

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
  `estado` BOOLEAN DEFAULT FALSE,

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
  `id_tool` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_herramienta_idx` (`id_operacion_tool` ASC) VISIBLE,
  CONSTRAINT `id_operacion_tool`
    FOREIGN KEY (`id_operacion_tool`)
    REFERENCES `SGHII`.`asignacion_devolucion` (`id_operaciones`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `id_itemherramienta`
    FOREIGN KEY (`id_tool`)
    REFERENCES `SGHII`.`itemherramienta` (`id`)
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
  `id_tool` INT,
  `id_kit` VARCHAR(5) NOT NULL,  
  PRIMARY KEY (`id_reg`),
  INDEX `id-kit_idx` (`id_kit` ASC) VISIBLE,
  CONSTRAINT `id-tool`
    FOREIGN KEY (`id_tool`)
    REFERENCES `SGHII`.`itemherramienta` (`id`)
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

--    CREATE TABLE users (
  --      username VARCHAR(50) NOT NULL UNIQUE,
    --    password VARCHAR(100) NOT NULL,
      --  enabled BOOLEAN NOT NULL,
      --  PRIMARY KEY (username))
    --    ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla roles usuarios SGHII
-- -----------------------------------------------------

--    CREATE TABLE authorities (
  --    username VARCHAR(50) NOT NULL,
    --  authority VARCHAR(50) NOT NULL,
      -- FOREIGN KEY (username) REFERENCES users(username))
    -- ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla auxiliar logs SGHII
-- -----------------------------------------------------

--      CREATE TABLE IF NOT EXISTs `SGHII`.`logs`(
  --      `log_id` INT AUTO_INCREMENT PRIMARY KEY,
    --    `log_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      --  `log_event` VARCHAR(255),
      --  `log_message` TEXT)
      -- ENGINE = InnoDB;

-- -----------------------------------------------------
-- Trigger control kits-herramientas
-- -----------------------------------------------------

DELIMITER $$

CREATE TRIGGER control_kits 
  BEFORE INSERT ON tool_Kit
  FOR EACH ROW
  BEGIN
  
  DECLARE conteo_tool_kits INT;  
  DECLARE conteo_herramienta INT;
  DECLARE conteo_asignaciones INT;
  DECLARE conteo_devoluciones INT;   

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
 
 if ((conteo_herramienta = 0) AND (conteo_tool_kits = 0)) then
 
	update itemherramienta
		set estado = 1
		where id = new.id_tool;
	
end if;

  IF ((conteo_herramienta = 1) or (conteo_tool_kits = 1)) THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Esta herramienta no esta disponible';
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
  DECLARE herramientas_kits INT;  
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


  IF  ((herramientas_kits = 1 or conteo_herramienta = 1) and (tipo_nueva_operacion = 1)) THEN    
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'La herramienta no esta disponible';
  END IF;

  IF  ((conteo_herramienta = 0 and herramientas_kits = 1) AND (tipo_nueva_operacion = 2)) THEN    
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'La herramienta no esta en prestamo';
  END IF;  
 
 IF  ((conteo_herramienta = 0 and herramientas_kits = 0) AND (tipo_nueva_operacion = 2)) THEN    
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'La herramienta ya esta en inventario';
  END IF; 

END $$


-- -----------------------------------------------------
-- Trigger control marcadores-herramientas
-- -----------------------------------------------------

DELIMITER $$

CREATE TRIGGER control_mark_tools
  AFTER INSERT ON asg_dev_tool
  FOR EACH ROW
  BEGIN
  
  DECLARE tipo_nueva_operacion INT;
  
  SELECT tipo INTO tipo_nueva_operacion
  FROM asignacion_devolucion  
  WHERE id_operaciones = NEW.id_operacion_tool;  
 
 if (tipo_nueva_operacion = 1) then
 
 	update itemherramienta
 		set estado = 1
 		where id = new.id_tool;
 	
 end if;

if (tipo_nueva_operacion = 2) then

	update itemherramienta
		set estado = 0
		where id = new.id_tool;
	
end if;  

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

  IF ((conteo_kit >= 1) AND (tipo_nueva_operacion = 1)) THEN    
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Kit no disponible para asignar';
  END IF;

  IF  ((conteo_kit <= 0) AND (tipo_nueva_operacion = 2)) THEN    
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Este kit no se encuentra en estado de prestamo';
  END IF;  

END $$


---------------------------------------------------------------
-- Trigger insertar items herramientas itemherramienta newtool
---------------------------------------------------------------

DELIMITER $$

CREATE TRIGGER reg_items_new_tool
AFTER INSERT ON herramienta
FOR EACH ROW
BEGIN
    DECLARE i INT DEFAULT 1;   
    
    WHILE i <= NEW.cantidad DO
        INSERT INTO itemherramienta (idherramienta,fecha_in,estado) VALUES (NEW.idherramienta, CURDATE(),0);
        SET i = i + 1;
    END WHILE;
   
END $$


---------------------------------------------------------------
-- Trigger actualizar herramientas disponibles asignacion-tools
---------------------------------------------------------------

DELIMITER $$
CREATE TRIGGER `actualiza_disponibles` AFTER INSERT ON `asg_dev_tool` FOR EACH ROW BEGIN 
  CALL calcular_cant_disponible(NEW.id_tool);
END $$

--------------------------------------------------------------
-- Trigger actualizar herramientas disponibles add tool kit
--------------------------------------------------------------

DELIMITER $$
CREATE TRIGGER `actualizar_herramientas_insercion` AFTER INSERT ON `tool_kit` FOR EACH ROW BEGIN 
  CALL calcular_cant_disponible(NEW.id_tool);
END $$

--------------------------------------------------------------
-- Trigger actualizar herramientas disponibles delete tool kit
--------------------------------------------------------------

DELIMITER $$
CREATE TRIGGER `actualizar_herramientas_delete` AFTER DELETE ON `tool_kit` FOR EACH ROW BEGIN 
  CALL calcular_cant_disponible(OLD.id_tool);
END $$

----------------------------------------------------------
-- Trigger actualizar kit disponibles add asg_dev_kit
----------------------------------------------------------

DELIMITER $$
CREATE TRIGGER `actualiza_kit_disponibles` AFTER INSERT ON `asg_dev_kit` FOR EACH ROW BEGIN 
  CALL kit_disponible(NEW.id_kit);
END $$

--------------------------------------------------------------------------------------------------------------------
--------------- Procedimientos--------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------
---- calcular cantidad disponible--------------------
-------------------------------------------------------------------------

DELIMITER $$
CREATE PROCEDURE sghii.calcular_cant_disponible(IN id_tool INT)

  BEGIN
    
    DECLARE tool_prestadas INT;
    DECLARE tool_devueltas INT;
    DECLARE tool_kits INT;
    DECLARE tool_totales INT;
    DECLARE tool_disponibles INT;
    DECLARE tool_conteo INT;
    declare tool_caso_salir_kit INT;
   	declare tool_id VARCHAR(5);
   
   	select idherramienta into tool_id from itemherramienta where id = id_tool; 

    SELECT COUNT(*) INTO tool_prestadas
      FROM asignacion_devolucion p
      inner JOIN asg_dev_tool i ON p.id_operaciones = i.id_operacion_tool
      inner join itemherramienta ih on ih.id = i.id_tool
      WHERE ih.idherramienta = tool_id AND p.tipo = 1;  
    
    SELECT COUNT(*) INTO tool_devueltas
      FROM asignacion_devolucion p
      inner JOIN asg_dev_tool i ON p.id_operaciones = i.id_operacion_tool
      inner join itemherramienta ih on ih.id = i.id_tool
      WHERE ih.idherramienta = tool_id AND p.tipo = 2;  

    SET tool_conteo = tool_prestadas - tool_devueltas;

    SELECT COUNT(*) INTO tool_kits
      FROM tool_Kit tk
      join itemherramienta ih on ih.id = tk.id_tool
      WHERE ih.idherramienta = tool_id;

    SELECT cantidad INTO tool_totales
      FROM herramienta
      WHERE idherramienta = tool_id;    

    SET tool_disponibles = tool_totales - tool_conteo - tool_kits;
   
    SELECT COUNT(*) INTO tool_caso_salir_kit
  		FROM tool_Kit tk
  		WHERE tk.id_tool = id_tool;
  	
  	if (tool_caso_salir_kit = 0) then
  		
  		update itemherramienta
  			set estado = 0
  			where id = id_tool;
	end if;
   	  
    
    UPDATE herramienta 
      SET cantidad_disponible = tool_disponibles      
      WHERE idherramienta = tool_id;

    UPDATE herramienta      
      SET cantidad_kits = tool_kits
      WHERE idherramienta = tool_id;
END $$

-------------------------------------------------------------------------
---- calcular kit disponible--------------------
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
	 
	 

USE `SGHII`;







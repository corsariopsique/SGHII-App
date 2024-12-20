-- -----------------------------------------------------
-- Schema SGHII
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Table "SGHII"."herramienta"
-- -----------------------------------------------------
CREATE TABLE "herramienta"  (
  "idherramienta" VARCHAR(5) NOT NULL,
  "nombre" VARCHAR(25) NOT NULL,
  "categoria" VARCHAR(25) NOT NULL,
  "rol" VARCHAR(25) NOT NULL,
  "marca" VARCHAR(25) NOT NULL,    
  "fecha_in" DATE NOT NULL,
  "fecha_out" DATE,
  "cantidad" INTEGER NOT NULL,
  "cantidad_disponible" INTEGER,
  "cantidad_kits" INTEGER,
  "estado" BOOLEAN DEFAULT false,
  PRIMARY key("idherramienta"))     
;
-- -----------------------------------------------------
-- Table "SGHII"."itemherramienta"
-- -----------------------------------------------------
CREATE TABLE "itemherramienta" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY,
  "idherramienta" VARCHAR(5) NOT NULL,    
  "fecha_in" DATE NOT NULL,
  "fecha_out" DATE,  
  "estado" INTEGER DEFAULT 0,  
  primary KEY("id"),
  CONSTRAINT fk_idherramienta_item
    FOREIGN KEY ("idherramienta")
    REFERENCES "herramienta" ("idherramienta")
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)  
;
create index id_herramienta_item on itemherramienta (idherramienta ASC);
-- -----------------------------------------------------
-- Table "SGHII"."ImagenHerramienta"
-- -----------------------------------------------------
CREATE TABLE "imagen_herramienta" (
  "idherramienta" VARCHAR(5) NOT NULL,
  "image_name" VARCHAR(255) NOT NULL,
  "image" BYTEA,  
  primary key("idherramienta"),
  CONSTRAINT fk_idherramienta_img
    FOREIGN KEY ("idherramienta")
    REFERENCES "herramienta" ("idherramienta")
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
;
create index id_herramienta_img on imagen_herramienta (idherramienta ASC);
-- -----------------------------------------------------
-- Table "SGHII"."kit"
-- -----------------------------------------------------
CREATE TABLE "kit" (
  "idkit" VARCHAR(5) NOT NULL,
  "rol" VARCHAR(25) NOT NULL,
  "nombre" VARCHAR(25) NOT NULL,
  "fecha_in" DATE NOT NULL,
  "fecha_out" DATE,
  "disponible" INTEGER,
  "estado" BOOLEAN DEFAULT false,
  primary key("idkit"))  
;
-- -----------------------------------------------------
-- Table "SGHII"."operario"
-- -----------------------------------------------------
CREATE TABLE "operario" (
  "id_worker" VARCHAR(15) NOT NULL,
  "nombre" VARCHAR(50) NOT NULL,
  "rol" VARCHAR(20) NOT NULL,
  "telefono" VARCHAR(15) NOT NULL,
  "email" VARCHAR(50),
  "fecha_in" DATE NOT NULL,
  "fecha_out" DATE,
  "estado" BOOLEAN DEFAULT false,
  primary key("id_worker"))
;
-- -----------------------------------------------------
-- Table "SGHII"."Imagen-Operario"
-- -----------------------------------------------------
CREATE TABLE "imagen_operario" (
  "id_operario" VARCHAR(15) NOT NULL,
  "image_name" VARCHAR(255) NOT NULL,
  "image" BYTEA,  
  primary key("id_operario"),
  CONSTRAINT fk_id_operario_img
    FOREIGN KEY ("id_operario")
    REFERENCES "operario" ("id_worker")
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
;
create index id_operario_img on imagen_operario (id_operario ASC);
-- -----------------------------------------------------
-- Table "SGHII"."Proveedor"
-- -----------------------------------------------------
CREATE TABLE "proveedor" (
  "id_prove" VARCHAR(5) NOT NULL,
  "nombre" VARCHAR(50) NOT NULL,
  "telefono" VARCHAR(12) NOT NULL,
  "ciudad" VARCHAR(15) NOT NULL,
  "fecha_in" DATE NOT NULL,
  "fecha_out" DATE,
  "estado" BOOLEAN DEFAULT false,
  primary key("id_prove"))
;
-- -----------------------------------------------------
-- Table "SGHII"."asignacion-devolucion"
-- -----------------------------------------------------
CREATE TABLE "asignacion_devolucion" (
  "id_operaciones" VARCHAR(5) NOT NULL,
  "id_trabajador" VARCHAR(15) NOT NULL,
  "tipo" INTEGER NOT NULL,
  "fecha_operacion" DATE NOT NULL,
  primary key("id_operaciones"),
  CONSTRAINT fk_id_worker
    FOREIGN KEY ("id_trabajador")
    REFERENCES "operario" ("id_worker")
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
;
create index id_worker_idx on asignacion_devolucion (id_trabajador ASC);
-- -----------------------------------------------------
-- Table "SGHII"."asg_dev_tool"
-- -----------------------------------------------------
CREATE TABLE "asg_dev_tool" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY,
  "id_operacion_tool" VARCHAR(5) NOT NULL,
  "id_tool" INTEGER NOT NULL,  
  primary KEY("id"),
  CONSTRAINT fk_id_operacion_tool
    FOREIGN KEY ("id_operacion_tool")
    REFERENCES "asignacion_devolucion" ("id_operaciones"),
  CONSTRAINT fk_id_itemherramienta
    FOREIGN KEY ("id_tool")
    REFERENCES "itemherramienta" ("id")
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
;
create index id_herramienta_idx on asg_dev_tool (id_operacion_tool ASC);
-- -----------------------------------------------------
-- Table "SGHII"."asg_dev_kit"
-- -----------------------------------------------------
CREATE TABLE "asg_dev_kit" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY,
  "id_operacion_kit" VARCHAR(5) NOT NULL,
  "id_kit" VARCHAR(5) NOT NULL,  
  primary key("id"),
  CONSTRAINT fk_id_operacion_kit
    FOREIGN KEY ("id_operacion_kit")
    REFERENCES "asignacion_devolucion" ("id_operaciones"),
  CONSTRAINT fk_id_kit
    FOREIGN KEY ("id_kit")
    REFERENCES "kit" ("idkit")
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
;
create index id_kit_idx_asg on asg_dev_kit (id_kit ASC);
-- -----------------------------------------------------
-- Table "SGHII"."tool-kit"
-- -----------------------------------------------------
CREATE TABLE "tool_kit" (
  "id_reg" INTEGER GENERATED ALWAYS AS IDENTITY,
  "id_tool" INTEGER,
  "id_kit" VARCHAR(5) NOT NULL,  
  primary key("id_reg"),
  CONSTRAINT fk_id_tool_KIT
    FOREIGN KEY ("id_tool")
    REFERENCES "itemherramienta" ("id"),
  CONSTRAINT fk_id_kit_KIT
    FOREIGN KEY ("id_kit")
    REFERENCES "kit" ("idkit")
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
;
create index id_kit_idx on tool_kit (id_kit ASC);
-- -----------------------------------------------------
-- Table "SGHII"."herramienta_proveedor"
-- -----------------------------------------------------
CREATE TABLE "herramienta_proveedor" (
    "id_prove" VARCHAR(5),
    "idherramienta" VARCHAR(5),   
    PRIMARY KEY ("id_prove", "idherramienta"),
    CONSTRAINT fk_id_prove_join      
      FOREIGN KEY ("id_prove") 
      REFERENCES "proveedor" ("id_prove"),
    CONSTRAINT "fk_idherramienta"    
      FOREIGN KEY ("idherramienta") 
      REFERENCES "herramienta"("idherramienta")
      ON DELETE RESTRICT
      ON UPDATE RESTRICT)
;
-- -----------------------------------------------------
-- Tabla usuarios SGHII
-- -----------------------------------------------------
--    CREATE TABLE users (
  --      username VARCHAR(50) NOT NULL UNIQUE,
    --    password VARCHAR(100) NOT NULL,
      --  enabled BOOLEAN NOT NULL,
      --  PRIMARY KEY (username))
    --    ;
-- -----------------------------------------------------
-- Tabla roles usuarios SGHII
-- -----------------------------------------------------
--    CREATE TABLE authorities (
  --    username VARCHAR(50) NOT NULL,
    --  authority VARCHAR(50) NOT NULL,
      -- FOREIGN KEY (username) REFERENCES users(username))
    -- ;
-- -----------------------------------------------------
-- Tabla auxiliar logs SGHII
-- -----------------------------------------------------
--      CREATE TABLE "SGHII"."logs"(
  --      "log_id" INT SERIAL PRIMARY KEY,
    --    "log_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      --  "log_event" VARCHAR(255),
      --  "log_message" TEXT)
      -- ;
-- -----------------------------------------------------
-- Trigger control kits-herramientas
-- -----------------------------------------------------
CREATE or replace function control_kits_function()
returns trigger as $$  

DECLARE 
	conteo_tool_kits INTeger;  
  	conteo_herramienta INTeger;
  	conteo_asignaciones INTeger;
  	conteo_devoluciones INTeger;

BEGIN
   
  SELECT COUNT(*) INTO conteo_asignaciones
  FROM asignacion_devolucion p
  JOIN asg_dev_tool i ON p.id_operaciones = i.id_operacion_tool
  WHERE i.id_tool = NEW.id_tool AND p.tipo = 1;

  SELECT COUNT(*) INTO conteo_devoluciones
  FROM asignacion_devolucion p
  JOIN asg_dev_tool i ON p.id_operaciones = i.id_operacion_tool
  WHERE i.id_tool = NEW.id_tool AND p.tipo = 2;  

  conteo_herramienta := conteo_asignaciones - conteo_devoluciones;

  SELECT COUNT(*) INTO conteo_tool_kits
  FROM tool_kit
  WHERE id_tool = NEW.id_tool;  

  if ((conteo_herramienta = 0) AND (conteo_tool_kits = 0)) then
	update itemherramienta
		Set estado = 1
		where id = new.id_tool;
  end if;

  IF ((conteo_herramienta = 1) or (conteo_tool_kits = 1)) THEN
  	RAISE EXCEPTION 'Esta herramienta no esta disponible';
  END IF;

  RETURN NEW;

END;

$$ language plpgsql;

create trigger control_kits
BEFORE INSERT ON tool_kit
FOR EACH row
execute function control_kits_function();


-- -----------------------------------------------------
-- Trigger control asignacion-herramientas
-- -----------------------------------------------------
CREATE or replace function control_oper_tools_function()
returns trigger as $$
  
DECLARE 
	conteo_herramienta INTeger;
  	conteo_asignaciones INTeger;
  	conteo_devoluciones INTeger;
  	herramientas_kits INTeger;  
  	tipo_nueva_operacion INTeger;

begin
	
	SELECT COUNT(*) INTO conteo_asignaciones
	FROM asignacion_devolucion p
	JOIN asg_dev_tool i ON p.id_operaciones = i.id_operacion_tool
	WHERE i.id_tool = NEW.id_tool AND p.tipo = 1;

	SELECT COUNT(*) INTO conteo_devoluciones
	FROM asignacion_devolucion p
	JOIN asg_dev_tool i ON p.id_operaciones = i.id_operacion_tool
	WHERE i.id_tool = NEW.id_tool AND p.tipo = 2;

	conteo_herramienta := conteo_asignaciones - conteo_devoluciones;

	SELECT tipo INTO tipo_nueva_operacion
	FROM asignacion_devolucion
	WHERE id_operaciones = NEW.id_operacion_tool;

  	SELECT COUNT(*) INTO herramientas_kits
  	FROM tool_kit
  	WHERE id_tool = NEW.id_tool;
  
  	IF  ((herramientas_kits = 1 or conteo_herramienta = 1) and (tipo_nueva_operacion = 1)) then
  		raise exception 'La herramienta no esta disponible';
  	END IF;
  
  	IF  ((conteo_herramienta = 0 and herramientas_kits = 1) AND (tipo_nueva_operacion = 2)) then
  		raise exception 'La herramienta no esta en prestamo';
  	END IF;
  
  	IF  ((conteo_herramienta = 0 and herramientas_kits = 0) AND (tipo_nueva_operacion = 2)) then
  		raise exception 'La herramienta ya esta en inventario';
  	END IF;
  
  	return new;
  
end;

$$ LANGUAGE plpgsql;

create trigger control_oper_tools
BEFORE INSERT ON asg_dev_tool
FOR EACH ROW
execute function control_oper_tools_function();

-- -----------------------------------------------------
-- Trigger control marcadores-herramientas
-- -----------------------------------------------------
CREATE or replace function control_mark_tools_function()
returns  trigger as $$

DECLARE 
	tipo_nueva_operacion INTeger;

begin

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

	return new;

end;

$$ language plpgsql;
  
create trigger control_mark_tools
AFTER INSERT ON asg_dev_tool
FOR EACH row
execute function control_mark_tools_function();

-- -----------------------------------------------------
-- Trigger control asignacion-kits
-- -----------------------------------------------------
CREATE OR REPLACE FUNCTION control_oper_kits_function()
RETURNS TRIGGER AS $$

DECLARE
    conteo_kit INTEGER;
    conteo_asignaciones INTEGER;
    conteo_devoluciones INTEGER;  
    tipo_nueva_operacion INTEGER;

BEGIN
    
    SELECT COUNT(*) INTO conteo_asignaciones
    FROM asignacion_devolucion p
    JOIN asg_dev_kit i ON p.id_operaciones = i.id_operacion_kit
    WHERE i.id_kit = NEW.id_kit AND p.tipo = 1;

    
    SELECT COUNT(*) INTO conteo_devoluciones
    FROM asignacion_devolucion p
    JOIN asg_dev_kit i ON p.id_operaciones = i.id_operacion_kit
    WHERE i.id_kit = NEW.id_kit AND p.tipo = 2;

    
    conteo_kit := conteo_asignaciones - conteo_devoluciones;

    
    SELECT tipo INTO tipo_nueva_operacion
    FROM asignacion_devolucion
    WHERE id_operaciones = NEW.id_operacion_kit;

    
    IF (conteo_kit >= 1 AND tipo_nueva_operacion = 1) THEN
        RAISE EXCEPTION 'Kit no disponible para asignar';
    END IF;

    
    IF (conteo_kit <= 0 AND tipo_nueva_operacion = 2) THEN
        RAISE EXCEPTION 'Este kit no se encuentra en estado de préstamo';
    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER control_oper_kits
BEFORE INSERT ON asg_dev_kit
FOR EACH ROW
EXECUTE FUNCTION control_oper_kits_function();

---------------------------------------------------------------
-- Trigger insertar items herramientas itemherramienta newtool
---------------------------------------------------------------
CREATE or replace function reg_items_new_tool_function()
returns trigger as $$

DECLARE 
	i INTeger DEFAULT 1;

begin

	WHILE i <= NEW.cantidad LOOP
		INSERT INTO itemherramienta (idherramienta,fecha_in,estado) VALUES (NEW.idherramienta, CURRENT_DATE,0);
		i := i + 1;
		END LOOP;

	return new;

END;

$$ language plpgsql;

create trigger reg_items_new_tool
AFTER INSERT ON herramienta
FOR EACH row
execute function reg_items_new_tool_function();

--------------------------------------------------------------------------------------------------------------------
--------------- Procedimientos--------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------
---- calcular cantidad disponible--------------------
-------------------------------------------------------------------------
CREATE or replace function calcular_cant_disponible_function()
returns trigger as $$

DECLARE
	tool_prestadas INTeger;
	tool_devueltas INTeger;
	tool_kits INTeger;
	tool_totales INTeger;
	tool_disponibles INTeger;
	tool_conteo INTeger;
	tool_caso_salir_kit INTeger;
	tool_id VARCHAR(5);
	id_item INTEGER;

begin

	IF TG_OP = 'INSERT' THEN
        id_item := NEW.id_tool;
    ELSIF TG_OP = 'DELETE' THEN
        id_item := OLD.id_tool;
    ELSE        
        RAISE EXCEPTION 'Operación no soportada: %', TG_OP;
    END IF;

	select idherramienta into tool_id from itemherramienta where id = id_item;

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

	tool_conteo := tool_prestadas - tool_devueltas;

	SELECT COUNT(*) INTO tool_kits
	FROM tool_kit tk
	join itemherramienta ih on ih.id = tk.id_tool
	WHERE ih.idherramienta = tool_id;

	SELECT cantidad INTO tool_totales
	FROM herramienta
	WHERE idherramienta = tool_id;

	tool_disponibles := tool_totales - tool_conteo - tool_kits;

	SELECT COUNT(*) INTO tool_caso_salir_kit
	FROM tool_kit tk
	WHERE tk.id_tool = id_item;

	if (tool_caso_salir_kit = 0) then
		update itemherramienta
		SET estado = 0
		where id = id_item;
	end if;

	UPDATE herramienta
		set cantidad_disponible = tool_disponibles
		WHERE idherramienta = tool_id;

	UPDATE herramienta
		SET cantidad_kits = tool_kits
		WHERE idherramienta = tool_id;

	return new;

END;
$$ language plpgsql;

-------------------------------------------------------------------------
---- calcular kit disponible--------------------
-------------------------------------------------------------------------
CREATE or replace function  kit_disponible_function()
returns trigger as $$

DECLARE 
	kit_prestadas INTEGER;
	kit_devueltas INTEGER;
	kit_conteo INTEGER;
	id_kit_r VARCHAR(5);

begin

	id_kit_r := NEW.id_kit;

	SELECT COUNT(*) INTO kit_prestadas
	FROM asignacion_devolucion p
	JOIN asg_dev_kit i ON p.id_operaciones = i.id_operacion_kit
	WHERE i.id_kit = id_kit AND p.tipo = 1;

	SELECT COUNT(*) INTO kit_devueltas
	FROM asignacion_devolucion p
	JOIN asg_dev_kit i ON p.id_operaciones = i.id_operacion_kit
	WHERE i.id_kit = id_kit AND p.tipo = 2;

	kit_conteo := kit_prestadas - kit_devueltas;

	UPDATE kit
		SET disponible = kit_conteo
		WHERE idkit = id_kit_r;

	return new;

end;
$$ language plpgsql;

---------------------------------------------------------------
-- Trigger actualizar herramientas disponibles asignacion-tools
---------------------------------------------------------------
CREATE TRIGGER actualiza_disponibles
AFTER INSERT ON "asg_dev_tool" 
FOR EACH ROW
execute function calcular_cant_disponible_function();
  
--------------------------------------------------------------
-- Trigger actualizar herramientas disponibles add tool kit
--------------------------------------------------------------
CREATE TRIGGER actualizar_herramientas_insercion 
AFTER INSERT ON "tool_kit" 
FOR EACH ROW 
execute function calcular_cant_disponible_function();

--------------------------------------------------------------
-- Trigger actualizar herramientas disponibles delete tool kit
--------------------------------------------------------------
CREATE TRIGGER actualizar_herramientas_delete 
AFTER DELETE ON "tool_kit" 
FOR EACH ROW
execute function calcular_cant_disponible_function();

----------------------------------------------------------
-- Trigger actualizar kit disponibles add asg_dev_kit
----------------------------------------------------------
CREATE TRIGGER actualiza_kit_disponibles 
AFTER INSERT ON "asg_dev_kit" 
FOR EACH ROW 
execute function kit_disponible_function();


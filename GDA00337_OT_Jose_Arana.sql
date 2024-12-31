
IF DB_ID('GDA00337_OT_Jose_Arana') IS NOT NULL DROP DATABASE GDA00337_OT_Jose_Arana;
CREATE DATABASE GDA00337_OT_Jose_Arana;
USE GDA00337_OT_Jose_Arana;

IF OBJECT_ID('productos', 'U') IS NOT NULL
BEGIN
    ALTER TABLE productos DROP CONSTRAINT IF EXISTS FK_productos_id_usuarios;
    ALTER TABLE productos DROP CONSTRAINT IF EXISTS FK_productos_id_estados;
    ALTER TABLE productos DROP CONSTRAINT IF EXISTS FK_productos_id_categorias;
    DROP TABLE productos;
END

IF OBJECT_ID('usuarios', 'U') IS NOT NULL
BEGIN
    ALTER TABLE usuarios DROP CONSTRAINT IF EXISTS FK_usuarios_id_clientes;
    ALTER TABLE usuarios DROP CONSTRAINT IF EXISTS FK_usuarios_id_rol;
    ALTER TABLE usuarios DROP CONSTRAINT IF EXISTS FK_usuarios_id_estados;
    DROP TABLE usuarios;
END

IF OBJECT_ID('categoria_productos', 'U') IS NOT NULL
BEGIN
    ALTER TABLE categoria_productos DROP CONSTRAINT IF EXISTS FK_categoria_productos_id_estados;
    ALTER TABLE categoria_productos DROP CONSTRAINT IF EXISTS FK_categoria_productos_id_usuario;
    DROP TABLE categoria_productos;
END

IF OBJECT_ID('estados', 'U') IS NOT NULL DROP TABLE estados;
IF OBJECT_ID('rol', 'U') IS NOT NULL DROP TABLE rol;
IF OBJECT_ID('orden_detalles', 'U') IS NOT NULL DROP TABLE orden_detalles;
IF OBJECT_ID('orden', 'U') IS NOT NULL DROP TABLE orden;
IF OBJECT_ID('clientes', 'U') IS NOT NULL DROP TABLE clientes;
IF OBJECT_ID('estados_orden', 'U') IS NOT NULL DROP TABLE estados_orden;

-- Crear tablas
CREATE TABLE [productos] (
    [id] int PRIMARY KEY IDENTITY(1, 1),
    [id_categorias] int,
    [id_usuarios] int,
    [nombre] varchar(45) NOT NULL,
    [marca] varchar(45) NOT NULL,
    [codigo] varchar(45) NOT NULL,
    [id_estados] int,
    [precio] float NOT NULL,
    [fecha_creacion] date DEFAULT (GETDATE()),
	[stock] INT NOT NULL DEFAULT 0,
    [foto] binary
);



CREATE TABLE [usuarios] (
    [id] int PRIMARY KEY IDENTITY(1, 1),
    [id_rol] int,
    [id_estados] int,
    [correo_electronico] nvarchar(255) NOT NULL,
    [nombre_completo] nvarchar(255) NOT NULL,
    [password] varchar(45) NOT NULL,
    [telefono] varchar(45),
    [fecha_nacimiento] date NOT NULL,
    [fecha_creacion] date NOT NULL DEFAULT (GETDATE()),
    [id_clientes] int
);

CREATE TABLE [categoria_productos] (
    [id] int PRIMARY KEY IDENTITY(1, 1),
    [id_usuario] int,
    [nombre] varchar(45) NOT NULL,
    [id_estados] int,
    [fecha_creacion] datetime NOT NULL
);

CREATE TABLE [estados] (
    [id] int PRIMARY KEY IDENTITY(1, 1),
    [nombre] varchar(45) NOT NULL
);

CREATE TABLE [rol] (
    [id] int PRIMARY KEY IDENTITY(1, 1),
    [nombre] varchar(45) NOT NULL
);

CREATE TABLE [orden_detalles] (
    [id] int PRIMARY KEY IDENTITY(1, 1),
    [id_orden] int,
    [id_productos] int,
    [cantidad] int NOT NULL,
    [precio] float NOT NULL,
    [subtotal] float NOT NULL
);

CREATE TABLE [orden] (
    [id] int PRIMARY KEY IDENTITY(1, 1),
    [id_usuario] int,
    [id_estados] int,
    [fecha_creacion] datetime NOT NULL DEFAULT (GETDATE()),
    [nombre_completo] nvarchar(255) NOT NULL,
    [direccion] varchar(45) NOT NULL,
    [telefono] varchar(45) NOT NULL,
    [correo_electronico] nvarchar(255) NOT NULL,
    [fecha_entrega] date,
    [total_orden] float NOT NULL
);

CREATE TABLE [clientes] (
    [id] int PRIMARY KEY IDENTITY(1, 1),
    [razon_social] varchar(245),
    [nombre_comercial] varchar(345),
    [dirrecion_entrega] nvarchar(255) NOT NULL,
    [telefono] varchar(45) NOT NULL,
    [email] varchar(45)
);

CREATE TABLE [estados_orden] (
    [id] int PRIMARY KEY IDENTITY(1, 1),
    [nombre] varchar(45) NOT NULL
);

-- Agregar claves foráneas
ALTER TABLE [productos] ADD FOREIGN KEY ([id_usuarios]) REFERENCES [usuarios] ([id]);
ALTER TABLE [categoria_productos] ADD FOREIGN KEY ([id_estados]) REFERENCES [estados] ([id]);
ALTER TABLE [orden_detalles] ADD FOREIGN KEY ([id_orden]) REFERENCES [orden] ([id]);
ALTER TABLE [orden] ADD FOREIGN KEY ([id_usuario]) REFERENCES [usuarios] ([id]);
ALTER TABLE [productos] ADD FOREIGN KEY ([id_categorias]) REFERENCES [categoria_productos] ([id]);
ALTER TABLE [orden_detalles] ADD FOREIGN KEY ([id_productos]) REFERENCES [productos] ([id]);
ALTER TABLE [productos] ADD FOREIGN KEY ([id_estados]) REFERENCES [estados] ([id]);
ALTER TABLE [usuarios] ADD FOREIGN KEY ([id_clientes]) REFERENCES [clientes] ([id]);
ALTER TABLE [categoria_productos] ADD FOREIGN KEY ([id_usuario]) REFERENCES [usuarios] ([id]);
ALTER TABLE [usuarios] ADD FOREIGN KEY ([id_estados]) REFERENCES [estados] ([id]);
ALTER TABLE [orden] ADD FOREIGN KEY ([id_estados]) REFERENCES [estados_orden] ([id]);
ALTER TABLE [usuarios] ADD FOREIGN KEY ([id_rol]) REFERENCES [rol] ([id]);

-- Procedure Creacion


create or ALTER  procedure insert_estado
@nombre varchar(45)
as
begin
insert into estados(nombre) values (@nombre)
end


select * from estados


CREATE or ALTER PROCEDURE insert_rol
@nombre varchar(45)
AS
begin
insert into rol(nombre) values(@nombre)
end



select * from rol


CREATE or ALTER PROCEDURE insert_estados_orden
@nombre varchar(45)
AS
begin
insert into estados_orden(nombre) values(@nombre)
end



select * from rol

CREATE or ALTER  PROCEDURE insert_cliente 
    @razon_social VARCHAR(245),
    @nombre_comercial VARCHAR(345),
    @direccion_entrega VARCHAR(45),
    @telefono VARCHAR(45),
    @email VARCHAR(45) = ''
AS
BEGIN
    INSERT INTO clientes (razon_social, nombre_comercial, dirrecion_entrega, telefono, email)
    VALUES (@razon_social, @nombre_comercial, @direccion_entrega, @telefono, @email);
END


select * from clientes



CREATE OR ALTER PROCEDURE insert_usuario
    @id_rol INT,
    @correo_electronico VARCHAR(255) UNIQUE,
    @nombre_completo VARCHAR(255),
    @password VARCHAR(45),
    @telefono= NULL VARCHAR(45),
    @fecha_nacimiento DATE,
    @id_clientes INT = NULL 
AS
BEGIN
    DECLARE @hashed_password VARBINARY(64);
    SET @hashed_password = HASHBYTES('SHA2_256', CONVERT(VARBINARY, @password));

  
    INSERT INTO usuarios (
        id_rol, 
        id_estados, 
        correo_electronico, 
        nombre_completo, 
        password, 
        telefono, 
        fecha_nacimiento, 
        fecha_creacion, 
        id_clientes
    )
    VALUES (
        @id_rol, 
        1,
        @correo_electronico, 
        @nombre_completo, 
        @hashed_password, 
        @telefono, 
        @fecha_nacimiento, 
        GETDATE(), 
        @id_clientes
    );
END;
GO


CREATE  or ALTER  PROCEDURE  sp_create_orden
@id_usuario int = NULL,
@id_estados int = null,
@nombre_completo varchar(255),
@direccion varchar(45),
@telefono varchar(45),
@correo_electronico varchar(255),
@fecha_entrega date,
@total_orden float
AS
BEGIN 
INSERT  INTO  orden (
id_usuario,
id_estados,
fecha_creacion,
nombre_completo,
direccion,
telefono,
correo_electronico,
fecha_entrega,
total_orden
)
Values (
@id_usuario,
@id_estados,
GETDATE(),
@nombre_completo,
@direccion,
@telefono,
@correo_electronico,
@fecha_entrega,
@total_orden
)
END;

CREATE OR ALTER PROCEDURE sp_create_detail_orden
    @id_orden INT,
    @id_productos INT,
    @cantidad INT,
    @precio FLOAT,
    @subtotal FLOAT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        INSERT INTO orden_detalles (
            id_orden,
            id_productos,
            cantidad,
            precio,
            subtotal
        )
        VALUES (
            @id_orden,
            @id_productos,
            @cantidad,
            @precio,
            @subtotal
        );

        UPDATE productos
        SET stock = stock - @cantidad
        WHERE id = @id_productos;

        UPDATE productos
        SET id_estados = 3
        WHERE id = @id_productos AND stock = 0;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;

CREATE OR ALTER PROCEDURE insert_categoria_productos
    @id_usuario INT,
    @nombre VARCHAR(45),
    @id_estados INT
AS
BEGIN
    INSERT INTO categoria_productos (
        id_usuario, 
        nombre, 
        id_estados, 
        fecha_creacion
    )
    VALUES (
        @id_usuario, 
        @nombre, 
        @id_estados, 
        GETDATE() 
    );
END;



CREATE or ALTER  PROCEDURE insert_producto
    @id_categorias INT = null,
    @id_usuarios INT = null,
    @nombre VARCHAR(45),
    @marca VARCHAR(45),
    @codigo VARCHAR(45),
    @id_estados INT = 1,
    @precio FLOAT,
    @foto VARCHAR(255) = NULL,
	@stock int
AS
BEGIN

    INSERT INTO productos (
        id_categorias, 
        id_usuarios, 
        nombre, 
        marca, 
        codigo, 
        id_estados, 
        precio, 
        fecha_creacion, 
        foto,
		stock
    )
    VALUES (
        @id_categorias, 
        @id_usuarios, 
        @nombre, 
        @marca, 
        @codigo, 
        @id_estados, 
        @precio, 
        GETDATE(),
        @foto,
		@stock
    );
END;






CREATE OR ALTER PROCEDURE insert_orden
    @id_usuario INT, 
    @id_estados INT, 
    @nombre_completo NVARCHAR(255), 
    @direccion VARCHAR(45), 
    @telefono VARCHAR(45),
    @correo_electronico NVARCHAR(255), 
    @total_orden FLOAT 
AS
BEGIN
 
    INSERT INTO orden (
        id_usuario, 
        id_estados, 
        fecha_creacion, 
        nombre_completo, 
        direccion, 
        telefono, 
        correo_electronico, 
        fecha_entrega, 
        total_orden
    )
    VALUES (
        @id_usuario, 
        @id_estados, 
        GETDATE(),
        @nombre_completo, 
        @direccion, 
        @telefono, 
        @correo_electronico, 
        CAST(GETDATE() AS DATE),
        @total_orden
    );
END;
GO




CREATE OR ALTER PROCEDURE insert_orden_detalles
    @id_orden INT, 
    @id_productos INT, 
    @cantidad INT, 
    @precio FLOAT 
AS
BEGIN
   
    DECLARE @subtotal FLOAT;

    
    SET @subtotal = @cantidad * @precio;

    
    INSERT INTO orden_detalles (
        id_orden, 
        id_productos, 
        cantidad, 
        precio, 
        subtotal
    )
    VALUES (
        @id_orden, 
        @id_productos, 
        @cantidad, 
        @precio, 
        @subtotal
    );
END;

--Insertar

exec insert_estado 'activo'
exec insert_estado 'inactvo'
exec insert_rol 'administrador'
exec insert_rol 'usuario'
exec  insert_estados_orden 'en proceso'
exec  insert_estados_orden 'finalizada'
exec  insert_estados_orden 'cancelada'
exec insert_cliente 'Jose', 'Vendedores S.A', '9av 123 zona 13', '32343234', 'jose@gmail.com'
exec insert_cliente 'Alberto', 'Compradores S.A', '23av 22 zona 14', '3412423', 'alberto@gmail.com'
exec insert_usuario 2, 'CORREO@FDAS', 'Jose', '1234', '34343', '2022-03-11', 1;
exec insert_usuario 2, 'Correo@FDAS', 'Beto', '34999', '123453434543', '1999-03-08', 1;
exec insert_categoria_productos 1,'Mascotas',1
exec insert_categoria_productos 1,'Alimentos',1
EXEC insert_producto  1, 1, 'Mouse', 'Logitech', 'L456', 1, 25.99, @foto = NULL,1;
EXEC insert_producto  1, 1, 'Hueso', 'Perros Felices', 'H223', 1, 33.44, @foto = NULL,1;
exec insert_orden 1,1,'Jose Arana', '9av123', '12321', 'jose@gmail.com', 12.33;
exec insert_orden 2,2,'Beto Pepe', '9av123', '12321', 'beto@gmail.com', 33.23;
EXEC insert_orden_detalles 
    @id_orden = 4,
    @id_productos = 3,
    @cantidad = 3,
    @precio = 150.50;


	-- Actualizar Procedure

CREATE OR ALTER PROCEDURE update_estado
    @id INT,
    @nombre VARCHAR(45)
AS
BEGIN
    UPDATE estados
    SET nombre = @nombre
    WHERE id = @id;
END;


CREATE OR ALTER PROCEDURE update_rol
    @id INT,
    @nombre VARCHAR(45)
AS
BEGIN
    UPDATE rol
    SET nombre = @nombre
    WHERE id = @id;
END;



CREATE OR ALTER PROCEDURE update_estado_orden
    @id INT,
    @nombre VARCHAR(45)
AS
BEGIN
    UPDATE estados_orden
    SET nombre = @nombre
    WHERE id = @id;
END;



CREATE OR ALTER PROCEDURE update_cliente
    @id INT,
    @razon_social VARCHAR(245),
    @nombre_comercial VARCHAR(345),
    @direccion_entrega VARCHAR(45),
    @telefono VARCHAR(45),
    @email VARCHAR(45)
AS
BEGIN
    UPDATE clientes
    SET 
        razon_social = @razon_social,
        nombre_comercial = @nombre_comercial,
        dirrecion_entrega = @direccion_entrega,
        telefono = @telefono,
        email = @email
    WHERE id = @id;
END;



CREATE OR ALTER PROCEDURE sp_update_usuarios
    @id INT,
    @id_rol INT = NULL,
    @id_estados INT = 1,
    @correo_electronico VARCHAR(255),
    @nombre_completo VARCHAR(255),
    @password VARCHAR(255),
    @telefono VARCHAR(45) = NULL,
    @fecha_nacimiento DATE,
    @id_clientes INT = NULL
AS
BEGIN
    UPDATE usuarios
    SET id_rol = @id_rol,
        id_estados = @id_estados,
        correo_electronico = @correo_electronico,
        nombre_completo = @nombre_completo,
        password = @password,
        telefono = @telefono,
        fecha_nacimiento = @fecha_nacimiento,
        id_clientes = @id_clientes
    WHERE id = @id;
END;
GO


CREATE OR ALTER PROCEDURE update_categoria_productos
    @id INT,
    @id_usuario INT,
    @nombre VARCHAR(45),
    @id_estados INT
AS
BEGIN
    UPDATE categoria_productos
    SET 
        id_usuario = @id_usuario,
        nombre = @nombre,
        id_estados = @id_estados
    WHERE id = @id;
END


CREATE or ALTER PROCEDURE update_producto
    @id INT,
    @id_categorias INT = NULL,
    @id_usuarios INT = NULL,
    @nombre VARCHAR(45) = NULL,
    @marca VARCHAR(45) = NULL,
    @codigo VARCHAR(45) = NULL,
    @id_estados INT = NULL,
    @precio FLOAT = NULL,
    @foto VARCHAR(255) = NULL,
    @stock INT = NULL
AS
BEGIN
    UPDATE productos
    SET 
        id_categorias = COALESCE(@id_categorias, id_categorias),
        id_usuarios = COALESCE(@id_usuarios, id_usuarios),
        nombre = COALESCE(@nombre, nombre),
        marca = COALESCE(@marca, marca),
        codigo = COALESCE(@codigo, codigo),
        id_estados = COALESCE(@id_estados, id_estados),
        precio = COALESCE(@precio, precio),
        foto = COALESCE(@foto, foto),
        stock = COALESCE(@stock, stock)
    WHERE id = @id;
END;



CREATE OR ALTER PROCEDURE update_orden
    @id INT,
    @id_usuario INT,
    @id_estados INT,
    @nombre_completo NVARCHAR(255),
    @direccion VARCHAR(45),
    @telefono VARCHAR(45),
    @correo_electronico NVARCHAR(255),
    @fecha_entrega DATE,
    @total_orden FLOAT
AS
BEGIN
    UPDATE orden
    SET 
        id_usuario = @id_usuario,
        id_estados = @id_estados,
        nombre_completo = @nombre_completo,
        direccion = @direccion,
        telefono = @telefono,
        correo_electronico = @correo_electronico,
        fecha_entrega = @fecha_entrega,
        total_orden = @total_orden
    WHERE id = @id;
END;



CREATE OR ALTER PROCEDURE update_orden_detalles
    @id INT,
    @id_orden INT,
    @id_productos INT,
    @cantidad INT,
    @precio FLOAT
AS
BEGIN
    DECLARE @subtotal FLOAT;
    SET @subtotal = @cantidad * @precio;

    UPDATE orden_detalles
    SET 
        id_orden = @id_orden,
        id_productos = @id_productos,
        cantidad = @cantidad,
        precio = @precio,
        subtotal = @subtotal
    WHERE id = @id;
END;


-- Consultas Actualizacion
EXEC update_estado @id = 1, @nombre = 'Activo Actualizado';

EXEC update_cliente 
    @id = 1,
    @razon_social = 'Jose Modificado', 
    @nombre_comercial = 'Vendedores S.A Modificado', 
    @direccion_entrega = '9av Modificada', 
    @telefono = '5551234', 
    @email = 'nuevoemail@gmail.com';

	EXEC update_orden 
    @id = 1,
    @id_usuario = 2, 
    @id_estados = 3, 
    @nombre_completo = 'Cliente Modificado',
    @direccion = 'Nueva Direccion',
    @telefono = '123456789',
    @correo_electronico = 'modificado@gmail.com',
    @fecha_entrega = '2023-12-31',
    @total_orden = 250.50;



	-- Vistas #1

	CREATE VIEW vw_productos_activos_con_stock AS
SELECT 
    COUNT(*) AS total_productos_activos
FROM 
    productos
WHERE 
    id_estados = 1 
    AND stock > 0; 



	-- Vistas #2
	CREATE VIEW vw_total_ordenes_agosto_2024 AS
SELECT 
    SUM(total_orden) AS total_quetzales
FROM 
    orden
WHERE 
    MONTH(fecha_creacion) = 8 
    AND YEAR(fecha_creacion) = 2024;


	-- vista #3
CREATE VIEW vw_top_10_clientes_mayor_consumo AS
SELECT TOP 10
    c.id AS id_cliente,
    c.razon_social,
    c.nombre_comercial,
    SUM(o.total_orden) AS total_consumo
FROM 
    clientes c
INNER JOIN 
    usuarios u ON c.id = u.id_clientes
INNER JOIN 
    orden o ON u.id = o.id_usuario
GROUP BY 
    c.id, c.razon_social, c.nombre_comercial
ORDER BY 
    total_consumo DESC;

-- vista #4

CREATE VIEW vw_top_10_productos_mas_vendidos AS
SELECT TOP 10
    p.id AS id_producto,
    p.nombre AS nombre_producto,
    SUM(od.cantidad) AS total_vendidos
FROM 
    productos p
INNER JOIN 
    orden_detalles od ON p.id = od.id_productos
GROUP BY 
    p.id, p.nombre
ORDER BY 
    total_vendidos ASC;



CREATE  or ALTER   PROCEDURE  sp_update_orden
@id int,
@id_usuario int,
@id_estados int = null,
@nombre_completo varchar(255) = NULL ,
@direccion varchar(45)  = NULL,
@telefono varchar(45)  = NULL,
@correo_electronico varchar(255)  = NULL,
@fecha_entrega date  = NULL
AS
BEGIN 
UPDATE orden 
SET 
id_usuario = COALESCE(@id_usuario,id_usuario),
id_estados= COALESCE(@id_estados,id_estados),
nombre_completo= COALESCE(@nombre_completo,nombre_completo),
direccion= COALESCE(@direccion,direccion),
telefono= COALESCE(@telefono,telefono),
correo_electronico= COALESCE(@correo_electronico,correo_electronico),
fecha_entrega= COALESCE(@fecha_entrega,fecha_entrega)
WHERE id = @id
END;

CREATE  or ALTER  PROCEDURE  sp_update_detail_orden
@id int,
@id_orden int,
@id_productos int,
@cantidad int,
@precio float,
@subtotal float
AS
BEGIN 
UPDATE orden_detalles 
SET 
id_orden = COALESCE(@id_orden,id_orden),
id_productos= COALESCE(@id_productos,id_productos),
cantidad= COALESCE(@cantidad,cantidad),
precio= COALESCE(@precio,precio),
subtotal= COALESCE(@subtotal,subtotal)
WHERE id = @id
END;
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-02-2024 a las 18:46:54
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_controlgestion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_clasificacion`
--

CREATE TABLE `cat_clasificacion` (
  `id_clasificacion` int(11) NOT NULL,
  `clasificacion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cat_clasificacion`
--

INSERT INTO `cat_clasificacion` (`id_clasificacion`, `clasificacion`) VALUES
(1, 'Atención'),
(2, 'Conocimiento');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_direccion`
--

CREATE TABLE `cat_direccion` (
  `id_direccion` int(11) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `representante` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cat_direccion`
--

INSERT INTO `cat_direccion` (`id_direccion`, `direccion`, `representante`) VALUES
(1, 'Dirección General de Materiales Educativos', 'Magnolia Sacramento Escamilla García'),
(2, 'Dirección de Planeación y Seguimiento', 'Monica Cosetl Bautista'),
(3, 'Dirección de Administración de Recursos y de Gestión Digital', 'Rosa Isela Avila Moreno'),
(4, 'Dirección de Bibliotecas y Promoción de la Lectura', 'María Luisa Rojano Traviesa'),
(5, 'Dirección Editorial', 'María del Carmen Castelán Vázquez'),
(6, 'Dirección de Desarrollo e Innovación de Materiales Educativos', 'Juanita Anastacio Sebastían'),
(7, 'Dirección de Medios Audiovisuales e Informáticos', 'José Luis Aguilar Contreras'),
(8, 'Dirección de Evaluación y Distribución', 'Argelia Sujei Hernández García'),
(9, 'Mensajería', 'Erick Mendez Cruz'),
(10, 'Control de Gestión', 'Alejandro Chávez Chávez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_oficio`
--

CREATE TABLE `cat_oficio` (
  `id_oficio` int(11) NOT NULL,
  `oficio` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cat_oficio`
--

INSERT INTO `cat_oficio` (`id_oficio`, `oficio`) VALUES
(1, 'Atenta Nota'),
(2, 'Oficio'),
(3, 'Correo Electrónico'),
(4, 'Oficio (Atenta Nota)'),
(5, 'Oficio ( Copia de conocimiento)'),
(6, 'Volante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_perfil`
--

CREATE TABLE `cat_perfil` (
  `id_perfil` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `home` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `cat_perfil`
--

INSERT INTO `cat_perfil` (`id_perfil`, `nombre`, `home`) VALUES
(1, 'Administrador', 'Admin/Inicio'),
(2, 'ControlGestion', 'CG/Inicio'),
(3, 'Direccion', 'Direccion/Inicio'),
(4, 'Mensajeria', 'Mensajeria/Inicio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_resolucion`
--

CREATE TABLE `cat_resolucion` (
  `id_resolucion` int(11) NOT NULL,
  `resolucion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cat_resolucion`
--

INSERT INTO `cat_resolucion` (`id_resolucion`, `resolucion`) VALUES
(1, 'Abierto'),
(2, 'Cerrado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_tipoficio`
--

CREATE TABLE `cat_tipoficio` (
  `id_tipOficio` int(11) NOT NULL,
  `tipo_Oficio` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cat_tipoficio`
--

INSERT INTO `cat_tipoficio` (`id_tipOficio`, `tipo_Oficio`) VALUES
(1, 'Externo'),
(2, 'Interno');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inicio_sesion`
--

CREATE TABLE `inicio_sesion` (
  `id_inicio_sesion` int(11) NOT NULL,
  `usu_id` varchar(45) NOT NULL,
  `token` varchar(45) NOT NULL,
  `fech_reg` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lib_oficioexterno`
--

CREATE TABLE `lib_oficioexterno` (
  `id_oficioExterno` int(11) NOT NULL,
  `id_oficio` int(11) NOT NULL,
  `id_clasificacion` int(11) NOT NULL,
  `id_direccion` int(11) NOT NULL,
  `id_resolucion` int(11) NOT NULL,
  `num_oficio` varchar(50) NOT NULL,
  `remitente` varchar(100) NOT NULL,
  `destinatario` varchar(100) NOT NULL,
  `fechaDocumento` date NOT NULL,
  `fechaRecepcion` date NOT NULL,
  `asunto` varchar(150) NOT NULL,
  `anexos` varchar(150) NOT NULL,
  `obsEntrada` varchar(150) NOT NULL,
  `turnado` tinyint(1) NOT NULL,
  `fechaTurnado` date NOT NULL,
  `archivoEntrada` varchar(100) NOT NULL,
  `usu_id` int(11) NOT NULL,
  `id_tipOficio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lib_oficiointerno`
--

CREATE TABLE `lib_oficiointerno` (
  `id_oficioInterno` int(11) NOT NULL,
  `id_oficio` int(11) NOT NULL,
  `id_clasificacion` int(11) NOT NULL,
  `id_direccion` int(11) NOT NULL,
  `id_resolucion` int(11) NOT NULL,
  `num_oficioInterno` varchar(50) NOT NULL,
  `remitenteInt` varchar(100) NOT NULL,
  `destinatarioInt` varchar(100) NOT NULL,
  `fechaDocumentoInt` date NOT NULL,
  `fechaEnvio` date NOT NULL,
  `asuntoInt` varchar(150) NOT NULL,
  `anexosInt` varchar(150) NOT NULL,
  `observacionesInt` varchar(150) NOT NULL,
  `turnadoInt` tinyint(1) NOT NULL,
  `fechaTurnadoInt` date NOT NULL,
  `archivoEntradaInt` varchar(150) NOT NULL,
  `usu_id` int(11) NOT NULL,
  `id_tipOficio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lib_oficiomensajeriaexterno`
--

CREATE TABLE `lib_oficiomensajeriaexterno` (
  `id_mensajeria` int(11) NOT NULL,
  `id_oficioExterno` int(11) NOT NULL,
  `id_oficioRespuesta` int(11) NOT NULL,
  `fechaCierre` date NOT NULL,
  `archivoCierre` varchar(100) NOT NULL,
  `usu_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lib_oficiomensajeriainterno`
--

CREATE TABLE `lib_oficiomensajeriainterno` (
  `id_mensajeriaInterno` int(11) NOT NULL,
  `id_oficioInterno` int(11) NOT NULL,
  `fechaCierreInt` date NOT NULL,
  `archivoCierre` varchar(100) NOT NULL,
  `usu_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lib_oficiorespuesta`
--

CREATE TABLE `lib_oficiorespuesta` (
  `id_oficioRespuesta` int(11) NOT NULL,
  `id_oficioExterno` int(11) NOT NULL,
  `id_oficio` int(11) NOT NULL,
  `num_oficioResp` varchar(50) NOT NULL,
  `asuntoResp` varchar(150) NOT NULL,
  `fechaRespuesta` date NOT NULL,
  `anexosResp` varchar(150) NOT NULL,
  `obsRespuesta` varchar(150) NOT NULL,
  `archivoRespuesta` varchar(100) NOT NULL,
  `usu_id` int(11) NOT NULL,
  `id_tipOficio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usu_id` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL,
  `id_direccion` int(11) NOT NULL,
  `usu_nombre` varchar(100) NOT NULL,
  `usu_login` varchar(45) NOT NULL,
  `usu_pass` varchar(100) NOT NULL,
  `usu_creador` int(11) DEFAULT NULL,
  `f_creacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usu_id`, `id_perfil`, `id_direccion`, `usu_nombre`, `usu_login`, `usu_pass`, `usu_creador`, `f_creacion`) VALUES
(1, 2, 10, 'Control de Gestión', 'controlG', '123', 0, '2024-02-14 10:47:48'),
(2, 1, 0, 'Ana', 'Ana', '123456', 0, '2024-02-13 13:29:50'),
(49, 3, 7, 'Jose Luis', 'jose', 'abc123', 0, '2024-02-14 10:48:06'),
(50, 4, 9, 'Erick Mendez', 'mensajeria', '1234', 0, '2024-02-14 10:48:13');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cat_clasificacion`
--
ALTER TABLE `cat_clasificacion`
  ADD PRIMARY KEY (`id_clasificacion`);

--
-- Indices de la tabla `cat_direccion`
--
ALTER TABLE `cat_direccion`
  ADD PRIMARY KEY (`id_direccion`);

--
-- Indices de la tabla `cat_oficio`
--
ALTER TABLE `cat_oficio`
  ADD PRIMARY KEY (`id_oficio`);

--
-- Indices de la tabla `cat_perfil`
--
ALTER TABLE `cat_perfil`
  ADD PRIMARY KEY (`id_perfil`,`nombre`,`home`);

--
-- Indices de la tabla `cat_resolucion`
--
ALTER TABLE `cat_resolucion`
  ADD PRIMARY KEY (`id_resolucion`);

--
-- Indices de la tabla `cat_tipoficio`
--
ALTER TABLE `cat_tipoficio`
  ADD PRIMARY KEY (`id_tipOficio`);

--
-- Indices de la tabla `inicio_sesion`
--
ALTER TABLE `inicio_sesion`
  ADD PRIMARY KEY (`id_inicio_sesion`);

--
-- Indices de la tabla `lib_oficioexterno`
--
ALTER TABLE `lib_oficioexterno`
  ADD PRIMARY KEY (`id_oficioExterno`,`id_oficio`,`id_clasificacion`,`id_direccion`,`id_resolucion`,`usu_id`,`id_tipOficio`) USING BTREE;

--
-- Indices de la tabla `lib_oficiointerno`
--
ALTER TABLE `lib_oficiointerno`
  ADD PRIMARY KEY (`id_oficioInterno`,`id_oficio`,`id_clasificacion`,`id_direccion`,`id_resolucion`,`usu_id`,`id_tipOficio`) USING BTREE;

--
-- Indices de la tabla `lib_oficiomensajeriaexterno`
--
ALTER TABLE `lib_oficiomensajeriaexterno`
  ADD PRIMARY KEY (`id_mensajeria`,`id_oficioExterno`,`id_oficioRespuesta`,`usu_id`) USING BTREE;

--
-- Indices de la tabla `lib_oficiomensajeriainterno`
--
ALTER TABLE `lib_oficiomensajeriainterno`
  ADD PRIMARY KEY (`id_mensajeriaInterno`,`id_oficioInterno`,`usu_id`) USING BTREE;

--
-- Indices de la tabla `lib_oficiorespuesta`
--
ALTER TABLE `lib_oficiorespuesta`
  ADD PRIMARY KEY (`id_oficioRespuesta`,`id_oficioExterno`,`id_oficio`,`usu_id`,`id_tipOficio`) USING BTREE;

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usu_id`,`id_perfil`,`id_direccion`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cat_clasificacion`
--
ALTER TABLE `cat_clasificacion`
  MODIFY `id_clasificacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cat_direccion`
--
ALTER TABLE `cat_direccion`
  MODIFY `id_direccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `cat_oficio`
--
ALTER TABLE `cat_oficio`
  MODIFY `id_oficio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `cat_perfil`
--
ALTER TABLE `cat_perfil`
  MODIFY `id_perfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `cat_resolucion`
--
ALTER TABLE `cat_resolucion`
  MODIFY `id_resolucion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cat_tipoficio`
--
ALTER TABLE `cat_tipoficio`
  MODIFY `id_tipOficio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `inicio_sesion`
--
ALTER TABLE `inicio_sesion`
  MODIFY `id_inicio_sesion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `lib_oficioexterno`
--
ALTER TABLE `lib_oficioexterno`
  MODIFY `id_oficioExterno` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `lib_oficiointerno`
--
ALTER TABLE `lib_oficiointerno`
  MODIFY `id_oficioInterno` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `lib_oficiomensajeriaexterno`
--
ALTER TABLE `lib_oficiomensajeriaexterno`
  MODIFY `id_mensajeria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `lib_oficiomensajeriainterno`
--
ALTER TABLE `lib_oficiomensajeriainterno`
  MODIFY `id_mensajeriaInterno` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `lib_oficiorespuesta`
--
ALTER TABLE `lib_oficiorespuesta`
  MODIFY `id_oficioRespuesta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

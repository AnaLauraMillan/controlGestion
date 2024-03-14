<?php

	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
	header('content-type: application/json; charset=utf-8');

	//require_once '../../cookie.php';
	require_once '../conecta.php';

	if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
		echo json_encode(array('status' => false));
		exit;
	}
	
	//recibe el archivo desde el FormData
	if (isset($_FILES['file'])) {
		
		$conn	=	conecta_bd();
	    //$rutaGlobal = "http://localhost/Programas/ControlGestion/src/assets/";
		$rutaGlobal = "C:/xampp/htdocs/Programas/ControlGestion/src/assets/";
		
		$archivo = $_FILES['file'];
		$dire = $_POST['dire'];
		$IdUsu = $_POST['usu'];
		$tofi = $_POST['TipO'];
		$nombreArchivo = $archivo['name']; //Se obtiene el nombre del archivo (que trae por default - original)
		$ext = '.'.pathinfo($nombreArchivo, PATHINFO_EXTENSION); // Se obtiene la extensión del archivo
		$ubicacionTemporal = $archivo["tmp_name"]; //Se obtiene la ubicación en donde php lo almacena temporalmente

		//Se realiza del perfil de acuerdo al id de usuario logueado.
		$q = "SELECT id_perfil, siglas 
			  FROM `usuarios` 
			  INNER JOIN cat_direccion ON cat_direccion.id_direccion = usuarios.id_direccion
			  WHERE usu_id = '$IdUsu'";

			$result = mysqli_query($conn,$q);

		if ($result && mysqli_num_rows($result) > 0) {
			$fila = mysqli_fetch_assoc($result);
			$perfil = $fila['id_perfil'];
			$SDir = $fila['siglas'];	
			
			//Ejecuta la función que asigna la ruta al archivo
			list($ruta,$resultado) = asignaRuta($perfil,$SDir,$tofi, $nombreArchivo, $rutaGlobal,$ubicacionTemporal,$conn);

			if ($resultado) {
				echo json_encode(array(
					'status' => true,
					'generatedName' => $nombreArchivo,
					'url' => $ruta,
				));
			} else {
				echo json_encode(array(
					'status' => false,
					'generatedName' => $nombreArchivo,
					'url' => $ruta,
				));
			}
		}
	}



	function asignaRuta($perf, $dire, $tipOfi, $nomArchivo,$rutaGlobal,$ubicacionTemporal,$conn) {
		
		if($tipOfi == 1) {
			$ofE = "OficiosExternos";
		}
		else 
		{
			$ofE = "OficiosInternos";
		}

		if($perf == 2) {
			$rutaArchivo = $rutaGlobal . "CG" . "/" . "OficiosExternos";
			$nuevaUbicacion = $rutaArchivo . "/" . $nomArchivo;
		    $resultado = move_uploaded_file($ubicacionTemporal, $nuevaUbicacion);
			return [$nuevaUbicacion, $resultado];
		}
		else if($perf == 3) {
			$rutaArchivo = $rutaGlobal . "Direccion" . "/" . $dire . "/" . $ofE;
			$nuevaUbicacion = $rutaArchivo . "/" . $nomArchivo;
			$resultado = move_uploaded_file($ubicacionTemporal, $nuevaUbicacion);
			return [$nuevaUbicacion, $resultado];
		}
		else {
			$rutaArchivo = $rutaGlobal . "Mensajeria" . "/" .  $ofE;
			$nuevaUbicacion = $rutaArchivo . "/" . $nomArchivo;
			$resultado = move_uploaded_file($ubicacionTemporal, $nuevaUbicacion);
			return [$nuevaUbicacion, $resultado];
		}
	}

	// //$resultado = move_uploaded_file($archivo["tmp_name"], $archivo["name"]);
?>
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
	
	//recibe valores externo 
	$dat = file_get_contents('php://input');
	$datos = json_decode($dat, true);
	
	if($datos) {

		$conn	=	conecta_bd();
		$rutaGlobal = "http://localhost/Programas/ControlGestion/src/assets/";

		$IdDireccion =  $datos['dir'];
		$IdUsu =  $datos['usu'];
		$nombreArchivo = $datos['name'];
		$tofi = $datos['TipO'];
		

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
			asignaRuta($perfil,$SDir,$tofi, $nombreArchivo, $rutaGlobal,$conn);
		}
	}

	function asignaRuta($perf, $dire, $tipOfi, $nomArchivo,$rutaGlobal,$conn) {

		$ext = '.'.pathinfo($nomArchivo, PATHINFO_EXTENSION); // Se obtiene la extensión del archivo

		if($tipOfi == 1) {
			$ofE = "OficiosExternos";
		}
		else 
		{
			$ofE = "OficiosInternos";
		}

		
		if($perf == 2) {
			$rutaArchivo = $rutaGlobal . "CG" . "/" . "OficiosExternos" . "/" .$nomArchivo;
			$resultado = move_uploaded_file($ubicacionTemporal, $nuevaUbicacion);
		}
		else if($perf == 3) {
			echo $rutaArchivo = $rutaGlobal . "Direccion" . "/" . $dire . "/" . $ofE . "/" .$nomArchivo;
		}
		else {
			echo $rutaArchivo = $rutaGlobal . "Mensajeria" . "/" .  $ofE  . "/" .$nomArchivo;
		}
	}
	// var_dump($result);
	// $archivo = $result['datos'];
	// var_dump($archivo);

	//recibe el archivo desde el FormData
	// if (isset($dat['file'])) {
	// 	$archivo = $dat['file'];
	// 	var_dump($archivo);
		// $nombreArchivo = $archivo['name']; //Se obtiene el nombre del archivo (que trae por default - original)
		// $ext = '.'.pathinfo($nombreArchivo, PATHINFO_EXTENSION); // Se obtiene la extensión del archivo
		
		// $ubicacionTemporal = $archivo["tmp_name"]; //Se obtiene la ubicación en donde php lo almacena temporalmente
		// $rutaArchivo = "C:/xampp/htdocs/Programas/controlGestion/src/assets/Direccion/OficioInterno"; // Se asigna la nueva ruta donde se almacenará el archivo
		// $nuevaUbicacion = $rutaArchivo . "/" . $nombreArchivo;
	
		// $resultado = move_uploaded_file($ubicacionTemporal, $nuevaUbicacion);

		// if ($resultado) {
		// 	echo json_encode(array(
        //         'status' => true,
        //         'generatedName' => $nombreArchivo,
		// 		'url' => $rutaArchivo,
        //     ));
		// } else {
		// 	echo json_encode(array(
        //         'status' => false,
        //         'generatedName' => $nombreArchivo,
		// 		'url' => $rutaArchivo,
        //     ));
		// }
	// }

	// //$resultado = move_uploaded_file($archivo["tmp_name"], $archivo["name"]);
?>
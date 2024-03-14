<?php

	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
	header('content-type: application/json; charset=utf-8');

//require_once '../../cookie.php';

//si el metodo de entrada no es el apropiado lo rechaza
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(array('status' => false));
    exit;
}

//recibe valores externo 
$dat = file_get_contents('php://input');
$datos = json_decode($dat, true);

	if($datos) {

		require_once '../conecta.php';	
		$conn	=	conecta_bd();

		$idUsuario = $datos['IdUsu'];
		$idDireccion = $datos['IdDL'];
		
		$q = "SELECT lib_oficiointerno.id_oficioInterno, lib_oficiointerno.id_oficio, cat_oficio.oficio, lib_oficiointerno.id_clasificacion,cat_clasificacion.clasificacion, lib_oficiointerno.id_direccion, cat_direccion.direccion, lib_oficiointerno.id_resolucion, cat_resolucion.resolucion, lib_oficiointerno.num_oficioInterno, lib_oficiointerno.remitenteInt, lib_oficiointerno.destinatarioInt, lib_oficiointerno.fechaDocumentoInt, lib_oficiointerno.fechaEnvio, lib_oficiointerno.asuntoInt, lib_oficiointerno.anexosInt, lib_oficiointerno.observacionesInt, lib_oficiointerno.turnadoInt,lib_oficiointerno.fechaTurnadoInt, lib_oficiointerno.archivoEntradaInt, lib_oficiomensajeriainterno.fechaCierreInt, lib_oficiomensajeriainterno.archivoCierre, lib_oficiorespuesta.num_oficioResp, lib_oficiorespuesta.asuntoResp, lib_oficiorespuesta.fechaRespuesta, lib_oficiorespuesta.anexosResp, lib_oficiorespuesta.anexosResp, lib_oficiorespuesta.obsRespuesta, lib_oficiorespuesta.archivoRespuesta
			  FROM `lib_oficiointerno` 
			  INNER JOIN cat_oficio ON cat_oficio.id_oficio = lib_oficiointerno.id_oficio
			  INNER JOIN cat_clasificacion ON cat_clasificacion.id_clasificacion = lib_oficiointerno.id_clasificacion
			  INNER JOIN cat_direccion ON cat_direccion.id_direccion = lib_oficiointerno.id_direccion
			  INNER JOIN cat_resolucion ON cat_resolucion.id_resolucion = lib_oficiointerno.id_resolucion
			  INNER JOIN lib_oficiomensajeriainterno ON lib_oficiomensajeriainterno.id_oficioInterno = lib_oficiointerno.id_oficioInterno
			  INNER JOIN lib_oficiorespuesta ON lib_oficiorespuesta.id_oficioInterno = lib_oficiointerno.id_oficioInterno
			  WHERE lib_oficiointerno.usu_id = '$idUsuario' AND lib_oficiointerno.id_direccion = '$idDireccion'";
		
		$result = mysqli_query($conn,$q);
		if ($result->num_rows) {
			while($row = $result->fetch_array(MYSQLI_ASSOC)) {
				$myArray[] = $row;
			}
			desconectar_bd($conn);
			//para mostrar en navegador
			$arbol_php = json_encode($myArray);
			//para guardar en archivo json
			$jsonencoded = json_encode($myArray,JSON_UNESCAPED_UNICODE);
			$data = str_replace("\\/", "/", $jsonencoded);
			echo $data;
		} 
		else 
		{
			$myArray1 = null;
			$arbol_php = json_encode($myArray1);
			//para guardar en archivo json
			$jsonencoded = json_encode($myArray1,JSON_UNESCAPED_UNICODE);
			$data = str_replace("\\/", "/", $jsonencoded);
			echo $data;
		}
	} 
?>
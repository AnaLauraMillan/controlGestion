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
	$IdDireccion = $datos['IdDL'];
	$IdUsu = $datos['IdUsu'];
	
	//Se hace una consulta de todos los oficios que se obtienen del usuario logueado
	$q ="SELECT lib_oficiointerno.id_oficioInterno, lib_oficiointerno.id_oficio, cat_oficio.oficio AS ofiEnt, lib_oficiointerno.id_clasificacion,cat_clasificacion.clasificacion AS clasEnt, 
				lib_oficiointerno.id_direccion, cat_direccion.direccion AS dirEnt, lib_oficiointerno.id_resolucion, cat_resolucion.resolucion, lib_oficiointerno.num_oficioInterno, 
			 	lib_oficiointerno.remitenteInt, lib_oficiointerno.destinatarioInt, lib_oficiointerno.destino , lib_oficiointerno.fechaDocumentoInt, lib_oficiointerno.fechaEnvio, 
				lib_oficiointerno.asuntoInt AS asuntoEnt,lib_oficiointerno.anexosInt AS anexoEnt, lib_oficiointerno.observacionesInt AS obsEnt,
				lib_oficiointerno.turnadoInt,lib_oficiointerno.fechaTurnadoInt, lib_oficiointerno.id_tipOficio, cat_tipoficio.tipo_Oficio,
				lib_oficiointerno.archivoEntradaInt, lib_oficiomensajeriainterno.fechaCierreInt, lib_oficiomensajeriainterno.archivoCierre, 
				lib_oficiorespuesta.num_oficioResp, lib_oficiorespuesta.id_oficio, respuesta.oficio AS tOficioResp ,lib_oficiorespuesta.asuntoResp, lib_oficiorespuesta.fechaRespuesta, lib_oficiorespuesta.anexosResp,
				lib_oficiorespuesta.anexosResp, lib_oficiorespuesta.obsRespuesta, lib_oficiorespuesta.archivoRespuesta
		FROM `lib_oficiointerno` 
		LEFT JOIN cat_oficio ON cat_oficio.id_oficio = lib_oficiointerno.id_oficio
		LEFT JOIN cat_clasificacion ON cat_clasificacion.id_clasificacion = lib_oficiointerno.id_clasificacion
		LEFT JOIN cat_direccion ON cat_direccion.id_direccion = lib_oficiointerno.id_direccion
		LEFT JOIN cat_resolucion ON cat_resolucion.id_resolucion = lib_oficiointerno.id_resolucion
		LEFT JOIN cat_tipoficio ON cat_tipoficio.id_tipOficio = lib_oficiointerno.id_tipOficio
		-- LEFT JOIN cat_direccion AS dest ON dest.id_direccion = lib_oficiointerno.destinatarioInt
		LEFT JOIN lib_oficiomensajeriainterno ON lib_oficiomensajeriainterno.id_oficioInterno = lib_oficiointerno.id_oficioInterno
		LEFT JOIN lib_oficiorespuesta ON lib_oficiorespuesta.id_oficioInterno = lib_oficiointerno.id_oficioInterno
		LEFT JOIN cat_oficio AS respuesta ON respuesta.id_oficio = lib_oficiointerno.id_oficio
		WHERE lib_oficiointerno.usu_id = '$IdUsu'";
				
	$result = mysqli_query($conn,$q);

	if ($result->num_rows) 
	{
		while($row = $result->fetch_array(MYSQLI_ASSOC)) 
		{
		$myArray[] = $row;
		}
		desconectar_bd($conn);

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
		$jsonencoded = json_encode($myArray1,JSON_UNESCAPED_UNICODE);
		$data = str_replace("\\/", "/", $jsonencoded);
		echo $data;
	}

}
?>
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

		$idUsuario = $datos['IdUsu'];
		
		require_once '../conecta.php';	
		$conn	=	conecta_bd();
		
		$q = "SELECT  * FROM `lib_oficioexterno`
			  INNER JOIN cat_clasificacion ON cat_clasificacion.id_clasificacion = lib_oficioexterno.id_clasificacion
			  INNER JOIN cat_resolucion ON cat_resolucion.id_resolucion = lib_oficioexterno.id_resolucion
			  INNER JOIN cat_direccion ON cat_direccion.id_direccion = lib_oficioexterno.id_direccion
			  INNER JOIN lib_oficiorespuesta ON lib_oficiorespuesta.id_oficioExterno = lib_oficioExterno.id_oficioExterno
			  INNER JOIN lib_oficiomensajeriaexterno ON lib_oficiomensajeriaexterno.id_oficioExterno = lib_oficioexterno.id_oficioExterno
			  WHERE lib_oficioexterno.usu_id = '$idUsuario'
			  ORDER BY lib_oficiomensajeriaexterno.fechaCierre ASC";

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
			$myArray1 =null;
			$arbol_php = json_encode($myArray1);
			//para guardar en archivo json
			$jsonencoded = json_encode($myArray1,JSON_UNESCAPED_UNICODE);
			$data = str_replace("\\/", "/", $jsonencoded);
			echo $data;
		}
	} 
?>
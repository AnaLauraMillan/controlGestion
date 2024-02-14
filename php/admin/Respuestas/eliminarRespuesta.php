<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST');
header('content-type: application/json; charset=utf-8');

//descomentar cuando ya este en produccion, verifica si el token es uno de los que esta logeado
//require_once '../../../cookie.php';



//si el metodo de entrada no es el apropiado lo rechaza
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(array('status' => false));
    exit;
}

//recibe valores externo 
$data = file_get_contents('php://input');

	if (isset($data)) { 
	//conversion a array
	$data = json_decode($data, true);

	//asignacion de datos en variables
	$id_respuesta = $data['id_respuesta'];
	$id_comentario = $data['id_comentario'];
	$respuesta = $data['respuesta'];
	$autor = $data['autor'];
	
	require_once '../../conecta.php';
				
	$q = "delete from `respuesta` WHERE `id_respuesta` = '$id_respuesta' AND `id_comentario` = '$id_comentario' AND `respuesta` = '$respuesta' AND `autor` = '$autor'";
				
	$conn	=	conecta_bd();
	$result = mysqli_query($conn,$q);
	
	   //dependiendo del resultado de la consulta se manipula el estado y se muestra el mensaje en el modal
		echo json_encode(
		array('status' => true, 'msg' => 'Registro eliminado correctamente', 'id_respuesta' => $id_respuesta)
		);
		exit;
		}





?>
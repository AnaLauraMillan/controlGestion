<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');



require_once '../../conecta.php';

//si el metodo de entrada no es el apropiado lo rechaza
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(array('status' => false));
    exit;
}

//recibe valores externo 
$dat = file_get_contents('php://input');
//echo $data = file_get_contents("php://input");
$datos = json_decode($dat, true);

if($datos){

	
	
	$id_comentario = $datos['id_comentario'];
	$id_respuesta = $datos['id_respuesta'];
	$autorizacion = $datos['autorizacion'];
	$autor = $datos['autor'];
	
	
	$conn	=	conecta_bd();
	
	
	$query_busqueda1 = "SELECT * FROM `respuesta` WHERE `id_respuesta` = '$id_respuesta' AND `id_comentario`='$id_comentario' AND `autor` ='$autor';";
    $res_query1_b1 = mysqli_query($conn, $query_busqueda1);
	
	if ($res_query1_b1 && mysqli_num_rows($res_query1_b1) > 0){
		
		$fila_respuesta = mysqli_fetch_assoc($res_query1_b1);
        $id_fcomentario= $fila_respuesta['id_comentario'];
		$id_frespuesta =$fila_respuesta['id_respuesta'];
		
		
			$query_update = "UPDATE `respuesta` SET `autorizacion`='$autorizacion' WHERE id_respuesta = '$id_frespuesta' AND id_comentario = '$id_fcomentario'";
			$res_query_update = mysqli_query($conn, $query_update);
			
			
		
		
	}else{
		echo "No se encontró ningun comentario con el id '$id_respuesta'.";
    }		
}
?>

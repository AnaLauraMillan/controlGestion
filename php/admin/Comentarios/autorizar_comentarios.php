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

	
	
	$id_articulo = $datos['id_articulo'];
	$id_comentario = $datos['id_comentario'];
	$autorizacion = $datos['autorizacion'];
	$autor = $datos['autor'];
	
	
	$conn	=	conecta_bd();
	
	
	$query_busqueda1 = "SELECT * FROM `comentario` WHERE `id_articulo` = '$id_articulo' AND `id_comentario`='$id_comentario' AND `autor` ='$autor';";
    $res_query1_b1 = mysqli_query($conn, $query_busqueda1);
	
	if ($res_query1_b1 && mysqli_num_rows($res_query1_b1) > 0){
		
		$fila_comentario = mysqli_fetch_assoc($res_query1_b1);
        $id_fcomentario= $fila_comentario['id_comentario'];
		$id_farticulo =$fila_comentario['id_articulo'];
		
		
			$query_update = "UPDATE `comentario` SET `autorizacion`='$autorizacion' WHERE id_comentario = '$id_fcomentario' AND id_articulo = '$id_farticulo'";
			$res_query_update = mysqli_query($conn, $query_update);
			
			
		
		
	}else{
		echo "No se encontró ningun comentario con el id '$id_comentario'.";
    }		
}
?>

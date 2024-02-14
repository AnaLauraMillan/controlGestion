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
	$id_articulo = $data['id_articulo'];
	$id_comentario = $data['id_comentario'];
	$comentario = $data['comentario'];
	$autor = $data['autor'];
	
	require_once '../../conecta.php';
				
	//$q = "delete from `comentario` WHERE `id_articulo` = '$id_articulo' AND `id_comentario` = '$id_comentario' AND `comentario` = '$comentario' AND `autor` = '$autor'";
				
	$conn	=	conecta_bd();
	
	
	
	// Verificar si existen respuestas asociadas al comentario
    $check_respuestas_query = "SELECT COUNT(*) FROM `respuesta` WHERE `id_comentario` = '$id_comentario'";
    $result_check_respuestas = mysqli_query($conn, $check_respuestas_query);

    if ($result_check_respuestas) {
        $row = mysqli_fetch_assoc($result_check_respuestas);
        $respuestaCount = (int) $row['COUNT(*)'];

        if ($respuestaCount > 0) {
            // Si hay respuestas, eliminarlas primero
            $delete_respuestas_query = "DELETE FROM `respuesta` WHERE `id_comentario` = '$id_comentario'";
            $result_respuestas = mysqli_query($conn, $delete_respuestas_query);

            if (!$result_respuestas) {
                echo json_encode(
                    array('status' => false, 'msg' => 'Error al eliminar las respuesta')
                );
                exit;
            }
        }
    }

    // Eliminar el comentario
    $delete_comentario_query = "DELETE FROM `comentario` WHERE `id_articulo` = '$id_articulo' AND `id_comentario` = '$id_comentario' AND `comentario` = '$comentario' AND `autor` = '$autor'";
    $result_comentario = mysqli_query($conn, $delete_comentario_query);

    if ($result_comentario) {
        echo json_encode(
            array('status' => true, 'msg' => 'Registro eliminado correctamente', 'id_articulo' => $id_articulo)
        );
    } else {
        echo json_encode(
            array('status' => false, 'msg' => 'Error al eliminar el comentario')
        );
    }

    exit;
}





?>
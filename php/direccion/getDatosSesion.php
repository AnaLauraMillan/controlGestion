<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');


//require_once '../../cookie.php';
require_once '../conecta.php';

//si el metodo de entrada no es el apropiado lo rechaza
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(array('status' => false));
    exit;
}

//recibe valores externo 
$dat = file_get_contents('php://input');
$datos = json_decode($dat, true);

if($datos){

	$conn	=	conecta_bd();
	$token =  $datos['token']; //'1IQ6YCX7FNJDGT4UR3B8';//'HQRB1W429CM3ZY57XINF';

	//Se válida que el parámetro no lleve comillas simples o dobles y si las tiene las convierte en cadena de texto
	$Token = mysqli_real_escape_string($conn, $token);
	
	// Consulta parámetrizada
	$q= "SELECT * FROM `inicio_sesion` WHERE token= ? ";
	$stmt = $conn->prepare($q);

	if (!$stmt) {
		die("Error en la preparación de la declaración: " . $conn->error);
	}

	// Vincular los parámetros a la consulta SQL
	$stmt->bind_param("s",$Token);

	if($stmt->execute()){
		
		$result = $stmt->get_result();

		if ($result && mysqli_num_rows($result) > 0 ) 
		{
			$fila0 = mysqli_fetch_assoc($result);
			$id_usuario = $fila0['usu_id'];	

			$qIComp ="SELECT usu_id, id_perfil, usu_nombre, usu_pass, usuarios.id_direccion, cat_direccion.direccion
					  FROM `usuarios` 
					  INNER JOIN cat_direccion on cat_direccion.id_direccion = usuarios.id_direccion
					  WHERE usu_id = '$id_usuario'";
					  
			$result2 = mysqli_query($conn,$qIComp);
	
			if($result2 -> num_rows){
				while($row = $result2->fetch_array(MYSQLI_ASSOC)) 
				{
				 $myArray[] = $row;
				}
				desconectar_bd($conn);
				//para mostrar en navegador
				$arbol_php = json_encode($myArray);
				//para guardar en archivo json
				$jsonencoded = json_encode($myArray,JSON_UNESCAPED_UNICODE);
				$data = str_replace("\\/", "/", $jsonencoded);
				echo $data;
				$stmt->close();
			} else {
				echo $validUsu = 'false';
				$stmt->close();
			}
		} 
		else 
		{
		  echo 'no se encontraron registros';
		  $validUsu = 'false';
		}
	}
} 
?>
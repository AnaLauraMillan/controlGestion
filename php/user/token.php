<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');

//recibe valores externo en formato json
$data = file_get_contents('php://input');

if(!$data){
  echo "No hay datos";
}else{
  //conversion a array
  $data = json_decode($data, true);
  //asignacion de datos en variables
  $usuario = $data['correo'];
  $token = $data['token'];


  include '../conecta.php';
    $q = "SELECT  usu_login, token, usu_nombre, home, DATE_FORMAT(CURDATE(), '%m- %d')  as fecha  FROM usuarios
    INNER JOIN inicio_sesion ON inicio_sesion.usu_id = usuarios.usu_id
    INNER JOIN cat_perfil ON usuarios.id_perfil = cat_perfil.id_perfil 
    WHERE  DATE_FORMAT(CURDATE(), '%m- %d')  = DATE_FORMAT(fech_reg, '%m- %d') AND BINARY usu_login = '".$usuario."' AND BINARY token = '".$token."' ;";

  
  $conn	=	conecta_bd();
  if ($result = mysqli_query($conn,$q)) {
    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
      $myArray = $row;
    }
  }

  desconectar_bd($conn);

  $jsonencoded = json_encode($myArray,JSON_UNESCAPED_UNICODE);
  $data = str_replace("\\/", "/", $jsonencoded);
  echo $data;
}
	


?>
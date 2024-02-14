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
  $correo = $data['correo'];
  $token = $data['token'];

  //$correo = 'raul.dmai';
  //$token = '2KU4WE9S3QI7LB568GXT';




  include '../conecta.php';
  $q = "SELECT  *  FROM usuarios
  INNER JOIN inicio_sesion ON inicio_sesion.usu_id = usuarios.usu_id
  WHERE  DATE_FORMAT(CURDATE(), '%m- %d')  = DATE_FORMAT(fech_reg, '%m- %d') AND BINARY usu_login = '".$correo."' AND token = '".$token."';";
  $conn	=	conecta_bd();
  $myArray;
  $myArray2;
  
  if ($result = mysqli_query($conn,$q)) {
    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
      $myArray = $row;
    }
     
    //encuentra datos
    if($myArray['usu_id']){
      $qi = "DELETE FROM inicio_sesion WHERE id_inicio_sesion = ".$myArray['id_inicio_sesion']." and  token  = '".$token."'";
      if ( $resulti = mysqli_query($conn,$qi) ) {
        $myArray2 = ['mensaje' => 'Datos eliminados'];
      }
    }
  }

  desconectar_bd($conn);
  $jsonencoded = json_encode( $myArray2 ,JSON_UNESCAPED_UNICODE);
  $data = str_replace("\\/", "/", $jsonencoded);
  echo $data;
  
}  

  
  
	

?>
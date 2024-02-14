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
  $data = json_decode($data, true);
  
  $correo = $data['correo'];
  $password = $data['password'];
  $token = $data['token'];

  /*$correo = 'raul.dmai';
  $password = '123456';
  $token = '';*/


  include '../conecta.php';
  $conn	=	conecta_bd();
  $myArray;
  $myArray2;
  $myArray3;

  // Sentencia Preparada, evitar sql injection
  $stmt = $conn->prepare("SELECT * FROM usuarios WHERE BINARY usu_login = ? AND BINARY usu_pass = ? ");
  // ss significa el tipo de parametro que se pasa a la consulta en este caso son dos string
  $stmt->bind_param("ss",$correo, $password);
  //ejecuta la sentencia preprada
  $stmt->execute();
  //prepara los datos arrojados de la consulta
  $resultado = $stmt->get_result();
  
  if($resultado->num_rows < 1){
    //echo "sin valores"; 
  }else{
    while($row = $resultado->fetch_assoc()){
      $myArray = $row;
    }
    
      //encuentra datos
      if($myArray['usu_id']){

        if(!$token){

          $q3 = "SELECT  count(*) as num_ses  FROM usuarios
          INNER JOIN inicio_sesion ON inicio_sesion.usu_id = usuarios.usu_id
          WHERE  DATE_FORMAT(CURDATE(), '%m- %d')  = DATE_FORMAT(fech_reg, '%m- %d') AND usu_login = '".$myArray['usu_login']."';";
    
          //encuentra datos con fecha de hoy
          if ( $result3 = mysqli_query($conn,$q3) ) {
            
            while($row3 = $result3->fetch_array(MYSQLI_ASSOC)) {
              $myArray3 = $row3;
            }
            //echo $myArray3['num_ses'];
            //si no existen valores inserta nuevo registro

            if($myArray3['num_ses'] < 2){
              //genera nueva sesion
              $ntoken = generate_token();
              $qi = "INSERT INTO inicio_sesion ( usu_id, token ) VALUES (".$myArray['usu_id'].",'".$ntoken."')";
              if ( $resulti = mysqli_query($conn,$qi) ) {

                $q2 = "SELECT  usu_login, token, usu_nombre, home, DATE_FORMAT(CURDATE(), '%m- %d')  as fecha  FROM usuarios
                INNER JOIN inicio_sesion ON inicio_sesion.usu_id = usuarios.usu_id
                INNER JOIN cat_perfil ON usuarios.id_perfil = cat_perfil.id_perfil
                WHERE  DATE_FORMAT(CURDATE(), '%m- %d')  = DATE_FORMAT(fech_reg, '%m- %d') AND usu_login = '".$myArray['usu_login']."' AND token = '".$ntoken."';";

                if ( $result2 = mysqli_query($conn,$q2) ) {
                  while($row2 = $result2->fetch_array(MYSQLI_ASSOC)) {
                    $myArray2 = $row2;
                  }
                }
    
              }
              
            }
            
            
          }

        }else{
          
          $q2 = "SELECT  usu_login, token, usu_nombre, home, DATE_FORMAT(CURDATE(), '%m- %d')  as fecha  FROM usuarios
          INNER JOIN inicio_sesion ON inicio_sesion.usu_id = usuarios.usu_id
          INNER JOIN cat_perfil ON usuarios.id_perfil = cat_perfil.id_perfil
          WHERE  DATE_FORMAT(CURDATE(), '%m- %d')  = DATE_FORMAT(fech_reg, '%m- %d') AND usu_login = '".$myArray['usu_login']."' AND token = '".$token."';";
          if ( $result2 = mysqli_query($conn,$q2) ) {

            while($row2 = $result2->fetch_array(MYSQLI_ASSOC)) {
              $myArray2 = $row2;
            }

          }

        }
  
        desconectar_bd($conn);
        $jsonencoded = json_encode( $myArray2 ,JSON_UNESCAPED_UNICODE);
        $data = str_replace("\\/", "/", $jsonencoded);
        echo $data;
        
  
      }

    


  }
  // Cerramos la sentencia preparada
  $stmt->close();
  
}  

function generate_token(){
    $permitted_chars = '123456789ABCDEFGHIJKLMNPQRSTUVWXYZ';
    $aln = substr(str_shuffle($permitted_chars), 0, 20);
    return $aln;
}
  
  
	

?>
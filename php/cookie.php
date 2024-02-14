<?php
if(!tokens()){
  echo "algo surgio mal";
  return exit;
}

function tokens(){
  //nombre de las cookies
  $cookie_name = "_nameDGB23H9M";
  $cookie_id = "_idDGB23H9M";
  $cookie_fecha = "_fechaDGB23H9M";
  $cookie_user = "_userDGB23H9M";
  
  if(isset($_COOKIE[$cookie_name]) && isset($_COOKIE[$cookie_id]) && isset($_COOKIE[$cookie_fecha])) {
    //asignacion de variables
    $usuario = $_COOKIE[$cookie_name];
    $token = $_COOKIE[$cookie_id];
    $fecha = [$cookie_fecha];
    $user = $_COOKIE[$cookie_user];
    //conexion
    include 'conecta.php';
    //query
    $q = "SELECT  usu_login, token, usu_nombre, home, DATE_FORMAT(CURDATE(), '%m- %d')  as fecha  FROM usuarios
    INNER JOIN inicio_sesion ON inicio_sesion.usu_id = usuarios.usu_id
    INNER JOIN cat_perfil ON usuarios.id_perfil = cat_perfil.id_perfil 
    WHERE  DATE_FORMAT(CURDATE(), '%m- %d')  = DATE_FORMAT(fech_reg, '%m- %d') AND usu_login = '".$user."' AND token = '".$token."' ;";
    //conexion
    $conn	=	conecta_bd();
    //resultado
    $result = mysqli_query($conn,$q);
    //numero de registros
    $row_cnt = mysqli_num_rows($result);

    if ($row_cnt) {
      return true;
    }else{
      return false;
    }
  
  } 
  return false;

}
?>
<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');

//require_once '../../cookie.php';
require_once '../conecta.php';

$q = "SELECT * FROM `cat_direccion` WHERE direccion != 'otro'";
  
$conn	=	conecta_bd();
$result = mysqli_query($conn,$q);

  if ($result->num_rows) 
  {
	while($row = $result->fetch_array(MYSQLI_ASSOC)) 
	{
	  $myArray[] = $row;
	}
	desconectar_bd($conn);

	$arbol_php = json_encode($myArray);
	//para guardar en archivo json
	$jsonencoded = json_encode($myArray,JSON_UNESCAPED_UNICODE);
	$data = str_replace("\\/", "/", $jsonencoded);
	echo $data;
  } 
  else 
  {
	$myArray1 = null;
	$arbol_php = json_encode($myArray1);
	$jsonencoded = json_encode($myArray1,JSON_UNESCAPED_UNICODE);
	$data = str_replace("\\/", "/", $jsonencoded);
	echo $data;
  }
?>
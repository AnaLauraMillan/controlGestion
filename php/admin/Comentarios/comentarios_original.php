<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');

$dat = file_get_contents('php://input');
$datos = json_decode($dat, true);


if($datos){
	
	
	$id_articulo = $datos['id_articulo'];

  $q = "
  SELECT comentario.*, articulo.nombre_articulo, COUNT(respuesta.id_respuesta) as total_respuestas
    FROM comentario
    JOIN articulo ON comentario.id_articulo = articulo.id_articulo
    LEFT JOIN respuesta ON comentario.id_comentario = respuesta.id_comentario
    WHERE comentario.id_articulo = $id_articulo
    GROUP BY comentario.id_comentario
  ";
  
  $q = $q ." ORDER BY `fecha_comentario` DESC;";
  

  include '../../conecta.php';
  $conn	=	conecta_bd();
  $result = mysqli_query($conn,$q);
  if ($result->num_rows) {
    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
      $row['fecha_comentario'] = date('d/m/Y', strtotime($row['fecha_comentario']));
      $myArray[] = $row;
    }
    desconectar_bd($conn);

    $arbol_php = json_encode($myArray);

    $jsonencoded = json_encode($myArray,JSON_UNESCAPED_UNICODE);
    $data = str_replace("\\/", "/", $jsonencoded);
    echo $data;
  }else{
    $myArray1 = null;
	desconectar_bd($conn);

    $arbol_php = json_encode($myArray1);

    $jsonencoded = json_encode($myArray1,JSON_UNESCAPED_UNICODE);
    $data = str_replace("\\/", "/", $jsonencoded);
    echo $data;
  }

}

?>

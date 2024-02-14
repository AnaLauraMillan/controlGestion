<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');

require_once '../../conecta.php';

$conn = conecta_bd();

$q = "SELECT a.*, COUNT(c.id_comentario) AS total_comentarios 
      FROM articulo a
      LEFT JOIN comentario c ON a.id_articulo = c.id_articulo
      GROUP BY a.id_articulo ORDER BY fecha_publicacion DESC";

$result = mysqli_query($conn, $q);

if ($result && mysqli_num_rows($result) > 0) {
    $myArray = array();
    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
        // Cambiar el formato de la fecha
        $row['fecha_publicacion'] = date('d/m/Y', strtotime($row['fecha_publicacion']));
        $myArray[] = $row;
    }
    desconectar_bd($conn);
    //para mostrar en navegador
    $arbol_php = json_encode($myArray);
    //para guardar en archivo json
    $jsonencoded = json_encode($myArray, JSON_UNESCAPED_UNICODE);
    $data = str_replace("\\/", "/", $jsonencoded);
    echo $data;
} else {
    echo 'no se encontraron registros';
}
?>

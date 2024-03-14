<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');

//require_once '../../cookie.php';

//si el metodo de entrada no es el apropiado lo rechaza
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(array('status' => false));
    exit;
}

//recibe valores externo 
$dat = file_get_contents('php://input');

$datos = json_decode($dat, true);

	if($datos){

		$idGPB = $datos['id'];
		
		require_once '../../../conecta.php';	
		$conn	=	conecta_bd();
		
		$QSub = "SELECT * FROM `cat_submodulo` WHERE estado = 0  AND nombre_submodulo = 'Clasificación indicativa'";
		$resultSub = mysqli_query($conn,$QSub);

		if($resultSub &&  mysqli_num_rows($resultSub) > 0) {
			$q = " SELECT lib_gestion_pb.id_gestion_pb,lib_gestion_pb.id_perfil_bib, lib_perfil_bib.perfil_bib, cat_plantilla_biblio.id_plantilla_biblio, 
							cat_plantilla_biblio.nom_plantilla, lib_gestion_pb.nombre_biblioteca, cat_tipo_biblioteca.id_tipo_biblioteca , cat_tipo_biblioteca.tipo_biblioteca
					FROM lib_perfil_bib 
					INNER JOIN lib_gestion_pb ON lib_perfil_bib.id_perfil_bib = lib_gestion_pb.id_perfil_bib 
					INNER JOIN cat_plantilla_biblio ON lib_gestion_pb.id_plantilla_biblio = cat_plantilla_biblio.id_plantilla_biblio 
					INNER JOIN cat_tipo_biblioteca ON lib_gestion_pb.id_tipo_biblioteca = cat_tipo_biblioteca.id_tipo_biblioteca 
					WHERE lib_gestion_pb.id_gestion_pb = '$idGPB'
					ORDER BY  lib_gestion_pb.id_perfil_bib ASC";

					$result = mysqli_query($conn,$q);

					if ($result->num_rows) 
					{
						while($row = $result->fetch_array(MYSQLI_ASSOC)) 
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
					} 
					else 
					{
						$myArray1 =null;
						$arbol_php = json_encode($myArray1);
						//para guardar en archivo json
						$jsonencoded = json_encode($myArray1,JSON_UNESCAPED_UNICODE);
						$data = str_replace("\\/", "/", $jsonencoded);
						echo $data;
					}
		}
	} 
?>
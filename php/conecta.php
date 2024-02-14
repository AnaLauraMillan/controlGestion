<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


function conecta_bd(){
	$servidor = "localhost"; //server 1
	$usuario = "root";  //usario de la base de datos
	//$clave = "Xr24*@z3"; // passwoord de la base de datos server 1
	$clave = ""; // passwoord de la base de datos server 2
	$bd = "db_controlgestion";

	$conn=mysqli_connect($servidor,$usuario,$clave, $bd);

	if(mysqli_connect_errno()){
		echo mysqli_connect_error();
		exit(0);
	}
	# Seleccion de BD
	return $conn;
}
function desconectar_bd($enlace){
	mysqli_close($enlace);
};
?>

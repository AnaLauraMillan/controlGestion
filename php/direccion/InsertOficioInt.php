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

// $datos = array (
//    'IdOficio'=>"2",
//    'idClas'=>"2",
//    'idDir'=>"9",
//    'idRes'=> 1,
//    'numOficio'=>"DMAI/02/24",
//    'remi'=>"DMAI",
//    'dest'=>"1",
//    'otroDest' => "",
//    'fDoc'=>"2024-02-13",
//    'fenvio'=>"2024-02-15",
//    'asunto'=>"Interactivos",
//    'anexos'=> NULL,
//    'obs'=>"sin observaciones",
//    'bturno'=> "1",
//    'fTurno'=>"2024-02-16",
//    'archivoEnt'=> "C:/xampp/htdocs/Programas/controlGestion/src/assets/Direccion/OficioInterno/COMPROBANTE_DOMICILIO_ANA_LAURA_MILLÁN_OLIVARES.pdf",
//    'Idusu'=>"49",
//    'idTO'=> "1",
// );

if($datos) {

   $conn	=	conecta_bd();
   //Variables
   $IdOficio = $datos['IdOficio'];
   $idClas = $datos['idClas'];
   $idDir = $datos['idDir'];
   $idRes = $datos['idRes'];
   $numOficio = $datos['numOficio'];
   $remi = $datos['remi'];
   $dest = $datos['dest'];
   $otroDest = $datos ['otroDest'];
   $fDoc = $datos['fDoc'];
   $fenvio = $datos['fenvio'];
   $asunto = $datos['asunto'];
   $anexos = $datos['anexos'];
   $obs = $datos['obs'];
   $bturno = $datos['bturno'];
   $fTurno = $datos['fTurno'];
   $archivoEnt = $datos['archivoEnt'];
   $Idusu = $datos['Idusu'];
   $idTO = $datos['idTO'];
   $intDestino = '';
   $otroDestino = '';

   $numOficioE = mysqli_real_escape_string($conn, $numOficio);
   $remiE = mysqli_real_escape_string($conn, $remi);
   $ODE = mysqli_real_escape_string($conn, $otroDest);
   $asuntoE = mysqli_real_escape_string($conn, $asunto);
   $obsE = mysqli_real_escape_string($conn, $obs);

   // Se busca el destino dependiendo de lo que se haya ingresado
   if($ODE != '') {  
      $intDestino = 0;  
      $otroDestino = $ODE; 
   }
   else {
      $intDestino = $dest; 
      $qD = "SELECT * FROM `cat_direccion` WHERE id_direccion = $dest";
      $resultD = mysqli_query($conn, $qD);
      if($resultD && mysqli_num_rows($resultD) > 0) {
         $fila = mysqli_fetch_assoc($resultD);
         $otroDestino = $fila['Siglas'];
      }
   }

   if($anexos == NULL) {

      $qverExist = "SELECT * FROM `lib_oficiointerno`
      WHERE `num_oficioInterno` = '$numOficioE' and `remitenteInt` = '$remiE' and `destino` = '$otroDestino' and `fechaDocumentoInt` = '$fDoc' and `usu_id` = '$Idusu'";

      $resultVerifica = mysqli_query($conn, $qverExist);

         if($resultVerifica && mysqli_num_rows($resultVerifica) > 0){
         echo json_encode(
         array('status' => false, 'msg' => 'Este oficio ya se ha registrado', 'num_oficioInterno' => $numOficio));
         exit;
      } 
      else 
      {
         $qOfiInt = "INSERT INTO `lib_oficiointerno`(`id_oficioInterno`, `id_oficio`, `id_clasificacion`, `id_direccion`, `id_resolucion`, `num_oficioInterno`, `remitenteInt`, `destinatarioInt`, `destino`, `fechaDocumentoInt`, `fechaEnvio`, `asuntoInt`, `anexosInt`, `observacionesInt`, `turnadoInt`, `fechaTurnadoInt`, `archivoEntradaInt`, `usu_id`, `id_tipOficio`) 
                     VALUES ('','$IdOficio','$idClas','$idDir','$idRes','$numOficioE','$remiE','$intDestino', '$otroDestino' ,'$fDoc','$fenvio','$asuntoE','','$obsE','$bturno','$fTurno','$archivoEnt','$Idusu','$idTO')";

         $result = mysqli_query($conn, $qOfiInt);

         if ($result){
         echo json_encode(
         array('status' => true, 'msg' => 'Registro agregado correctamente', 'num_oficioInterno' => $numOficio));
         exit;
         }
      }
      desconectar_bd($conn);
   }
   else {

      $numOficioE = mysqli_real_escape_string($conn, $numOficio);
      $remiE = mysqli_real_escape_string($conn, $remi);
      $destE = mysqli_real_escape_string($conn, $dest);
      $asuntoE = mysqli_real_escape_string($conn, $asunto);
      $anexosE = mysqli_real_escape_string($conn, $anexos);
      $obsE = mysqli_real_escape_string($conn, $obs);

      $qverExist = "SELECT * FROM `lib_oficiointerno`
      WHERE `num_oficioInterno` = '$numOficioE' and `remitenteInt` = '$remiE' and `destino` = '$otroDestino' and `fechaDocumentoInt` = '$fDoc' and `usu_id` = '$Idusu'";

      $resultVerifica = mysqli_query($conn, $qverExist);

         if($resultVerifica && mysqli_num_rows($resultVerifica) > 0){
         echo json_encode(
         array('status' => false, 'msg' => 'Este oficio ya se ha registrado', 'num_oficioInterno' => $numOficio));
         exit;
      } 
      else 
      {
         $qOfiInt = "INSERT INTO `lib_oficiointerno`(`id_oficioInterno`, `id_oficio`, `id_clasificacion`, `id_direccion`, `id_resolucion`, `num_oficioInterno`, `remitenteInt`, `destinatarioInt`, `destino`, `fechaDocumentoInt`, `fechaEnvio`, `asuntoInt`, `anexosInt`, `observacionesInt`, `turnadoInt`, `fechaTurnadoInt`, `archivoEntradaInt`, `usu_id`, `id_tipOficio`) 
                     VALUES ('','$IdOficio','$idClas','$idDir','$idRes','$numOficioE','$remiE','$intDestino','$otroDestino','$fDoc','$fenvio','$asuntoE','$anexosE','$obsE','$bturno','$fTurno','$archivoEnt','$Idusu','$idTO')";

         $result = mysqli_query($conn, $qOfiInt);

         if ($result){
         echo json_encode(
         array('status' => true, 'msg' => 'Registro agregado correctamente', 'num_oficioInterno' => $numOficio));
         exit;
         }
      }
      desconectar_bd($conn);
   }
}
?>
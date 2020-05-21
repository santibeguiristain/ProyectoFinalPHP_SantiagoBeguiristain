<?php
 
  
  session_start();
  require('c_Propiedades.php');
  require('library.php');
 
  
  
   
  $data= array();
  

  
  if($_POST){
      
    $action = $_POST['action'];
    
    if($action == 'listarPropiedades'){
        $data = getData();
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }
    else if($action == 'cargarCiudadesFiltro'){
        $arrayCiudades = cargarCiudadesFiltro();
        echo json_encode($arrayCiudades,JSON_UNESCAPED_UNICODE);
    }
    else if($action == 'cargarTiposFiltro'){
        $arrayTipos = cargarTiposFiltro();
        echo json_encode($arrayTipos,JSON_UNESCAPED_UNICODE);
    }
     else if($action == 'realizarBusqueda'){
        $precioMin= $_POST['min']; 
        $precioMax= $_POST['max']; 
        $ciudad = $_POST['ciudad'];
        $tipo = $_POST['tipo'];
        
        $arrayPropiedades= buscarPropiedadFiltro($precioMin,$precioMax,$ciudad,$tipo);
        echo json_encode($arrayPropiedades,JSON_UNESCAPED_UNICODE);
    }
    exit;
  }
 
   
   
   
   
 
 ?>


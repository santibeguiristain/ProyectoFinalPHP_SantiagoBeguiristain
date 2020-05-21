<?php

 function getData(){
    $data_file = fopen("./data/propiedades.json","r"); //Solo lectura
    $data_readed = fread($data_file, filesize("./data/propiedades.json"));
    $data = json_decode($data_readed, true);
    fclose($data_file);
    return $data;
  }
   
function listarPropiedades($data){
  //Devuelve las propiedades
  foreach ($data as $product) {
    echo '<pre>';
      print_r($product);
   echo '</pre>';
   }
}

function cargarCiudadesFiltro()
{
  $data = getData();
  $ciudad="";
  $resultCiudades=array();
 
  foreach ($data as $key => $value) {
    $ciudad=$value['Ciudad'];
    if(!(in_array($ciudad, $resultCiudades)))//si no existe en el array  lo agrego, EVITO REPETIDOS.
    {
      array_push($resultCiudades, $ciudad);
    }
  }
 return $resultCiudades;
}

function cargarTiposFiltro(){
  $data = getData();
  $tipo="";
  $resultTipos=array();
 
foreach ($data as $key => $value) {
   $tipo=$value['Tipo'];
   if(!(in_array($tipo, $resultTipos))){
      array_push($resultTipos, $tipo);
   }
 }
 return $resultTipos;
}

function buscarPropiedadFiltro($min,$max,$ciudad,$tipo){
  $data = getData();
  $resultProp=array();
  $precioMin = intval($min);
  $precioMax = intval($max);
  
 
  
  foreach ($data as $value) {
      $precioPropiedad = obtenerMontoPropiedad ($value);
      $ciudadPropiedad = $value['Ciudad'];
      $tipoPropiedad = $value['Tipo'];
      $agregar = false;
     
      
       if ($precioPropiedad >= $precioMin && $precioPropiedad <= $precioMax){
            $agregar = true;
        }    
        
        if($ciudad !== '')
        {
            if($ciudad !== $ciudadPropiedad) {
                $agregar = false;
            }    
        }
        
        if($tipo !== '')
        {
            if ($tipo !== $tipoPropiedad){
               $agregar = false;  
            }    
        }
        
        if($agregar==true){
             array_push($resultProp, $value);   
             $agregar = false;
         }
   }
 return $resultProp;
}

function obtenerMontoPropiedad ($value)
{ 
    //Quitar $
    $precioPropiedad = $value['Precio'];
    if($precioPropiedad[0] ==='$'){
        $cantCaract = strlen ($precioPropiedad);
        $cantCaract = $cantCaract - 1; //Devolveremos todos los caracteres menos el $
        $precioPropiedad = substr($precioPropiedad, - $cantCaract);    
    }
    
     
     //Quitar coma ","
      $precioPropiedad = str_replace ( ",", '', $precioPropiedad);
     
    return $precioPropiedad;
}

 
   
 ?>


 
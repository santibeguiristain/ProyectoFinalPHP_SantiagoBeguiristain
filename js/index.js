
$(document).ready(function() {
   funcPropiedades('cargarCiudadesFiltro');
   funcPropiedades('cargarTiposFiltro');
   manejoVisibilidadBotones(false);
});

 
$( "#btnMostrarTodos" ).click(function() {
   
   funcPropiedades('listarPropiedades');
   manejoVisibilidadBotones(true);
});

$("#btnRefresh" ).click(function() {
     location.reload(true);  
      manejoVisibilidadBotones(false);
     
 
});


function manejoVisibilidadBotones(busqueda)
{
    if(busqueda === true)
    {
        $("#btnRefresh").show();
        $("#btnMostrarTodos").hide();
        $("#btnBuscar").hide();
    }else
    {
        $("#btnRefresh").hide();
        $("#btnMostrarTodos").show();
        $("#btnBuscar").show();
    }
}

$( "#btnBuscar" ).click(function() {
    
   var action = 'realizarBusqueda';
   var min = $("#precioMin").val();
   var max = $("#precioMax").val();
   var tipo = $("#comboTipo option:selected").text();
   var ciudad = $("#comboCiudad option:selected").text();
    
  
            
   if(min < 0 || max <= min){
        alert('Verificar filtro precio');
   }else{ 
       var data = funcDataFiltros(action,min,max,tipo,ciudad);
       funcBusqueda(data);
        manejoVisibilidadBotones(true);
   }
});



function funcPropiedades(action)
{  
     $.ajax({
            url: './index.php',
            type: 'POST',
            dataType: "text",
            async: true,
            data: {
                action:action
            },
            beforeSend: function(){
               
            },
             success: function(response){              
                if(action === "listarPropiedades"){ 
                    var obj = JSON.parse(response);
                    listarPropiedadesHtml(obj);
                 }
                 else if(action === "cargarCiudadesFiltro")
                 {
                    var arrayCiud = JSON.parse(response);
                    cargarFiltroCiudades(arrayCiud);                  
                 }
                 else if(action === "cargarTiposFiltro")
                 { 
                    
                    var arrayTipo = JSON.parse(response);
                    cargarFiltroTipos(arrayTipo);                  
                 }
                 
            },
            error: function(){
              console.log('estas en el errro js');
            }
          });
}

 

function cargarFiltroCiudades(arrayCiud){
     var combo  = "<div><select class='form-control form-control-sm'>"
      combo += "<option>Elige una opción</option>"
      
     for(i=0; i < arrayCiud.length; i++){
        combo += "<option value='" +arrayCiud[i] +"'>" +  arrayCiud[i] + "</option>"
     }      
     combo += "</select></div>" 
    
     var btn = document.createElement("DIV");
         btn.innerHTML=combo;
     document.getElementById("comboCiudad").appendChild(btn);
    
 
}

function cargarFiltroTipos(arrayTipo){
     var combo  = "<div><select class='form-control form-control-sm'>"
      combo += "<option>Elige una opción</option>"
      
     for(i=0; i < arrayTipo.length; i++){
        combo += "<option value='" +arrayTipo[i] +"'>" +  arrayTipo[i] + "</option>"
     }      
     combo += "</select></div>" 
    
     var btn = document.createElement("DIV");
         btn.innerHTML=combo;
     document.getElementById("comboTipo").appendChild(btn);
    
 
}


function funcBusqueda(data){  
     $.ajax({
            url: './index.php',
            type: 'POST',
            dataType: "text",
            async: true,
            data:data ,
            beforeSend: function(){},
            success: function(response){   
                 
                  if(data.action === "realizarBusqueda"){ 
                    var arrayPropFiltrada = JSON.parse(response);
                  
                    listarPropiedadesHtml(arrayPropFiltrada);
                  }
                   
            },
            error: function(){
              console.log('estas en el errro js');
            }
          });
}

function listarPropiedadesHtml(arrayPropFiltrada){
    
    for(i=0; i < arrayPropFiltrada.length; i++){
      var fila = "<div class='row mb-12' id='plantilla'>\n\
                     <div class='col-3'>\n\
                        <img src='img/home.jpg' width='245' height='245'>\n\
                     </div>\n\
                     <div class='col-7'>\n\
                        <div class='row mb-12'>\n\
                            <div>\n\
                               <p><b>Ciudad:    </b><label id='ciudad'>"+arrayPropFiltrada[i].Ciudad+" </label></p>\n\
                               <p><b>Direccion:    </b><label id='ciudad'>"+arrayPropFiltrada[i].Direccion+" </label></p>\n\
                               <p><b>Telefono:    </b><label id='telefono'>"+arrayPropFiltrada[i].Telefono+" </label>\n\
                               </p><p><b>Codigo Postal:    </b><label id='codPostal'>"+arrayPropFiltrada[i].Codigo_Postal+"</label></p>\n\
                               <p><b>Tipo:    </b><label id='tipo'>"+arrayPropFiltrada[i].Tipo+"</label></p>\n\
                               <p><b>Precio:    </b><label id='precio'>"+arrayPropFiltrada[i].Precio+"</label></p>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>"    
       
        var btn = document.createElement("DIV");   
        btn.innerHTML=fila;
        document.getElementById("plantillas").appendChild(btn);
     }   
}
 
function  funcDataFiltros(action,min,max,tipo,ciudad)
{
     
        var data;       
        if(tipo === 'Elige una opción'){
            tipo='';
        }
        if(ciudad === 'Elige una opción') {
            ciudad = '';
        }
        
        data =  {
                  action:action,
                  min:min,
                  max:max,
                  ciudad:ciudad,
                  tipo:tipo
                }
       return data;
}


 
let a, b, c, d, e, f, g, h, i, j, k, l;
let selPump, cotType=3, pyct={}, descValido, modalContent;


fetch('datos.json')
  .then(response => response.json())
  .then(jsonData => {
    const ltsSelect = document.getElementById('ltsSelect');
    const vendSelect = document.getElementById('vendSelect');
    const input6 = document.getElementById('input6');
    const temp = document.getElementById('check0');
            
// Populate the select options
jsonData.bomSol.bombas.forEach(bomba => {
  const option = document.createElement('option');
  option.value = bomba.lts;
  option.text = bomba.lts+" lt/s";
  ltsSelect.appendChild(option);
});
jsonData.bomSol.vendedores.forEach(vend => {
  const option = document.createElement('option');
  option.value = vend.nombre;
  option.text = vend.nombre;
  vendSelect.appendChild(option);
});
pyct.rep= selectVend(jsonData.bomSol.vendedores);

input6.addEventListener('blur', () => {
selPump=datosBomba(jsonData);
pyct.motor= motorBomba(jsonData,selPump.hp);

});
temp.addEventListener('change', () => {
  if(selPump){
  pyct.motor= motorBomba(jsonData,selPump.hp);
  }
  });
vendSelect.addEventListener('change', () => {
  pyct.rep= selectVend(jsonData.bomSol.vendedores);
  });

  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

function cotTypVal(){
  const bombeo = document.getElementById("check1");
  const solar = document.getElementById("check2");
  const conditionalElements = document.querySelectorAll(".standard-input");
      if (!bombeo.checked && !solar.checked ) {
          solar.checked = true;
          bombeo.checked = true;
         return;
      }
      if (!solar.checked && bombeo.checked) {
        document.getElementById("hp").disabled = true;
        alert("Solo bombeo");
        cotType= 1;
      }  
      if (solar.checked && !bombeo.checked) {
        document.getElementById("hp").disabled = false;
                alert("Solo Solar"); 
        cotType= 2; 
      }
      if (solar.checked && bombeo.checked) {
        alert("Full Bombeo Solar");  
        conditionalElements.forEach(element => {
        element.disabled = false; });
        document.getElementById("idCot").disabled = true;
        document.getElementById("input0").disabled = true;
        document.getElementById("hp").disabled = true;
        cotType= 3;
      }  
}

/*consultar tipo de cambio*/
const banxicourl="https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF18561/datos/oportuno?token=";
const token="b762a196dea52ff59a8a0609a3e74a5bcac7e697da6e107748f7ee33d59e1cfd";
async function consultarTipoCambio() {
  try{
      const response = await fetch(banxicourl+token);
      if(!response.ok){
          console.log("sin respuesta");
          return;
      }
      const data= await response.json();
      const series= data.bmx.series[0];
      const tipCam = series.datos[0].dato ;
      console.log(tipCam);
      document.getElementById("input0").value = tipCam;;
  
  } catch(error){
      console.log("error de informacion recibida:", error);
  }
}



function validar() {
 if(!selPump){alert("Proporcione CDT");
  return;
} 
/*const desc=document.getElementById('input7'); 
 if(desc.value<40){
   if(descValido!=1){
    authDescuen();
    return;
   }
   }*/
 if(cotType == 1){
  selPump.cotType=1;
 } 
 if(cotType == 2){
  selPump.cotType=2;
} 
if(cotType == 3 || !cotType){
  selPump.cotType=3;
  console.log(selPump.cotType)
} 
const nom=document.getElementById('input1'); 
const loc=document.getElementById('input2');
const km=document.getElementById('input3');
const cdt=document.getElementById('input6');
if(!nom.value){
    alert("El campo nombre no puede estar vacio PUÑETAS!")
    return;
}
if(!loc.value){
  alert("El campo Localidad no puede estar vacio PUÑETAS!")
  return;
}
if(!km.value){
  alert("El campo Kilometros no puede estar vacio PUÑETAS!")
  return;
}
if(!cdt.value){
  alert("El campo CDT no puede estar vacio PUÑETAS!")
  return;
}

const exiBtn = document.getElementById('cotizar'); 
if(!exiBtn){
    const cotizarButton = document.createElement('a');
    cotizarButton.href = './cotizacion.html';
    cotizarButton.target = '_blank';
    cotizarButton.rel = 'noopener noreferrer';
    const buttonElement = document.createElement('button');
    buttonElement.id = 'cotizar';
    buttonElement.type = 'button';
    buttonElement.classList.add('btn', 'btn-success');
    buttonElement.textContent = 'Cotizar';
    buttonElement.onclick = cotizar;
    cotizarButton.appendChild(buttonElement);
    const validarButton = document.getElementById('validar');
    validarButton.parentNode.appendChild(cotizarButton);
    }
c = genID(); 
alert('ID generado: '+c+' puede Cotizar');
d=document.getElementById('idCot');
d.value = c;   

}

function cotizar(){ 
    pyct.nombre = document.getElementById("input1").value ;
    pyct.loc = document.getElementById("input2").value;
    pyct.lts = document.getElementById("ltsSelect").value;
    pyct.proPozo = document.getElementById("input5").value;
    pyct.cdtP = document.getElementById("input6").value;
    //pyct.cantPan = var cantidad de paneles
    pyct.id = c;
    selPump.pyct = pyct;
    //console.log( 'COTIZAR() '+pyct.motor.Modelo+' serie: '+pyct.motor.serie);
    saveToLocalStorage('cotData', selPump);
    
    //window.open('./cotizacion.html', '_blank');
  }

function actualizar() {
    a = document.getElementById('input0').value;
    alert('Los datos se actualizaron correctamente!');
}


function datosBomba(data) {
let datosBomba= null ;
const lts= document.getElementById("ltsSelect").value ;
const cdt= document.getElementById("input6").value; 
const hpDisp= document.getElementById("hp"); 
      
        
        data.bomSol.bombas.forEach(bomba=>{
          if(lts==bomba.lts){
            bomba.modelos.forEach(model=>{
              if(model.altMax >= cdt){
                if(!datosBomba){
               datosBomba= model;
                }
              }
              });
          }
        });
    if(datosBomba){

     //alert('Modelo: '+datosBomba.Modelo+' Hp: '+datosBomba.hp);
      hpDisp.value = datosBomba.hp ;

      return datosBomba;
    }
    else{
      alert("No existe bomba de "+lts+" lt/s para altura de "+cdt);
      maxCDT();
    }
}


function equipBomb(modelo, altMax, lts, hp){
  /*esta funcion debe calcular el equipamento de la bomba de acuerdo a los lt/s se usa un diametro de tuberia y se le suman todas las piezas esta funcion debe calcular
  el precio total del equipamiento que es por metro so se calcula en base a la altura maxima de la bomba elegida, debe retornar precio, */
}
function authDesMod(){
  const desc=document.getElementById('input7');
  modalContent=document.getElementById("modalCont");
  modalTit=document.getElementById("staticBackdropLabel");
  modalbutton=document.getElementById("btnPrim");
  modalbutton.onclick= 'valiDesc()';
  modalbutton.innerHTML= `Autorizar`
  modalTit.innerHTML=`Authorizar descuento de ${desc.value}`;
  modalContent.innerHTML=`<label for="pwd">Introduce la contraseña de autorización:</label><inpunt id="pwd" type="password" ></inpunt>`;
}
function valiDesc(){
  const desc=document.getElementById('input7');
  const pwd=document.getElementById('pwd').value
  if(pwd==="Weslaco123"){
    alert("password correcto");
    descValido=1
    desc.disabled=true;
    return
  }
  else{alert("mal puñetas"); 
    return
  }

  
  
  /*esta funcion se debe llamar desde validar() si gastos ind es menor a 40  pide 
  auth modal password este pwd se podra cambiar en la UI de admin preparar 
  para sacarlo de datosjson por ahora solo poner un pwd  debe regresar descValido=1*/
}



function motorBomba(data,hp){  
let datosMot= null ;
const temp= document.getElementById('check0').checked
data.bomSol.motores.forEach(motor=>{
          if(motor.hp<7.5){
          if(hp==motor.hp){
                  datosMot= motor;
                  return datosMot;
                }
          }
          else{
            if(hp==motor.hp){
              if(temp){
                if(motor.serie=='X')
                 // alert('entro al if serie x Modelo: '+motor.Modelo+' Serie: '+motor.serie+'hp: '+motor.hp);
                datosMot= motor;
                return datosMot;
              }
              if(!temp){
              if(motor.serie=='RT'){
                // alert('entro al if serie RT Modelo: '+motor.Modelo+' Serie: '+motor.serie+'hp: '+motor.hp);
                datosMot= motor;
                return datosMot;
              }          
              }
          }
          }
        });
          if(datosMot){
          //alert('if datosMot Modelo: '+datosMot.Modelo+' Serie: '+datosMot.serie+'hp: '+datosMot.hp);
          return datosMot;
          }
          
}

function datosSolar(hp, distPan){
/*esta funcion usando los hp ya sea que vengan de la funcion datosBomba o ingresados manualmente en el caso que no se este cotizando bomba
  con los hp se calcula el gabinete armado y el variador normalmente el variador es el que sigue en HP ejemplo si la bomba es de 10 el variador es de 15 y asi
  esta funcion debe retornar el tipo de panel, cantidad de paneles, precio, gabinete armado precio, */
}
function maxCDT(){
const dropdown = document.getElementById('ltsSelect');
const cdtMax = document.getElementById('cdtMax');
const cdt= document.getElementById("input6").value ;
//if (!dropdown){ console.error("Error: Could not find dropdown element.");}
//if(!cdtMax)   { console.error("Error: Could not find cdtMax element.");}
const maxAltValues = {
  0.6: 360,0.96: 381, 1.4: 356, 
  2.5: 422, 4.16:123, 5.33:369, 
  9.33:343, 15: 242, 20:182,
  23.3:250, 30:190, 40:144,
  53.3:119, 70:83};
const selectedValue = dropdown.value;
const legendText = maxAltValues[selectedValue];
cdtMax.textContent = `(CDT Max ${legendText}mts)`;
if(cdt>legendText){cdtMax.textContent = `(Elegir otro Volumen de agua, CDT Max ${legendText}mts)`;}
else{cdtMax.textContent = `(CDT Max ${legendText}mts)`;}
}

function genID() {
  const nom = document.getElementById('input1').value;
  const vend = document.getElementById('vendSelect').value;
  const selHp = selPump.hp;
  const nom3 = nom.substring(0, 3).toUpperCase();
  const vend3 = vend.substring(0, 3).toUpperCase();
  const finalID = `BomSol-${nom3}-${vend3}-${selHp}`;

  return finalID;
}

function selectVend(data){
  const vend = document.getElementById('vendSelect').value;
 for(const rep of data){
    if(rep.nombre == vend){
      return rep;
    }
  }
  console.error(`No matching rep found for vendor: ${vend}`);
  return null;
   
}

function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    console.log('Object saved to local storage successfully.');
  } catch (error) {
    console.error('Error saving object to local storage:', error);
  }
}



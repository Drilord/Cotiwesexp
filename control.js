let a, b, c, d, e, f, g, h, i, j, k, l;
let selPump, pumpCurrT=1, cotType=3, structType=1, pyct={}, descValido, modalContent, dataS;


fetch('datos.json')
  .then(response => response.json())
  .then(jsonData => {
    const ltsSelect = document.getElementById('ltsSelect');
    const vendSelect = document.getElementById('vendSelect');
    const CDT = document.getElementById('input6');
    const temp = document.getElementById('check0');
    const str = document.querySelectorAll('.str');
    
    dataS=jsonData.bomSol.estructura;
    estrucSol()          
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

CDT.addEventListener('blur', () => {
selPump=datosBomba(jsonData);
if(selPump){pyct.motor= motorBomba(jsonData,selPump.hp);}

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
  const fullBomSol = document.querySelectorAll(".full");
  const Solar = document.querySelectorAll(".sol");
  const Bombeo = document.querySelectorAll(".bom");
      if (!bombeo.checked && !solar.checked ) {
          solar.checked= true;
          bombeo.checked= true;
          cotTypVal();
         return;
      }
      if (!solar.checked && bombeo.checked) {
        Bombeo.forEach(element => {
        element.style.display= 'flex'; });
        Solar.forEach(element => {
          element.style.display= 'none'; });
          document.getElementById("hp").disabled = true;  
        alert("Solo bombeo");
        cotType= 1;
      }  
      if (solar.checked && !bombeo.checked) {
        Bombeo.forEach(element => {
          element.style.display= 'none'; });
          Solar.forEach(element => {
            element.style.display= 'flex'; });
            document.getElementById("hp").disabled = false;
                alert("Solo Solar"); 
        cotType= 2; 
      }
      if (solar.checked && bombeo.checked) {
        alert("Full Bombeo Solar");  
        fullBomSol.forEach(element => {
        element.style.display= 'flex'; });
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
      const tipCam = series.datos[0].dato*1.05 ;
      document.getElementById("input0").value = tipCam;;
  
  } catch(error){
      console.log("error de informacion recibida:", error);
  }
}


// ESTAMOS MODIFICANDO PARA VALIDAR SEGUN EL TIPO DE COTIZACION revisar lo de SELPUMP cuando no lleva bomba 
function validar() {
/*const desc=document.getElementById('input7'); 
 if(desc.value<40){
   if(descValido!=1){
    authDescuen();
    return;}}*/
  const nom=document.getElementById('input1'); 
  const loc=document.getElementById('input2');
  const km=document.getElementById('input3');
  const cdt=document.getElementById('input6');  
  const hpMan=document.getElementById('hp');  
  const distP=document.getElementById('input8');
  const proPozo=document.getElementById('input8');
    
 if(cotType == 1){
  pyct.cotType=1;
  if(!selPump){alert("Proporcione CDT correcto");
    return;
  } 
  if(!cdt.value){
    alert("El campo CDT no puede estar vacio")
    return;
  }
  if(!proPozo.value){
    alert("Debe introducir la profundidad del pozo")
    return;
  }
  if(!nom.value){
    alert("El campo Nombre no puede estar vacio")
    return;
  }
if(!loc.value){
  alert("El campo Localidad no puede estar vacio")
  return;
}
if(!km.value){
  alert("El campo Kilometros no puede estar vacio")
  return;
}
  c = genID(selPump.hp);
 } 
 if(cotType == 2){
  pyct.cotType=2;
 
  if(!hpMan.value){
    alert("Debe introducir los HP de la bomba existente")
    return;
}
if(!nom.value){
    alert("El campo Nombre no puede estar vacio")
    return;
}
if(!loc.value){
  alert("El campo Localidad no puede estar vacio!")
  return;
}
if(!km.value){
  alert("Debe poner los KM")
  return;
}
if(!distP.value){
  alert("Introduzca la distancia de la bomba a los paneles")
  return;
}
c = genID(hpMan.value);
} 
if(cotType == 3 || !cotType){
  if(!selPump){alert("Proporcione CDT correcto");
    return;
  } 
  if(!cdt.value){
    alert("El campo CDT no puede estar vacio PUÑETAS!")
    return;
  }
  if(!nom.value){
    alert("El campo Nombre no puede estar vacio PUÑETAS!")
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
  if(!distP.value){
  alert("Introduzca la distancia de la bomba a los paneles")
  return;
  }
  pyct.cotType=3;
  c = genID(selPump.hp);
} 

alert('ID generado: '+c+' puede Cotizar');
const cotBtn=document.getElementById('acot'); 
cotBtn.style.display= 'block';
d=document.getElementById('idCot');
d.value = c;   

}

function cotizar(){ 
    pyct.nombre = document.getElementById("input1").value ;
    pyct.loc = document.getElementById("input2").value;
    pyct.lts = document.getElementById("ltsSelect").value;
    ltsHora = document.getElementById("ltsSelect").value*60*60;
    pyct.ltsmes = {Enero:ltsHora*5.53*0.8, Febrero:ltsHora*6.13*0.8, 
                   Marzo:ltsHora*7.15*0.8, Abril:ltsHora*6.81*0.8,
                   Mayo :ltsHora*6.45*0.8, Junio:ltsHora*6.08*0.8, 
                   Julio:ltsHora*5.64*0.8, Agosto:ltsHora*5.69*0.8,
                   Septiembre:ltsHora*5.64*0.8, Octubre:ltsHora*6.21*0.8, 
                   Noviembre:ltsHora*6.02*0.8 ,Diciembre:ltsHora*5.42*0.8};
                   
      let total = 0;
      for (const month in pyct.ltsmes) {
        total += pyct.ltsmes[month];
      }             
      // Calculate the average
      const average = total / Object.keys(pyct.ltsmes).length;;
      pyct.ltsAvg = average.toLocaleString('en-US');
      console.log("Average:", average);               
    pyct.proPozo = document.getElementById("input5").value;
    pyct.cdtP = document.getElementById("input6").value;
    //pyct.cantPan = var cantidad de paneles
    pyct.id = c;
    if(!selPump){selPump={};}
    if(!pyct.motor){
      pyct.motor={};
      pyct.motor.volt=document.getElementById("voltaje").value
    }
    console.log( 'COTIZAR() '+pyct.motor.volt);
    selPump.pyct = pyct;
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


function validstruct(cual){
  const elev = document.getElementById('check3');
  const piso = document.getElementById('check4');
  const plana= document.getElementById("check5") ; 
  if (!plana.checked && !piso.checked && !elev.checked)
  {
    piso.checked = false;
    plana.checked = false;
    elev.checked = true;
    structType=1;
    estrucSol()
    console.log('Struct:',structType);
  }
  if (cual == 3) {
    piso.checked = false;
    plana.checked = false;
    elev.checked = true;
    structType=1;
    estrucSol()
    console.log('Struct:',structType);
  }
  if (cual == 4) {
    elev.checked = false;
    plana.checked = false;
    piso.checked = true;
    structType=2;
    estrucSol()
    console.log('Struct:',structType);
  }
  if (cual == 5) {
    piso.checked = false;
    elev.checked = false;
    plana.checked = true;
    structType=3;
    estrucSol()
    console.log('Struct:',structType);
  }
}

function currType(cual){

    const alt = document.getElementById('check6');
    const dir = document.getElementById('check7');
    if (!dir.checked && !alt.checked)
    {
      alt.checked = true;
      dir.checked = false;
      pumpCurrT=1;
      console.log('2 blank:',pumpCurrT);
      return;
    }
    if (cual == 6) {
      dir.checked = false;
      alt.checked = true;
      pumpCurrT=1;
      console.log('cual 6:',pumpCurrT);
      return;
    }
    if (cual == 7) {
      dir.checked = true;
      alt.checked = false;
      pumpCurrT=2;
      console.log('cual 7:',pumpCurrT);
      return;
    }
}

function estrucSol(){
  //console.log(dataS);
  pyct.struct= {};
  if(structType==1){
     
     const precio=dataS.elevada.precio+dataS.panel.precio
     pyct.struct.precio=precio;
     pyct.struct.material= dataS.elevada.material;
     console.log(pyct.struct.material, 'precio: $',pyct.struct.precio)
  }
  if(structType==2){
    pyct.struct.material=dataS.piso.material;
     const precio=dataS.piso.precio+dataS.panel.precio
     pyct.struct.precio=precio;
    console.log(pyct.struct.material, 'precio: $',pyct.struct.precio)
  }
  if(structType==3){
    pyct.struct=dataS.panel;
    console.log(pyct.struct.material, 'precio: $',pyct.struct.precio)
  }
}

function datosSolar(hp, distPan){
/*esta funcion usando los hp ya sea que vengan de la funcion datosBomba o ingresados manualmente en el caso que no se este cotizando bomba
  con los hp se calcula el gabinete armado y el variador normalmente el variador es el que sigue en HP ejemplo si la bomba es de 10 el variador es de 15 y asi
  esta funcion debe retornar el tipo de panel, cantidad de paneles, precio, gabinete armado precio,
  filtro de armonicos se evalua si la profundidad del pozo mas distancia a paneles  */
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

function genID(selHp) {
  const nom = document.getElementById('input1').value;
  const vend = document.getElementById('vendSelect').value;
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



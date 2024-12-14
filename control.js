let a, b, c, d, e, f, g, h, i, j, k, l;
let selPump, tipCam, pumpCurrT=1, cotType=3, structType=1, pyct={}, descValido, modalContent, dataS, dataPan, eqBomba, buttonState = 0; 


fetch('datos.json')
  .then(response => response.json())
  .then(jsonData => {
    
    const vendSelect = document.getElementById('vendSelect');
    const CDT = document.getElementById('input6');
    const temp = document.getElementById('check0');
    const curra = document.getElementById('check6');
    const currd = document.getElementById('check7');
    const ltsSelect = document.getElementById('ltsSelect');
    dataS=jsonData.bomSol.estructura;
    dataPan=jsonData.bomSol.solar;
    eqBomba=jsonData.bomSol.equipamientoBomba;
    estrucSol();          ;
currType(6,jsonData.bomSol.bombas);
curra.addEventListener('change', ()=>{
const ltscurr=jsonData.bomSol.bombas
currType(6,ltscurr);
maxCDT();
console.log('en change listen de Alt',pumpCurrT);

});
currd.addEventListener('change', ()=>{
  const ltscurr=jsonData.bomSol.bombasKolosal
  currType(7,ltscurr);
  maxCDT();
  console.log('en change listen de Alt',pumpCurrT);
  
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
if(selPump){motorBomba(jsonData,selPump.hp); console.log(pyct.motor.hp);}

});
temp.addEventListener('change', () => {
  if(selPump){
  motorBomba(jsonData,selPump.hp);
  console.log(pyct.motor);
  }
  });
vendSelect.addEventListener('change', () => {
  pyct.rep= selectVend(jsonData.bomSol.vendedores);
  });
  
ltsSelect.addEventListener('change', () => {
   selPump=datosBomba(jsonData);
   if(selPump){motorBomba(jsonData,selPump.hp);} 
   console.log(pyct.motor); 
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
        console.log("Solo bombeo");
        cotType= 1;
      }  
      if (solar.checked && !bombeo.checked) {
        Bombeo.forEach(element => {
          element.style.display= 'none'; });
          Solar.forEach(element => {
            element.style.display= 'flex'; });
            document.getElementById("hp").disabled = false;
            console.log("Solo Solar"); 
        cotType= 2; 
      }
      if (solar.checked && bombeo.checked) {
        console.log("Full Bombeo Solar");  
        fullBomSol.forEach(element => {
        element.style.display= 'flex'; });
        document.getElementById("hp").disabled = true;
        document.getElementById('voltrow').style.display= 'none';
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
      tipCam = series.datos[0].dato*1.05 ;
      document.getElementById("input0").value = tipCam;;
  
  } catch(error){
      console.log("error de informacion recibida:", error);
  }
}



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
  const proPozo=document.getElementById('input5');
  const marg=document.getElementById('input7');
  const grua=document.getElementById('input9');
  const myButton = document.getElementById('validar');
  const cotBtn=document.getElementById('acot'); 
if (buttonState === 0) {
 //campos generales
 if(!nom.value){
  alert("El campo Nombre no puede estar vacio")
  nom.classList.add('is-invalid');
  return;
 } else{nom.classList.remove('is-invalid');}
if(!loc.value){
  alert("El campo Localidad no puede estar vacio");
  loc.classList.add('is-invalid');
  return;
 } else{loc.classList.remove('is-invalid');}
if(!km.value){
  alert("El campo Kilometros no puede estar vacio");
  km.classList.add('is-invalid');
  return;
}else{km.classList.remove('is-invalid');}  
if (isNaN(km.value)) {
   alert("El campo Kilometros no es un número.");
   km.classList.add('is-invalid');
   return;  
}else{km.classList.remove('is-invalid');} 
/*if (Number.isInteger(km.value)) {
  alert("Es un número entero.");
  return;
}*/
if (!marg.value) {
  alert("Los gastos indirectos no pueden estar vacios.");
  marg.classList.add('is-invalid');
    return;
  } else{marg.classList.remove('is-invalid');}
if (isNaN(marg.value)) {
  alert("Los gastos indirectos deben ser numero.");
  marg.classList.add('is-invalid');
    return;
  } else{marg.classList.remove('is-invalid');}
 //bombeo   
 if(cotType == 1){
  pyct.cotType=1;
 
  if(!selPump){alert("Proporcione CDT correcto");
    cdt.classList.add('is-invalid');
    return;
  } else{cdt.classList.remove('is-invalid');}
  if(!cdt.value){
    alert("El campo CDT no puede estar vacio");
    cdt.classList.add('is-invalid');
    return;
  } else{cdt.classList.remove('is-invalid');}
  if(!proPozo.value){
    alert("Debe introducir la profundidad del pozo");
    proPozo.classList.add('is-invalid');
    return;
  } else{proPozo.classList.remove('is-invalid');}
  if (isNaN(proPozo.value)) {
    alert("La profundidad del pozo no es un número.");
    proPozo.classList.add('is-invalid');
    return;
  } else{proPozo.classList.remove('is-invalid');}
 if (isNaN(grua.value)) {
  alert("El costo de grua debe ser un número.");
  grua.classList.add('is-invalid');
    return;
  } else{grua.classList.remove('is-invalid');}
   selPump.eqBomba=equipBomb();
   //alert('Precio equip Bomba tot:', selPump.eqBomba.precioeq);
   c = genID(selPump.hp);
 } 
 //solar
 if(cotType == 2){
  pyct.cotType=2;
 
  if(!hpMan.value){
    alert("Debe introducir los HP de la bomba existente")
    hpMan.classList.add('is-invalid');
    return;
  } else{hpMan.classList.remove('is-invalid');}
if (isNaN(hpMan.value)) {
  alert("El campo HP no es un número.");
  hpMan.classList.add('is-invalid');
    return;
  } else{hpMan.classList.remove('is-invalid');}
if(!distP.value){
  alert("Introduzca la distancia de la bomba a los paneles")
  distP.classList.add('is-invalid');
  return;
}else{distP.classList.remove('is-invalid');}
if (isNaN(distP.value)) {
  alert("La distancia a Paneles no es un número.");
  distP.classList.add('is-invalid');
  return;
}else{distP.classList.remove('is-invalid');}
pyct.solar= datosSolar(parseFloat(hpMan.value),parseInt(distP.value),parseInt(proPozo.value))
c = genID(hpMan.value);
} 
//full bomsol
if(cotType == 3 || !cotType){
  pyct.cotType=3;
  if(!selPump){alert("Proporcione CDT correcto");
    cdt.classList.add('is-invalid');
    return;
  }else{cdt.classList.remove('is-invalid');} 
  if(!cdt.value){
    alert("El campo CDT no puede estar vacio!")
    cdt.classList.add('is-invalid');
    return;
  }else{cdt.classList.remove('is-invalid');}
   if(!distP.value){
     alert("Introduzca la distancia de la bomba a los paneles")
     distP.classList.add('is-invalid');
     return;
   }else{distP.classList.remove('is-invalid');}
   if (isNaN(distP.value)) {
    alert("La distancia a Paneles no es un número.");
    distP.classList.add('is-invalid');
  return;
}else{distP.classList.remove('is-invalid');}
  if(!proPozo.value){
    alert("Debe introducir la profundidad del pozo");
    proPozo.classList.add('is-invalid');
    return;
  } else{proPozo.classList.remove('is-invalid');}
  if (isNaN(proPozo.value)) {
    alert("La profundidad del pozo no es un número.");
    proPozo.classList.add('is-invalid');
    return;
  } else{proPozo.classList.remove('is-invalid');}
  if (isNaN(grua.value)) {
    alert("El costo de grua debe ser un número.");
    grua.classList.add('is-invalid');
    return;
  } else{grua.classList.remove('is-invalid');}
  pyct.cotType=3;
  pyct.solar= datosSolar(selPump.hp,parseInt(distP.value),parseInt(proPozo.value))
  c = genID(selPump.hp);
  selPump.eqBomba=equipBomb();
  

} 
pyct.grua=parseInt(grua.value);
if(parseInt(marg.value)<35){
alert('Pedir Autorizacion para Gastos indirectos menor a 35%');
marg.classList.add('is-invalid');
    return;
  } else{marg.classList.remove('is-invalid');}
alert('ID generado: '+c+' puede Cotizar');
cotBtn.style.display= 'block';
d=document.getElementById('idCot');
d.value = c;   


  // Action for the first state
  myButton.textContent = "Modificar"; 
  const inputs = document.querySelectorAll('.vLock');
  inputs.forEach(input => {
  input.disabled = true; 
  });
  if(cotType==2){hpMan.disabled=true;}
  buttonState = 1; 
} else if (buttonState === 1) {
  // Action for the second state
  myButton.textContent = "Validar"; 
  buttonState = 0; 
  cotBtn.style.display= 'none';
  const inputs = document.querySelectorAll('.vLock');
  inputs.forEach(input => {
  input.disabled = false; 
  });
  if(cotType==2){hpMan.disabled=false;}
  
}

}

function cotizar(){ 
    pyct.nombre = document.getElementById("input1").value ;
    pyct.loc = document.getElementById("input2").value;
    pyct.lts = document.getElementById("ltsSelect").value;
    ltsHora = document.getElementById("ltsSelect").value*60*60;      
    pyct.proPozo = document.getElementById("input5").value;
    pyct.cdtP = document.getElementById("input6").value;
    pyct.desc = desc();
    pyct.curr=pumpCurrT;  
    pyct.id = c;
    if(!selPump){selPump={};}
    if(!pyct.motor){
      pyct.motor={};
      pyct.motor.volt=document.getElementById("voltaje").value
    }
    console.log( 'COTIZAR() '+pyct.motor.volt);
    selPump.pyct = pyct;
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
    const average = total / Object.keys(pyct.ltsmes).length;;
    pyct.ltsAvg = average.toLocaleString('en-US');
    console.log("Average:", average); 
    try {
      localStorage.removeItem('cotData'); 
    } catch (error) {
      console.error("Error deleting from localStorage:", error);
    }
    saveToLocalStorage('cotData', selPump);
    
    //window.open('./cotizacion.html', '_blank');
  }
  
/*function deleteFromLocalStorage(key) {
  try {
    localStorage.removeItem(key); 
  } catch (error) {
    console.error("Error deleting from localStorage:", error);
  }
}*/

function actualizar() {
    a = document.getElementById('input0').value;
    alert('Los datos se actualizaron correctamente!');
}


function datosBomba(data) {
let datosBomba= null ;
const lts= document.getElementById("ltsSelect").value ;
const cdt= document.getElementById("input6"); 
const hpDisp= document.getElementById("hp"); 
let tBomba;
if (isNaN(cdt.value)) {
  alert("El campo CDT no es un número.");
  cdt.classList.add('is-invalid');
  return;  
}else{cdt.classList.remove('is-invalid');}
if(pumpCurrT==1){tBomba=data.bomSol.bombas
  console.log('entro a if datosbomba alterna')
}      
if(pumpCurrT==2){tBomba=data.bomSol.bombasKolosal
  console.log('entro a if datosbomba directa')
}        
        tBomba.forEach(bomba=>{
          if(lts==bomba.lts){
            bomba.modelos.forEach(model=>{
              if(model.altMax >= cdt.value){
                if(!datosBomba){
               datosBomba= model;
                }
              }
              });
          }
        });

    if(datosBomba){

     console.log('Modelo: '+datosBomba.Modelo+' Hp: '+datosBomba.hp);
      hpDisp.value = datosBomba.hp ;
      datosBomba.costo=((datosBomba.precio*tipCam*1.16)*0.48)*0.95;
      console.log('Costo Bomba ', datosBomba.costo );
      return datosBomba;
    }
    else{
      alert("No existe bomba de "+lts+" lt/s para altura de "+cdt.value);
      maxCDT();
    }
}


function equipBomb(){
 let priceeq;
 const descarga = desc();
 const ids=selPump.equipB;
 const cants=selPump.eqCants
 const accDisp = eqBomba.descarga[descarga];
 const cals = eqBomba.cableSumergible;
 const altPozo=document.getElementById('input5')
 
 // Filtrar los accesorios según los ids proporcionados
 const accsSel = accDisp.filter(accesorio => ids.includes(accesorio.id));
 accsSel.forEach(accsel => {
 if (accsel.mxn === false || accsel.mxn === undefined) { 
    accsel.costo=((accsel.precio*tipCam*1.16)*0.48)*0.95;
    console.log("Acc: ", accsel.Accesorio,"  nuevo precio: ", accsel.costo); 
  }
  });
  console.log(accsSel);
 // calcular el precio del cable 
const cable = cals.find(item => item.calibre === selPump.calibre);
cable.costo=((cable.precioMXN*1.16)*0.48)*0.95;
cable.costo=cable.costo*(selPump.altMax+10)

console.log("cable calibre ",selPump.calibre," costo  mxn", cable.costo);

 // calacular el precio por metro del equipamiento  
 const tubo={tubo:accsSel[0].Accesorio, precio:accsSel[0].costo};
 const kit={kit:accsSel[1].Accesorio, precio:accsSel[1].costo};
 const check={kit:accsSel[2].Accesorio, precio:accsSel[2].costo};
 tubo.precio= selPump.altMax/cants[0]*tubo.precio;
 kit.precio= cants[1]*kit.precio;
 check.precio= check.precio*cants[2];

 priceeq= (tubo.precio+kit.precio+check.precio+cable.costo)/selPump.altMax;
 console.log("precio por metro ", priceeq);
//calcular el precio del equipamiento y regresar los datos para aduntar a selPump
  priceeq=priceeq*parseInt(altPozo.value)
  console.log("precio de equipamiento", priceeq);
  const result=[tubo,kit,check,{precioeq:priceeq}]
  console.log(result);
  return result;

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
let datosMot={} ;
const temp= document.getElementById('check0').checked
data.bomSol.motores.forEach(motor=>{
          if(motor.hp<7.5){
            if(hp==motor.hp){
                  datosMot= motor;
                  datosMot.costo=((datosMot.precio*tipCam*1.16)*0.48)*0.95;
                  console.log('Motor: '+motor.Modelo+' Serie: '+motor.serie+'hp: '+motor.hp);
                  console.log('Costo mot ', datosMot.costo );
                  pyct.motor=datosMot;
                  return;
                }
            }
            else{
              if(hp==motor.hp){
                if(temp){
                if(motor.serie=='X')
                  console.log('entro al if serie x Modelo: '+motor.Modelo+' Serie: '+motor.serie+'hp: '+motor.hp);
                datosMot= motor;
                datosMot.costo=((datosMot.precio*tipCam*1.16)*0.48)*0.95;
                console.log('Costo mot ', datosMot.costo );
                pyct.motor=datosMot;
                return;
                }
                if(!temp){
                if(motor.serie=='RT'){
                  console.log('entro al if serie RT Modelo: '+motor.Modelo+' Serie: '+motor.serie+'hp: '+motor.hp);
                datosMot= motor;
                datosMot.costo=((datosMot.precio*tipCam*1.16)*0.48)*0.95;
                console.log('Costo mot ', datosMot.costo );
                pyct.motor=datosMot;
                return;
                }          
                }
              }
            }
        });
         
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

function currType(cual,data){

    const alt = document.getElementById('check6');
    const dir = document.getElementById('check7');
    const ltsSelect = document.getElementById('ltsSelect') 
    ltsSelect.innerHTML = '';
    data.forEach(bomba => {
    const option = document.createElement('option');
    option.value = bomba.lts;
    option.text = bomba.lts+" lt/s";
    ltsSelect.appendChild(option);
    }); 
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

function datosSolar(hp,distPan,proPozo){
  console.log('hp recibido en datos solar',hp);
 //variador
 const variadores=dataPan.variadorSolar;
 const gabinetes=dataPan.gabinetesArmados;
 const paneles=dataPan.paneles;
 const volt=document.getElementById('voltaje');
 let selGab;
 const solar={};
 if(hp>2){
   
   variadores.forEach(variador=>{
      if(variador.hp==hp){
         solar.variador=variador;
      }
   });
  }else{
    solar.variador=variadores[0];
  }
 
 //gabinete 
 if(hp>2){
   
gabinetes.forEach(gabinete=>{
     if(gabinete.hp==hp){
        selGab=gabinete;

     }
  });
 }else{
   selGab=gabinetes[0];
 }
 const filtro=distPan+proPozo
  if(filtro<150){
       solar.gabinete={hp:selGab.hp,volt:selGab.voltaje,precio:selGab.Sinfiltro}
  }
  if(filtro>=150 && filtro<500){
    solar.gabinete={hp:selGab.hp,volt:selGab.voltaje,precio:selGab.filtro150}
  }
  if(filtro>=500){
    solar.gabinete={hp:selGab.hp,volt:selGab.voltaje,precio:selGab.filtro500}
  }
 console.log(solar.gabinete);
 //cantPan
 /*alt*/if(pumpCurrT==1){
  let tempHp;
  if(hp<=1){tempHp=1}
  if(hp>1&&hp<=2){tempHp=2}
  if(hp>2){tempHp=hp}
  console.log('tempHp:',tempHp);
  if(!selPump){solar.cantPan=paneles.cantidadxHP.find(canpan=> canpan.hp==tempHp && canpan.voltaje==volt.value);}
  else{
    console.log(pyct.motor);
    console.log('pyct.motor.volt:',pyct.motor.volt);
    solar.cantPan=paneles.cantidadxHP.find(canpan=> canpan.hp==tempHp && canpan.voltaje==pyct.motor.volt);}
  solar.tipPan=paneles.tipoPaneles;
  solar.pot=paneles.potencia;
  solar.precio=paneles.precio*tipCam;
 }
 /*dir*/if(pumpCurrT==2){
     solar.cantPan={cantidadPaneles:selPump.cantPan};
     solar.tipPan=paneles.tipoPaneles;
     solar.pot=paneles.potencia;
     solar.precio=paneles.precio*tipCam;
 }
console.log(solar);
return solar;
/*esta funcion usando los hp ya sea que vengan de la funcion datosBomba o ingresados manualmente en el caso que no se este cotizando bomba
  con los hp se calcula el gabinete armado y el variador 
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
  0.5:115, 0.6: 360,0.96: 381, 1:60, 1.4: 356, 
  2:40, 2.5: 422, 4.16:123, 5.33:369, 
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
  const finalID = `BomSol${cotType}-${nom3}-${vend3}-${selHp}`;

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

function desc(){
  const dropdown = document.getElementById('ltsSelect');
  const descr = document.getElementById('descr');
  const descargValues = {
    0.5:"1 1/4", 0.6: "1 1/4",0.96: "1 1/4", 1:"1 1/4", 1.4:  "1 1/2", 
    2: 2, 2.5: 2, 4.16:2, 5.33:3, 
    9.33:3, 15: 3, 20:4,
    23.3:6, 30:6, 40:6,
    53.3:6, 70:6};
  const selectedValue = dropdown.value;  
  const legendText = descargValues[selectedValue];
  descr.textContent = `Desc.: ${legendText}"`;
  return legendText;
}

function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    console.log('Object saved to local storage successfully.');
  } catch (error) {
    console.error('Error saving object to local storage:', error);
  }
}



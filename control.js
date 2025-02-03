let a, b, c, d, e, f, g, h, i, j, k, l;
let AL,selPump, tipCam, pumpCurrT=1, cotType=3, structType=1, pyct={descAdd:{flag:0}}, descValido, modalContent, dataS, dataPan, eqBomba, buttonState = 0, srvcs, cdtFlg=0, repId, reps; 
authMain();
async function bombsol(){
 try{
  const response = await fetch(`api/bombSol/`);
  if(response.ok){
    const data=response.json();
    return data;
  }else{
    throw new Error('Error fetching data');
  }
 }catch(error){

   console.error('Error fetching data:', error);
}
}

async function init(){
  
    const jsonData= await bombsol();
    if(jsonData){
    reps=jsonData.bomSol.vendedores;
    const vendSelect = selectVend(reps,repId);
    const salesRep = document.getElementById('vendSelect');
    salesRep.value= vendSelect?.nombre
    pyct.rep= vendSelect;
    const CDT = document.getElementById('input6');
    const temp = document.getElementById('check0');
    const curra = document.getElementById('check6');
    const currd = document.getElementById('check7');
    const ltsSelect = document.getElementById('ltsSelect');
    const gasIndhtm = document.getElementById('input7');
    const chkDesA = document.getElementById('checkDesA');
    const DescAdd = document.getElementById('descAdd');


    srvcs=jsonData.bomSol.servicios;
    dataS=jsonData.bomSol.estructura;
    dataPan=jsonData.bomSol.solar;
    eqBomba=jsonData.bomSol.equipamientoBomba;
    estrucSol();     
currType(6,jsonData.bomSol.bombas);
curra.addEventListener('change', ()=>{
const ltscurr=jsonData.bomSol.bombas
currType(6,ltscurr);
selPump=datosBomba(jsonData);
if(selPump && pumpCurrT==1){motorBomba(jsonData,selPump.hp);} 
maxCDT();
console.log('en change listen de Alt',pumpCurrT);

});
currd.addEventListener('change', ()=>{
  const ltscurr=jsonData.bomSol.bombasKolosal
  currType(7,ltscurr);
  selPump=datosBomba(jsonData);
  if(selPump && pumpCurrT==1){motorBomba(jsonData,selPump.hp);} 
  maxCDT();
  console.log('en change listen de Alt',pumpCurrT);
  
  });
gasIndhtm.addEventListener('change',()=>{descValido=null;});

/*jsonData.bomSol.vendedores.forEach(vend => {
  const option = document.createElement('option');
  option.value = vend.nombre;
  option.text = vend.nombre;
  vendSelect.appendChild(option);
});
   
   pyct.rep= vendSelect;*/
chkDesA.addEventListener('change', () => {
  if(chkDesA.checked==true){
        pyct.descAdd={flag:1,text:''};
        DescAdd.style.display= 'block';    
  }else{DescAdd.style.display= 'none';
    pyct.descAdd={flag:0};
  }
  console.log(pyct.descAdd.flag);
});
document.getElementById('descAdd').addEventListener('input', function () {
  if (this.value.length >= 280) {
    alert('Has alcanzado el límite máximo de caracteres.');
  }
});

CDT.addEventListener('blur', () => {
selPump=datosBomba(jsonData);
if(selPump && pumpCurrT==1){motorBomba(jsonData,selPump.hp); console.log(pyct.motor.hp);}

});
temp.addEventListener('change', () => {
  if(selPump && pumpCurrT==1){
  motorBomba(jsonData,selPump.hp);
  console.log(pyct.motor);
  }
  });
/*vendSelect.addEventListener('change', () => {
  pyct.rep= selectVend(jsonData.bomSol.vendedores);
  });*/
  
ltsSelect.addEventListener('change', () => {
   selPump=datosBomba(jsonData);
   if(selPump && pumpCurrT==1){motorBomba(jsonData,selPump.hp);} 
   console.log(pyct.motor); 
  });
    }else{
      throw new Error('Error con bombsol');
    }

 

}



async function authMain(){     
try {
    const response = await fetch('api/vende/amoen')
    if (response.ok) {
      const data = await response.json(); 
      document.getElementById('main').style.display='block'
      console.log('vend Id', data?.userData?.id); 
      repId=data?.userData?.id
      AL=data?.userData?.aLev
        let dispLevel;
        if(AL===3){dispLevel='.dirW'}
        if(AL===2){dispLevel='.gere'}
        init();
        const authdisp=document.querySelectorAll(dispLevel);
        authdisp.forEach(element=>{
          element.style.display='block';
       });
      if(repId==0){
    alert('Este usuario no puede cotizar');
    const UI=document.getElementById('main');
    UI.style.display='none';
    window.location.href = '/tables.html';
    return;}

   
    } else if (response.status === 401) {
       
      k=1
      modalContent=document.getElementById("modalCont");
      modalTit=document.getElementById("staticBackdropLabel");
      modalbutton=document.getElementById("btnPrim");
      modalX=document.getElementById('xBtn');
      modalClsBtn=document.getElementById('2aryBtn');
      modalX.style.display='none';
      modalClsBtn.style.display='none';
      modalbutton.onclick= valLogin;
      modalbutton.innerHTML= `Ingresar`
      modalTit.innerHTML=`Ingreso a cotizador`;
      modalContent.innerHTML=`
                      <label for="usr">
                         Usuario:
                         </label>
                         <input id="usr" type="text"  class="form-control" placeholder="Usuario:">
                         </input>
                         <label for="pwdA">
                         Introduce la contraseña de autorización:
                         </label>
                         <input id="pwdA" type="password"  class="form-control" placeholder="Contraseña:">
                         <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="showPassword">
                        <label class="form-check-label" for="showPassword">
                          Revelar Contraseña
                        </label>
                      </div>
                      
                       </inpunt>`;
                       showPass();
                       document.getElementById('pwdA').addEventListener('keypress', function (e) {
                        if (e.key === 'Enter') {
                          valLogin();
                        }
                      });
                      document.getElementById('usr').addEventListener('keypress', function (e) {
                        if (e.key === 'Enter') {
                          valLogin();
                        }
                      });            
       const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop')); // traer la modal instance
       myModal.show(); // Show the modal programmatically    
    } 
  } catch (error) {
    console.error('Network error:', error);
    alert("A network error occurred.");
  }


  
}
function showPass(){
                        const shck=document.getElementById('showPassword');
                        const pwdInput = document.getElementById('pwdA');
                        shck.addEventListener('change', ()=> {
                          
                          if (shck.checked) {
                            pwdInput.type = 'text';
                          } else {
                            pwdInput.type = 'password';
                          }
                        });
}            
async function valLogin(){
  const usrHtm=document.getElementById('usr');
  const pwdHtm=document.getElementById('pwdA');
  let usr=usrHtm.value.trim();
  let pwd=pwdHtm.value.trim();
  usr = usr === '' ? null : usr;  
  pwd = pwd === '' ? null : pwd;
  if(usr==null){
    usrHtm.classList.add('is-invalid')
    alert('EL campo Usuario no puede estar vacio')
    return;
  }
  if(pwd==null){
    pwdHtm.classList.add('is-invalid')
    alert('EL campo Contraseña no puede estar vacio')
    return;
  }
   
  const login= {p:pwd,u:usr}
  fetch('api/vende',{
    method:'POST',
    headers:{'Content-Type': 'application/json'},  
    body: JSON.stringify(login)
  })
  .then(response =>{
    if (!response.ok) {
      return response.json().then(err => {throw err});
    }
    return response.json(); 
  })
  .then(auth => {

   console.log('auth:',auth);
  if(auth.token==='invalid'){
    if(k>=3){
      modalContent.innerHTML=`<span style="color: red;">limite de intentos</span>`;
      modalbutton.style.display='none';  
    }else{
    modalContent.innerHTML=`
                      <label for="usr">
                       Usuario:
                       </label>
                       <input id="usr" type="text"  class="form-control is-invalid" placeholder="Usuario:">
                       </input>
                       <label for="pwdA">
                       Datos incorrectos
                       </label>
                       <input id="pwdA" type="password"  class="form-control is-invalid" placeholder="Contraseña:">
                       <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="showPassword">
                        <label class="form-check-label" for="showPassword">
                          Revelar Contraseña
                        </label>
                      </div>
                      
                       </input>`;
                       showPass();
                       document.getElementById('pwdA').addEventListener('keypress', function (e) {
                        if (e.key === 'Enter') {
                          valLogin();
                        }
                      });
                      document.getElementById('usr').addEventListener('keypress', function (e) {
                        if (e.key === 'Enter') {
                          valLogin();
                        }
                      });            
    k=k+1;
    console.log('auth try:',k);
   }
  }
  else if(auth.token!='invalid'&& auth.id!=null){  
    document.getElementById('main').style.display='block' 
   console.log('vend Id', auth.id); 
   repId=auth.id
   AL=auth?.authL ? auth.authL : 0;
        let dispLevel;
        if(AL===3){dispLevel='.dirW'}
        if(AL===2){dispLevel='.gere'}
        init();
        const authdisp=document.querySelectorAll(dispLevel);
        authdisp.forEach(element=>{
          element.style.display='block';
       });
   if(repId==0){
    usrHtm.classList.add('is-invalid')
    alert('Este usuario no puede cotizar')
    window.location.href = '/tables.html';
    return;}
    const myModal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
   myModal.hide();

  } 

  });

    
  
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//MAPS API
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let service;
let predefinedAddress = { lat: 20.6639, lng: -103.4571 }; // weslaco
function initMap() {
  
   const input = document.getElementById("input2");
   const autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
      }
      calculateDistance(place.formatted_address);
  });
}

function calculateDistance(destinationAddress) {
  const service = new google.maps.DistanceMatrixService();
  const request = {
      origins: [predefinedAddress],
      destinations: [destinationAddress],
      travelMode: google.maps.TravelMode.DRIVING, // BICYCLING, WALKING, TRANSIT
      unitSystem: google.maps.UnitSystem.METRIC, // metric para kilometros
  };

  service.getDistanceMatrix(request, (response, status) => {
      if (status === "OK") {
          const distance = response.rows[0].elements[0].distance.value / 1000; // Convert meters to kilometers
          if(isNaN(distance)){alert("Distancia no calculada intente corregirr direccion");return;}
          document.getElementById("input3").value = Math.round(distance.toFixed(2)); // Display with 2 decimal places

      } else {
          console.error("Error al calcular la distancia:", status);
          document.getElementById("input3").value = "Error";
      }
  });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
          document.getElementById("hp").style.display = 'block'; 
          const hpSel =document.getElementById("solHp");
          if(hpSel){hpSel.style.display = 'none';} 
        console.log("Solo bombeo");
        cotType= 1;
      }  
      if (solar.checked && !bombeo.checked) {
        Bombeo.forEach(element => {
          element.style.display= 'none'; });
          Solar.forEach(element => {
            element.style.display= 'flex'; });
            const cantidadxHP = dataPan.paneles.cantidadxHP;
            const exitSel = document.getElementById('solHp')
            if(exitSel){
              exitSel.style.display='flex';
            }else{
            const selectElement = document.createElement('select');
            selectElement.id='solHp';
            selectElement.classList.add('form-select', 'text-right')
            const hpValues = cantidadxHP.map(item => item.hp);
            const uniqueHpValues = [...new Set(hpValues)];
            uniqueHpValues.forEach(optionText => {
              const optionElement = document.createElement('option');
              optionElement.value = optionText;
              optionElement.text = optionText;
              selectElement.appendChild(optionElement);
            });
            const hpDiv=document.getElementById("hpDiv");
            const hpLabel = hpDiv.querySelector("label");
            hpDiv.insertBefore(selectElement, hpLabel);
            
            voltSel(cantidadxHP,selectElement.value);
            selectElement.addEventListener('change',()=>{
              voltSel(cantidadxHP,selectElement.value);
                         
            });
          }
          document.getElementById("hp").style.display = 'none';
          
            console.log("Solo Solar"); 


        cotType= 2; 
      }
      if (solar.checked && bombeo.checked) {
        console.log("Full Bombeo Solar");  
        fullBomSol.forEach(element => {
        element.style.display= 'flex'; });
        document.getElementById("hp").disabled = true;
          document.getElementById("hp").style.display = 'block';
          const hpSel =document.getElementById("solHp");
          if(hpSel){hpSel.style.display = 'none';}
        document.getElementById('voltrow').style.display= 'none';
        cotType= 3;
      }  
}
function voltSel(cantidadxHP,hp){
  const voltSel=document.getElementById("voltaje");
  console.log('hp select changed');
  console.log('hp select ',hp);
  const volt = cantidadxHP.filter(item => item.hp == hp);
  console.log('volt',volt)
  const voltVal = volt.map(item => item.voltaje);
  console.log('voltVal',voltVal)
  while (voltSel.firstChild) {
    voltSel.removeChild(voltSel.firstChild);
  }
  voltVal.forEach(optText =>{
    const optionElement = document.createElement('option');
    optionElement.value = optText;
    optionElement.text = `${optText}v`;
    voltSel.appendChild(optionElement);
  });

} 
/*consultar tipo de cambio*/
const banxicourl="https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF18561/datos/oportuno?token=";
const token="b762a196dea52ff59a8a0609a3e74a5bcac7e697da6e107748f7ee33d59e1cfd";
consultarTipoCambio(banxicourl,token); 
async function consultarTipoCambio(banxicourl,token) {
  try{
      const response = await fetch(banxicourl+token);
      if(!response.ok){
          console.log("sin respuesta");
          return;
      }
      const data= await response.json();
      const series= data.bmx.series[0];
      console.log('tipcam banxico: ',series.datos[0].dato);
      const margTC=series.datos[0].dato*1.01;
      console.log('tipcam margen: ',margTC);
      tipCam = Math.trunc(margTC*10)/10;

      document.getElementById("input0").value = tipCam;;
  
  } catch(error){
      console.log("error de informacion recibida:", error);
  }
  /*tipCam=21
  window.addEventListener('load', () => {
  document.getElementById("input0").value = tipCam;;});*/
}



function validar() {
  const nom=document.getElementById('input1'); 
  const loc=document.getElementById('input2');
  const km=document.getElementById('input3');
  const cdt=document.getElementById('input6');  
  const hpMan=document.getElementById('solHp');  
  const distP=document.getElementById('input8');
  const proPozo=document.getElementById('input5');
  const marg=document.getElementById('input7');
  const grua=document.getElementById('input9');
  const myButton = document.getElementById('validar');
  const cotBtn=document.getElementById('acot'); 
  const tipCambio=document.getElementById('input0'); 
  const ltsS=document.getElementById('ltsSelect');
  const descAdd=document.getElementById('descAdd');
if(cdtFlg==1){
  alert('Combinacion de CDT y Volumen de Agua incorrecto!');
  cdt.classList.add('is-invalid');
  ltsS.classList.add('is-invalid');
  return;}  
  else{cdt.classList.remove('is-invalid');ltsS.classList.remove('is-invalid');}
if (buttonState === 0) {
 //campos generales
 if(pyct.descAdd.flag==1){
   if(!descAdd.value || descAdd.value.trim()==''){
          alert("desactive la casilla descripcion adicional");
          descAdd.classList.add('is-invalid');
          return;
   }else{pyct.descAdd.text=descAdd.value ;} 
 }
 
 if(!tipCambio.value || isNaN(tipCambio.value)){
  alert("ERROR CON EL TIPO DE CAMBIO")
  tipCambio.classList.add('is-invalid');
  return;
 }
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
   pyct.solar= datosSolar(parseFloat(selPump.hp),parseInt('0'),parseInt(proPozo.value))
   //alert('Precio equip Bomba tot:', selPump.eqBomba.precioeq);
   c = genID(selPump.hp);
 } 
 //solar
 if(cotType == 2){
  pyct.cotType=2;
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
  

}//end if full 
pyct.grua=parseInt(grua.value);

if(parseInt(marg.value)<35){
 if(!descValido){authDesMod(); return;}
 if(descValido==1){marg.classList.remove('is-invalid'); pyct.gasInd=parseInt(marg.value)}
}else{pyct.gasInd=parseInt(marg.value)}
alert('ID generado: '+c+' puede Cotizar');
cotBtn.style.display= 'block';
d=document.getElementById('idCot');
d.value = c;   
try {
  localStorage.removeItem('cotData'); 
} catch (error) {
  console.error("Error deleting from localStorage:", error);
}
//button control
  myButton.textContent = "Modificar"; 
  const inputs = document.querySelectorAll('.vLock');
  inputs.forEach(input => {
  input.disabled = true; 
  });
  const disc = document.getElementById('input7')
  disc.disabled = true;
  if(cotType==2){hpMan.disabled=true;}
  buttonState = 1; 
} else if (buttonState === 1) {
  
  myButton.textContent = "Validar"; 
  buttonState = 0; 
  cotBtn.style.display= 'none';
  const inputs = document.querySelectorAll('.vLock');
  inputs.forEach(input => {
  input.disabled = false; 

  });
  const disc = document.getElementById('input7')
  disc.disabled = false
  descValido=false;
  if(cotType==2){hpMan.disabled=false;}
  
}
// end btn cont



}

function cotizar(){ 
    
    pyct.manObr = srvcs[0].precio;
    pyct.matElec = srvcs[1].precio;
    pyct.hpDia = srvcs[3].precio;
    pyct.preKm = srvcs[2].precio;
    pyct.hosp3per = srvcs[4].precio;
    pyct.com3per = srvcs[5].precio;
    pyct.km = parseInt(document.getElementById('input3').value);
    pyct.nombre = document.getElementById("input1").value ;
    pyct.loc = document.getElementById("input2").value;
    pyct.lts = document.getElementById("ltsSelect").value;
    ltsHora = document.getElementById("ltsSelect").value*60*60;      
    pyct.proPozo = document.getElementById("input5").value;
    pyct.cdtP = document.getElementById("input6").value;
    pyct.desc = desc();
    pyct.curr=pumpCurrT;  
    pyct.id = c;
    if(!selPump){selPump={};
    selPump.hp=document.getElementById('solHp').value;

    }
    if(!pyct.motor){
      pyct.motor={};
      pyct.motor.volt=document.getElementById("voltaje").value
    }
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
    const average =Math.round(total / Object.keys(pyct.ltsmes).length);
    pyct.ltsAvg = average.toLocaleString('en-US');
    console.log("Average:", average); 
    saveToLocalStorage('cotData', selPump);
    
  }
  
function actualizar() {
    a = document.getElementById('input0').value;
    alert('Los datos se actualizaron correctamente!');
}
async function gtCot() {
  const url = `api/cmbeos/gtcot`;
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Error fetching data Cots:', error);
  }
}

async function busCot(){
  const busBtn=document.getElementById('buscBtn');
  const cots= await gtCot();
  const divRw=document.getElementById('idDiv')
  const srch= document.createElement('input');
  srch.placeholder='Identificador Existente';
  srch.type='text';
  srch.id='serId';
  busBtn.addEventListener('click',()=>{
    if(srch){
    const id=srch.value
    if(cots){
    const selCot=cots.find(cot => cot.id === id);}else{throw new Error('Fatal no se puede obtener la cot');}
    if(!selCot){
      srch.classList.add('is-invalid')
    }else{
      srch.classList.remove('is-invalid')
    fillForm(selCot);}
    }else{
      busCot();
    }
  });
  divRw.appendChild(srch);  
}

function fillForm(data){
  const nom=document.getElementById('input1'); 
  const loc=document.getElementById('input2');
  const km=document.getElementById('input3');
  const cdt=document.getElementById('input6');  
  const hpMan=document.getElementById('solHp');  
  const distP=document.getElementById('input8');
  const proPozo=document.getElementById('input5');
  const marg=document.getElementById('input7');
  const grua=document.getElementById('input9');
  const myButton = document.getElementById('validar');
  const cotBtn=document.getElementById('acot'); 
  const tipCambio=document.getElementById('input0'); 
  const ltsS=document.getElementById('ltsSelect');
  const descAdd=document.getElementById('descAdd');
  const idCot=document.getElementById('idCot');
  const bomb=document.getElementById('check1');
  const sola=document.getElementById('check2');
  const checkDesA=document.getElementById('checkDesA');
  const desAddT=document.getElementById('descAdd');
  const agC = document.getElementById('check0');
  const dirC = document.getElementById('check6');
  const altC = document.getElementById('check7');
  const allInp =document.querySelectorAll('vLock');

  
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
  }else{accsel.costo=accsel.precio;
        console.log("Acc: ", accsel.Accesorio,"  nuevo precio: ", accsel.costo);
  }
  });
  console.log(accsSel);
 // calcular el precio del cable 
const cable = cals.find(item => item.calibre === selPump.calibre);
const costo=((cable.precioMXN*1.16)*0.48)*0.95;
const costoF=costo*(selPump.altMax+10)
cable.costo=costoF
console.log("sel pump cable calibre ",selPump.calibre," costo  mxn", cable.costo);
 // calacular el precio por metro del equipamiento  
 const tubo={tubo:accsSel[0].Accesorio, precio:accsSel[0].costo};
 console.log("tubo0",tubo);
 const kit={kit:accsSel[1].Accesorio, precio:accsSel[1].costo};
 console.log("kit ",kit);
 const check={check:accsSel[2].Accesorio, precio:accsSel[2].costo};
 console.log("check ",check);
 tubo.precio= selPump.altMax/cants[0]*tubo.precio;
 console.log("selPump.altmax ",selPump.altMax," cants[0]", cants[0],"tubo.precio",tubo.precio);
 kit.precio= cants[1]*kit.precio;
 console.log("kit precio ",kit.precio);
 check.precio= check.precio*cants[2];
 console.log("check precio ",check.precio);

 priceeq= Math.round((tubo.precio+kit.precio+check.precio+cable.costo)/selPump.altMax);
 console.log("precio por metro ", priceeq);
//calcular el precio del equipamiento y regresar los datos para aduntar a selPump
  priceeq=priceeq*parseInt(altPozo.value)
  console.log("precio de equipamiento", priceeq);
  const result=[tubo,kit,check,{precioeq:priceeq}]
  console.log(result);
  return result;

}
function authDesMod(){
  j=1;
  const desc=document.getElementById('input7');
  modalContent=document.getElementById("modalCont");
  modalTit=document.getElementById("staticBackdropLabel");
  modalbutton=document.getElementById("btnPrim");
  modal2button=document.getElementById("2aryBtn");
  xBtn=document.getElementById("xBtn");
  modalbutton.onclick= valiDesc;
  modalbutton.innerHTML= `Autorizar`;
  modal2button.style.display='block';
  xBtn.style.display='block';
  modalTit.innerHTML=`Autorizar descuento de ${desc.value}%`;
  modalContent.innerHTML=`<label for="pwd">Introduce la contraseña de autorización:</label><input id="pwd" type="password" class="form-control"></inpunt>`;
  const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
  myModal.show(); // Show modal
}

async function valiDesc(){
  const desc=document.getElementById('input7');
  const pwdHtm=document.getElementById('pwd');
  const pwd=pwdHtm.value.trim();
    if(pwd===''){
      pwdHtm.classList.add('is-invalid');
      alert('El campo contraseña de autorización no puede estar vacio!')
      return;
    }
  const apiParamsUrl = `api/disc/${pwd}`; 
  console.log('api url:',apiParamsUrl);
  fetch(apiParamsUrl)
  .then(response => response.json())
  .then(auth => {

   console.log('auth:',auth.token);
  if(auth.token==='invalid'){
    if(j>=3){
      modalContent.innerHTML=`<span style="color: red;">limite de intentos regargue la pagina</span>`;
      modalbutton.style.display='none';
      modal2button.style.display='none';
      xBtn.style.display='none';
      
    }else{
    pwdHtm.classList.add('is-invalid');
    descValido=false;
    j=j+1;
    console.log('intento desc:',j);
   }
  }
  else if(auth.token==='valid'){  
    
    alert("Descuento Autorizado");
    descValido=1;
    desc.disabled=true;
    const myModal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
    myModal.hide();
    
   
  } 

  

  });
 
  /*esta funcion se debe llamar desde validar() si gastos ind es menor a 40  pide 
  auth modal password este pwd se podra cambiar en la UI de admin preparar 
  para sacarlo de datosjson por ahora solo poner un pwd  debe regresar descValido=1*/
}

async function genpass(){

  fetch(`api/disc`)
  .then(response => response.json())
  .then(auth => {

    const container = document.getElementById("gPass");
    const p= document.createElement("input");
    const rewrite= document.getElementById("genP");
    console.log(rewrite);
    if(!rewrite){
      console.log('if rewrite');
     
    p.id='genP'
    p.classList.add('form-control');
    p.type = 'text';
    p.placeholder='otp';
    p.disabled = true; 
    const lbl = document.createElement('label');
    lbl.htmlFor = 'genP';
    lbl.textContent = 'OTP:';
    p.value=`${auth.otp}`;
    container.appendChild(p);
    container.appendChild(lbl);
    }
    else{
      console.log('else rewrite');
      rewrite.value=`${auth.otp}`;
    }
  })
  .catch(error => {
    console.error('Error generando otp:', error);
  });

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
     
    pyct.struct.precioP=dataS.panel.precio
     pyct.struct.precioE=dataS.elevada.precio;
     pyct.struct.material= dataS.elevada.material;
     pyct.struct.type=structType;
     console.log(pyct.struct.material,  'precioE: $',pyct.struct.precioE,' precioP: $',pyct.struct.precioP)
  }
  if(structType==2){
    pyct.struct.material=dataS.piso.material;
    pyct.struct.precioE=dataS.piso.precio;
    pyct.struct.precioP=dataS.panel.precio;
    pyct.struct.type=structType;
    console.log(pyct.struct.material, 'precioE: $',pyct.struct.precioE,' precioP: $',pyct.struct.precioP)
  }
  if(structType==3){
    pyct.struct.material=dataS.panel.material;
    pyct.struct.precioP=dataS.panel.precio;
    pyct.struct.type=structType;
    console.log(pyct.struct.material, 'precioP: $',pyct.struct.precioP)
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
 if(hp>2 && pumpCurrT==1){
   
   variadores.forEach(variador=>{
      if(variador.hp==hp){
         solar.variador=variador;
      }
   });
  }else{
    if(pumpCurrT==1){
    solar.variador=variadores[0];
  }}
 
 //gabinete 
 //alt
 if(pumpCurrT==1){
 if(hp>2){
   
gabinetes.forEach(gabinete=>{
     if(gabinete.hp==hp){
        selGab=gabinete;

     }
  });
 }else{
   selGab=gabinetes[0];
 }
 const filtro=distPan+(isNaN(proPozo) ? 0 : proPozo ?? 0);
  if(filtro<150){
       solar.gabinete={hp:selGab.hp,volt:selGab.voltaje,precio:selGab.Sinfiltro,desc:'sin filtro de armonicos'}
  }
  if(filtro>=150 && filtro<500){
    solar.gabinete={hp:selGab.hp,volt:selGab.voltaje,precio:selGab.filtro150,desc:'con filtro de armonicos para 150mts'}
  }
  if(filtro>=500){
    solar.gabinete={hp:selGab.hp,volt:selGab.voltaje,precio:selGab.filtro500,desc:'con filtro de armonicos para 500mts'}
  }
 console.log(solar.gabinete);
 }
 //dir
 if(pumpCurrT==2){
   solar.gabinete={precio:4200, desc:'de corriente directa, controlador de bomba Kolosal'};
 }

 //cantPan
 //alt
  if(pumpCurrT==1){
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
 //dir
   if(pumpCurrT==2){
     solar.cantPan={cantidadPaneles:selPump.cantPan};
     solar.tipPan=paneles.tipoPaneles;
     solar.pot=paneles.potencia;
     solar.precio=paneles.precio*tipCam;
 }
console.log(solar);
return solar;
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
if(cdt>legendText){cdtMax.textContent = `(Elegir otro Volumen de agua, CDT Max ${legendText}mts)`; cdtFlg=1;}
else{cdtMax.textContent = `(CDT Max ${legendText}mts)`; cdtFlg=0; }
}

function genID(selHp) {
  const nom = document.getElementById('input1').value;
  const vend = document.getElementById('vendSelect').value;
  const nom3 = nom.substring(0, 3).toUpperCase();
  const vend3 = vend.substring(0, 3).toUpperCase();
  const finalID = `BomSol${cotType}-${nom3}-${vend3}-${selHp}`;

  return finalID;
}

function selectVend(data,id){

 for(const rep of data){
    if(rep.id == id){
      return rep;
    }
  }
  console.error(`No existe el vendedor con id: ${id}`);
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



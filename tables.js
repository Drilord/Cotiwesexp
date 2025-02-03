let jason, cotis, a=1, buttonState = 0, k, authL, KORpump, kolosP,dtCot ;
/////////////////////////////////////////LOGIN///////////////////////////////////////////

async function authMain(){     
  try {
      const response = await fetch('api/vende/amoen')
      if (response.ok) {
        const data = await response.json(); 
        const auth = data?.userData 
        authL=auth.aLev
        let dispLevel;
        if(authL===3){dispLevel='.dirW'}
        if(authL===2){dispLevel='.gere'}
        if(authL===1){dispLevel='.comp'}
        if(authL===0){
         alert('Este usuario no tiene acceso')
         const UI=document.getElementById('main');
         UI.style.display='none';
         window.location.href = '/';
         return;}
        init(); 
        const authdisp=document.querySelectorAll(dispLevel);
        authdisp.forEach(element=>{
           element.style.display='block';
        });
      } else if (response.status === 401) {
         
        k=1
        modalContent=document.getElementById("modalCont");
        modalTit=document.getElementById("staticBackdropLabel");
        modalbutton=document.getElementById("btnPrim");
        modalX=document.getElementById('xBtn');
        modalClsBtn=document.getElementById('2aryBtn');
        modalX.style.display='none';
        modalClsBtn.style.display='none';
        modalbutton.onclick = valLogin;
        modalbutton.innerHTML = `Ingresar`;
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
         const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop')); // traer modal instance
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
    usrHtm.classList.add('is-invalid')
    alert('EL campo Contraseña no puede estar vacio')
    return;
  }
  const login= {p:pwd,u:usr}
  fetch('api/vende',{
    method:'POST',
    headers:{'Content-Type': 'application/json'},  
    body: JSON.stringify(login)
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => {throw err});
    }
    return response.json(); 
  })
  .then(auth => {
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
    }
  }
  else if(auth.token!='invalid'&& auth.id!=null){ 
   authL=auth.authL
   let dispLevel;
   if(authL===3){dispLevel='.dirW'}
   if(authL===2){dispLevel='.gere'}
   if(authL===1){dispLevel='.comp'}
   if(authL===0){
    usrHtm.classList.add('is-invalid')
    alert('Este usuario no tiene acceso')
    window.location.href = '/';
    return;}
    init();  
    const authdisp=document.querySelectorAll(dispLevel);
   authdisp.forEach(element=>{
      element.style.display='block';
   });
   const myModal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
   myModal.hide();

  } 

  }).catch(error => {
    console.error('Error en auth de usuario:', error);
  });

    
  
}
/////////////////////////////////////////Menu fill///////////////////////////////////////////

async function bomSol() {
  const url = `api/bombSol/`;
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Error fetching data bombSol:', error);
  }
}

async function gtus() {
  const url = `api/cmbeos/gtus`;
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Error fetching data bombSol:', error);
  }
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


async function init(){
  jason = await bomSol(); 
  PopulateMenus();
};

  function PopulateMenus(){ // Use const for function expressions
    
      KORpump = jason.bomSol.bombas;
      kolosP = jason.bomSol.bombasKolosal;
      eqBomba=jason.bomSol.equipamientoBomba.descarga;
      vendedores=jason.bomSol.vendedores 
      pupUls(KORpump,'korUl');
      pupUls(kolosP,'kolosUl');
      pupUls(eqBomba,'eqBombaUl');
      pupUls('','cableMenu');
      pupUls('','motoresM');
      pupUls('','servicesM')
      pupUls('','gabM');
      pupUls('','varM');
      pupUls('','panM');
      pupUls('','addUsr');
      pupUls('','modUsr');
      pupUls('','cots')
      ;

  }
function pupUls(data,ul){
    const Ul = document.getElementById(ul);
if(ul=='korUl'|| ul=='kolosUl'){
    data.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.addEventListener('click', () =>  crtShwPumps(item.rangMod,data,ul)); // los valores se pasan en un listener no en el html
      a.href = '#';
      
      a.textContent =item.rangMod;
      li.appendChild(a);
      Ul.appendChild(li);
    });
  }else if(ul=='eqBombaUl'){
    Object.keys(data).forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.addEventListener('click', () =>  crtShwEq(item,data,ul)); // los valores se pasan en un listener no en el html
      a.href = '#';
      a.textContent = `${item}"`;
      li.appendChild(a);
      Ul.appendChild(li);
  });
  }else if(ul=='cableMenu'){
    Ul.addEventListener('click', () =>  createTables('cableSumergible',ul)); 
  }else if(ul=='motoresM'){
    Ul.addEventListener('click', () =>  createTables('motores',ul)); 
  }else if(ul=='servicesM'){
    Ul.addEventListener('click', () =>  createTables('servicios',ul)); 
  }else if(ul=='gabM'){
    Ul.addEventListener('click', () =>  createTables('gabinetesArmados',ul)); 
  }else if(ul=='varM'){
    Ul.addEventListener('click', () =>  createTables('variadorSolar',ul)); 
  }else if(ul=='panM'){
    Ul.addEventListener('click', () => { 
      createTables('cantidadxHP',ul);
      createTables('paneles','panelT');
      //createPanTab();
    }); 
  }else if(ul=='addUsr'){
    Ul.addEventListener('click', () =>{ 
      addUsr(ul);
    }); 
    
  }else if(ul=='modUsr'){
    Ul.addEventListener('click', async () =>{ 
     const dataUs= await gtus();
     createTables(dataUs,ul);
    }); 
    
  }else if(ul=='cots'){
    Ul.addEventListener('click', async () =>{ 
     dtCot= await gtCot();
     createTables(dtCot,ul);
    }); 
  }
}

/////////////////////////////////////////////////////Add user////////////////////////////////////////
 async function addUsr(ul,edtUsr){
  let NewUser;
  clearTables(["tKOR","tEQ","tVen"]);  
  const usrCont=document.getElementById('addUsrDiv');
  usrCont.style.display='flex';
  const vendCont = document.getElementById('addVenDiv');
  const vFlag =  document.getElementById('chkVend'); 
  const svBtn = document.getElementById('usrSaveBtn'); 
  const cnclB = document.getElementById('usrCnclBtn'); 
  const usrHtm = document.getElementById('adduser');
  const pwdHtm = document.getElementById('addpw');
  const permHtm = document.getElementById('perm');
  const veNaHtm = document.getElementById('veNom');
  const veTlHtm = document.getElementById('venTel');
  const veMaHtm = document.getElementById('venMail');
  if(ul==='addUsr'){
    vFlag.addEventListener('change',()=>{
      vendCont.style.display= vFlag.checked? 'flex':'none'
    });
  }
    let isCreatingUser = false, mod=false;
    svBtn.addEventListener('click', async () => {
      if (isCreatingUser) return;
      isCreatingUser = true;
      if(!edtUsr){
      NewUser = crtUsr();
      }else{
      NewUser = edtUsr;  
      mod=true;
      }
      if(NewUser){
      const created = await crtDbUsr(NewUser,mod);
      if (created === true) {
      const creado=ul=='addUsr'? 'creado':'modificado';
      alert(`Usuario ${creado} exitosamente`);
      usrHtm.value = '';
      pwdHtm.value = '';
      permHtm.value = '';
      veNaHtm.value = '';
      veTlHtm.value = '';
      veMaHtm.value = '';
      vFlag.checked = false;
      vendCont.style.display = 'none';
      } else {
      alert('Error al crear usuario');
      }
      }
      isCreatingUser = false;
    });


  
  if(ul==='edtUsr'){
      cnclB.style.display='flex';
      cnclB.addEventListener('click',async()=>{
        const dataUs= await gtus();
        createTables(dataUs,'modUsr');
        cnclB.style.display='none';
      })
      const venId=edtUsr.usr.vendId
      usrHtm.value = edtUsr.usr.mail;
      pwdHtm.value = edtUsr.usr.pw;
      permHtm.value = edtUsr.usr.auth;
      veNaHtm.value =  venId==''?'':edtUsr.vend.nombre;
      veTlHtm.value = venId==''?'':edtUsr.vend.tel;
      veMaHtm.value = venId==''?'':edtUsr.vend.mail;
      vFlag.checked = venId==''?false:true;
      vendCont.style.display= vFlag.checked? 'flex':'none'
  }
 
 }
  
function crtUsr(){
  const vFlag =  document.getElementById('chkVend'); 
  const usrHtm = document.getElementById('adduser');
  const pwdHtm = document.getElementById('addpw');
  const permHtm = document.getElementById('perm');
  const veNaHtm = document.getElementById('veNom');
  const veTlHtm = document.getElementById('venTel');
  const veMaHtm = document.getElementById('venMail');
  let usr = usrHtm.value.trim();
  let pwd = pwdHtm.value.trim();
  let usrLv = parseInt(permHtm.value);
  let venom = veNaHtm.value.trim();
  let vetel = veTlHtm.value.trim();
  let vemail= veMaHtm.value.trim();

  usr = usr === '' ? null : usr;
  pwd = pwd === '' ? null : pwd;
  venom = venom === '' ? null : venom;
  vetel = vetel === '' ? null : vetel;
  vemail = vemail === '' ? null : vemail;
  usrLv = usrLv === '' ? null : usrLv;
  if (usr == null) {
    usrHtm.classList.add('is-invalid');
    alert('El campo Usuario no puede estar vacío');
    return;
  }else{
    usrHtm.classList.remove('is-invalid');
  }
  if (pwd == null) {
    alert('El campo Contraseña no puede estar vacío');
    return;
  } else {
    pwdHtm.classList.remove('is-invalid');
  }
  if (vFlag.checked && venom == null) {
    veNaHtm.classList.add('is-invalid');
    alert('El campo Vendedor no puede estar vacío');
    return;
  } else {
    veNaHtm.classList.remove('is-invalid');
  }

  if (vFlag.checked && vetel == null) {
    veTlHtm.classList.add('is-invalid');
    alert('El campo Telefono no puede estar vacío');
    return;
  } else {
    veTlHtm.classList.remove('is-invalid');
  }

  if (vFlag.checked && vemail == null) {
    veMaHtm.classList.add('is-invalid');
    alert('El campo E-mail no puede estar vacío');
    return;
  } else {
    veMaHtm.classList.remove('is-invalid');
  }

  const newUser = {};
  newUser.usr={
    mail: usr,
    pw: pwd,
    auth: usrLv,
  };
  const venFlag= vFlag.checked; 
  console.log('venflag checked',venFlag);
  if(venFlag===true){
  newUser.flag=venFlag; 
  newUser.vend={
    nombre:venom,
    tel:vetel,
    mail:vemail
  };
 }else{
  newUser.flag=false;
  newUser.vend=null;
 }
 console.log('new user',newUser);
 return newUser;

}

async function crtDbUsr(newUser,mod){
 
  try {
    if(!mod){
    const response = await fetch('api/cmbeos/newven', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });
  }else if(mod===true){
    const endpoint = `api/cmbeos/newven/${newUser.vend.id}`;
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });


  }
    const result = await response.json();
    
    return result.succ===true;

    } catch (error) {
    console.error('Error creating user:', error);
    return false;
  }

  
}

async function  modUsr(vId,usrM){
  console.log('tRow=>usrM',usrM);
  const rep =selectVend(jason.bomSol.vendedores,vId);
  const venFlag= !vId? false:true;
  const edtUsr = {
    usr:usrM,
    flag:venFlag,
    vend:rep
  };
  console.log('edtUsr',edtUsr);
  
  addUsr('edtUsr',edtUsr);
}
async function dltUser(venId,usrId) {
  //hacer delete a la api con el id en el endpoint nadamas elegir ese objeto borrarlo 
}

  ///SHOW TABLES////////////////////////////////////////////////////////////////////////////////////
  
  function clearTables(classes) {
    classes.forEach(cls => {
      const tables = document.querySelectorAll(`.${cls}`);
      tables.forEach(table => {
        table.remove();
      });
    });
    const container=document.getElementById('addUsrDiv');
  container.style.display='none';
 
  }

  function crtVend(rep){
    console.log('rep crtven',rep);
    clearTables(["tVen"]);
      const container = document.getElementById("paSubTablas");
      const table = document.createElement("table");
      table.classList.add("table", "tVen","table-success", "table-striped");
      table.id='reps';
      const caption = document.createElement("caption");
      caption.textContent = `Datos de vendedor`;
      caption.style.fontWeight = 'bold'; // Make the caption text bold
      table.appendChild(caption);
      keys = Object.keys(rep);
      const headerRow = createHeaders(keys);
      table.appendChild(headerRow);
      const tbody = document.createElement("tbody");
        const row = document.createElement("tr");
        Object.entries(rep).forEach(([key,value])=> {
          const cell = document.createElement("td");
          cell.textContent = value;
          row.appendChild(cell);     
       });  
        tbody.appendChild(row);  
      
      table.appendChild(tbody);

      
      container.appendChild(table);
    
   
  }

  function createTables (anchor,ul){
    if(ul!='panelT'){
    clearTables(["tKOR","tEQ","tVen"]);
    }
    const tabCont= ul== 'panM'? 'paSubTablas': 'paTablas';
    const container = document.getElementById(tabCont);
    let captntext, tId, tabArr,keys;
    tId = anchor;
    if(ul=='cableMenu'){
      tabArr  = jason.bomSol.equipamientoBomba
      captntext = 'Cable Sumergible';
      
    }else if(ul=='motoresM'){
      tabArr  = jason.bomSol
      captntext = 'Motores KOR';
      
    }else if(ul=='servicesM'){
      tabArr  = jason.bomSol
      captntext = 'Servicios y Viaticos';
    }else if(ul=='gabM'){
      tabArr  = jason.bomSol.solar
      captntext = 'Gabinetes Armados';
    }else if(ul=='varM'){
      tabArr  = jason.bomSol.solar
      captntext = 'Variadores Solares';
    }else if(ul=='panM'){
      tabArr  = jason.bomSol.solar.paneles
      captntext = 'Paneles por HP';
    }else if(ul=='panelT'){
      tabArr  = jason.bomSol.solar
      captntext = 'Tipo de Panel';
    }else if(ul=='modUsr'){

      tabArr ={ users:[...anchor]};
      anchor='users';
      tId='UserMod'
      console.log('anchor',anchor);
      console.log('tabArr',tabArr);
      captntext = 'Usuarios';
    }else if(ul=='cots'){
      tabArr ={ cots:[...anchor]};
      venSel=document.getElementById('venFilt');
      venSel.addEventListener('change',()=>{
        const filtVen=venSel.value;
        if(filtVen=='all'){
          createTables(dtCot,ul);
        }else{
          const filtCots=anchor.filter(cot=>cot.vendId==filtVen);
          createTables(filtCots,ul);
        }
      }); 
      anchor='cots';
      tId='Cots'
      captntext = 'Cotizaciones';
    }
    /////create table
    const table = document.createElement("table");
    table.classList.add("table", "tKOR","table-success", "table-striped");
    table.id = tId;
    const caption = document.createElement("caption");
    caption.textContent = captntext
    caption.style.fontWeight = 'bold';
    table.appendChild(caption);
    if (ul == 'panelT') {
      const keysArray = Object.keys(tabArr[anchor]);
      const tabArrCopy = { ...tabArr[anchor] };
      delete tabArrCopy[keysArray[keysArray.length - 1]];
      keys = Object.keys(tabArrCopy);
      tabArr[anchor] = [tabArrCopy];
      console.log('tabArr panelT', tabArr);
    } else {
      console.log('ul', ul);
      console.log('tabArr', tabArr);
      keys = Object.keys(tabArr[anchor][0]);
    }
    const headerRow = createHeaders(keys);
    table.appendChild(headerRow);
  
    const tbody = document.createElement("tbody");
    tabArr[anchor].forEach((tRow) => {
      const row = document.createElement("tr");
      Object.entries(tRow).forEach(([key,value])=> {
        if(ul=='modUsr' && key=='auth'){
          const cell = document.createElement("td");
          cell.textContent = value==0? "Vendedor":value==1?'Compras':value==2?'Gerencia Ventas':'Dirección';
          row.appendChild(cell);
        }else if(ul=='modUsr' && key=='vendId'){
          if(value!=''){
          const cell = document.createElement("td");
          const venBtn = document.createElement("button");
          venBtn.classList.add("btn", "btn-success", "venbtn");
          venBtn.textContent='Ver Datos';
          venBtn.addEventListener("click", () => {
           const rep =selectVend(jason.bomSol.vendedores,value);
           crtVend(rep);
          });
          cell.appendChild(venBtn);
          row.appendChild(cell);}else{
                                  const cell = document.createElement("td");
                                  cell.textContent = '';
                                  row.appendChild(cell);
                                }

        }else{  
         const cell = document.createElement("td");
         cell.textContent = value;
         row.appendChild(cell);
         }
      });
      ////////////////////////////////////////////////CORREGIR para ser comun para toda tabla 
      const editCell = document.createElement("td");
      const editButton = document.createElement("button");
      editButton.classList.add("btn", "btn-success", "editbtn");
      editButton.textContent = "Editar";
      editButton.addEventListener("click", () => {
      
      if(ul=='cableMenu'){
      modelo = String(tRow.calibre);
      }
      if(ul=='motoresM'){
      modelo = String(tRow.id);
      }
      if(ul=='servicesM'){
      modelo = tRow.servicio;
      }
      if(ul=='gabM'){
      modelo = String(tRow.id);
      }
      if(ul=='varM'){
      modelo = String(tRow.id);
      }
      if(ul=='panM'){
      modelo = String(tRow.id);
      }
      if(ul=='panelT'){
      modelo = tRow.tipoPaneles;
      }
      if(ul=='modUsr'){
        modelo = tRow.id;
      }
      if(ul!='modUsr'){
      const origRow = row.cloneNode(true); 
       editRow(modelo,tId,ul,keys,origRow);
      }else{
        
        modUsr(tRow.vendId,tRow);
      }
      });
      editCell.appendChild(editButton);
      row.appendChild(editCell);
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    container.appendChild(table);

  
  }

  function createHeaders(keys) {
    const headerRow = document.createElement("tr");
    keys.forEach(key => {
      if (key === 'equipB') {
        const th = document.createElement("th");
        th.textContent = 'Equipo Bomba';
        headerRow.appendChild(th);
      }else if (key === 'pw') {
        const th = document.createElement("th");
        th.textContent = 'Contraseña';
        headerRow.appendChild(th);
      }else if (key === 'vendId') {
        const th = document.createElement("th");
        th.textContent = 'Vendedor';
        headerRow.appendChild(th);
      }else if (key === 'mail') {
        const th = document.createElement("th");
        th.textContent = 'Usuario';
        headerRow.appendChild(th);
      }else if (key === 'auth') {
        const th = document.createElement("th");
        th.textContent = 'Tipo';
        headerRow.appendChild(th);
      } else if (key !== 'eqCants') {
        const th = document.createElement("th");
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        headerRow.appendChild(th);
      }
    });
    return headerRow;
  }


  function showEq(pump,descE){

    clearTables(["tEQ","tVen"]);
    const ids=pump.equipB;
    const cants=pump.eqCants
    eqBomba=jason.bomSol.equipamientoBomba;
    const container = document.getElementById("paSubTablas");
          const table = document.createElement("table");
      table.classList.add("table", "tEQ","table-success", "table-striped");
      table.id='eqBomba'+pump.Modelo;
      const caption = document.createElement("caption");
      caption.textContent = `Equipo de bomba: ${pump.Modelo} - Descasrga ${descE}" `;
      caption.style.fontWeight = 'bold'; // Make the caption text bold
      table.appendChild(caption);
      const headerRow = document.createElement("tr"); 
      const th0 = document.createElement("th");
      th0.textContent = 'Id';
      headerRow.appendChild(th0);
        const th1 = document.createElement("th");
        th1.textContent = 'Accesorio';
        headerRow.appendChild(th1);
        const th2 = document.createElement("th");
        th2.textContent = 'Cantidad';
        headerRow.appendChild(th2);
      table.appendChild(headerRow);
      const accDisp = eqBomba.descarga[descE];
      const accsSel = accDisp.filter(accesorio => ids.includes(accesorio.id));
      const tbody = document.createElement("tbody");
      accsSel.forEach((acc) => {
         const row = document.createElement("tr");
          const cell = document.createElement("td");
          cell.textContent = acc.id;
          row.appendChild(cell);
          const cell2 = document.createElement("td");
          cell2.textContent = acc.Accesorio;
          row.appendChild(cell2);
          const cell3 = document.createElement("td"); 
          cell3.textContent = cants[ids.indexOf(acc.id)];
          row.appendChild(cell3);
          
         tbody.appendChild(row);  
      });
      table.appendChild(tbody);

      
      container.appendChild(table);
    
   
  }

function crtShwEq(ancVal,dat,ul){
  clearTables(["tKOR","tEQ","tVen"]);  
  const container = document.getElementById("paTablas");
  const tabArr = Object.entries(dat).reduce((acc, [key, value]) => {
    if (key === ancVal) {
      acc[key] = value;
    }
    return acc;
  }, {});
  const table = document.createElement("table");
  table.classList.add("table", "tKOR","table-success", "table-striped");
  const tId = ancVal;
  table.id = tId;
  const caption = document.createElement("caption");
  caption.textContent = `Accesorios para descarga de ${Object.keys(tabArr)[0]}"`;
  caption.style.fontWeight = 'bold';
  table.appendChild(caption);
  const keys = Object.keys(tabArr[ancVal][0]);
    const headerRow = createHeaders(keys);
      table.appendChild(headerRow);
      const tbody = document.createElement("tbody");
      tabArr[ancVal].forEach((acc) => {
        const row = document.createElement("tr");
        Object.entries(acc).forEach(([key,value])=> {
          const cell = document.createElement("td");
          cell.textContent = value===false?'No':value===true?'Si':value;
          row.appendChild(cell);
        });
        const editCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.classList.add("btn", "btn-success", "editbtn");
        editButton.textContent = "Editar";
        editButton.addEventListener("click", () => {
        const origRow = row.cloneNode(true);
        editRow(String(acc.id),tId,ul,keys,origRow);
        
        });
        editCell.appendChild(editButton);
        row.appendChild(editCell);
        tbody.appendChild(row);
      });
      table.appendChild(tbody);
      container.appendChild(table);
}



  function crtShwPumps(modRang,dat,ul) {
    clearTables(["tKOR","tEQ","tVen"]);
   
      const container = document.getElementById("paTablas");
      const tabArr = dat.find(arrT =>  arrT.rangMod=== modRang);
      const table = document.createElement("table");
      table.classList.add("table", "tKOR","table-success", "table-striped");
      table.id =modRang;
      const caption = document.createElement("caption");
      caption.textContent = `Bombas Serie - ${tabArr.rangMod} - ${tabArr.lts} lt/s - Descarga ${tabArr.descarga}" `;
      caption.style.fontWeight = 'bold'; // Make the caption text bold
      table.appendChild(caption);
      //  header row de la tabla
      const keys = Object.keys(tabArr.modelos[0]);
      const headerRow = createHeaders(keys);
      table.appendChild(headerRow);

      // populate tablas 
      const tbody = document.createElement("tbody");
      tabArr.modelos.forEach((pump) => {
        const row = document.createElement("tr");
        Object.entries(pump).forEach(([key,value])=> {
          const cell = document.createElement("td");
          if(key=='equipB'){
        const editEqBtn = document.createElement("button");
        editEqBtn.classList.add("btn", "btn-success", "verEq");
        editEqBtn.textContent = `Ver Equipo`;
        editEqBtn.addEventListener("click", () => {
        showEq(pump,tabArr.descarga);
        });
        cell.appendChild(editEqBtn);
        row.appendChild(cell);
          }else if(key!='eqCants'){
          cell.textContent = value;
          row.appendChild(cell);
          } 
          
        });
        const editCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.classList.add("btn", "btn-success", "editbtn");
        editButton.textContent = "Editar";
        editButton.addEventListener("click", () => {
        const origRow = row.cloneNode(true);
        editRow(pump.Modelo,modRang,ul,keys,origRow);
        });
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        tbody.appendChild(row);
      });
      table.appendChild(tbody);
      
      container.appendChild(table);
  }

/////////////////////////////////////////EDIT ROWS///////////////////////////////////////////

 


  function editRow(modelo, tId,ul,keys,originalRow) {
    console.log('tId:', tId);
    console.log('modelo:', modelo);
    const table = document.getElementById(tId);
    console.log('Table',table);
    const row = Array.from(table.rows).find(row => row.cells[0].textContent === modelo);
    const cells = Array.from(row.cells).slice(1, -1); // Omit the first cell  and the last cell (edit button)
    cells.forEach((cell, index) => {
      if(cell.textContent != `Ver Equipo`){
        if(cell.textContent == `No` || cell.textContent == `Si`){ 
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.classList.add("form-check-input");
          checkbox.checked = cell.textContent === 'Si';
          cell.textContent = '';
          cell.appendChild(checkbox);
        } else if (keys[index + 1] === 'precio'||keys[index + 1] === 'precioMXN'|| keys[index + 1] ==='cantidadPaneles'||
          keys[index + 1] === 'Sinfiltro'||keys[index + 1] ==='filtro150'||keys[index + 1] ==='filtro500'
        ) {
          const input = document.createElement("input");
          input.type = "number";
          input.classList.add("form-control");
          input.value = parseFloat(cell.textContent);
          cell.textContent = '';
          cell.appendChild(input);
        }
      }
    });
    
    // Disable  edit button y los de ver equip
    const editButton = document.querySelectorAll(".editbtn, .verEq");
    editButton.forEach(btn=>{
    btn.disabled = true;
    });


    const saveButton = document.createElement("button");
    saveButton.classList.add("btn", "btn-primary");
    saveButton.textContent = "Guardar";
    saveButton.addEventListener("click", () => {saveRow(row, modelo, tId,ul,keys,originalRow);});

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("btn", "btn-secondary");
    cancelButton.textContent = "Cancelar";
    cancelButton.addEventListener("click", () => cancelEdit(row, modelo, tId,originalRow));

    const cell = document.createElement("td");
    cell.appendChild(saveButton);
    cell.appendChild(cancelButton);
    row.appendChild(cell);
  }

  function cancelEdit(row, modelo, tId,originalRow) {
    const table = document.getElementById(tId);
 
    const originalCells = Array.from(originalRow.cells).slice(1, -1); // Omit the first cell (modelo) and the last cell (edit button)
    const currentCells = Array.from(row.cells).slice(1, -1); // Omit the first cell (modelo) and the last cell (save and cancel buttons)
   
    originalCells.forEach((cell, index) => {
      if(currentCells[index].textContent != `Ver Equipo`){
      currentCells[index].textContent = cell.textContent; // Restore original cell values
     }
    });
    row.deleteCell(-1); // Remove the save and cancel buttons cell
    const editButton = document.querySelectorAll(".editbtn, .verEQ");
    editButton.forEach(btn=>{
    btn.disabled = false;
    });
  }
/////////////////////////////////////////SAVE ROWS///////////////////////////////////////////
async function saveRow(row, modelo, tId,ul,keys,originalRow) {
  const cells = Array.from(row.cells).slice(1, -1);
  let changeObj = {};
  const priceIndex = keys.indexOf('precio');
  if (priceIndex !== -1) {
    const priceCell = cells[priceIndex];
    const priceInput = priceCell.firstChild;
    if (priceInput && priceInput.type === 'number') {
      
      changeObj['precio'] = parseFloat(priceInput.value);
    }
  }
  
  const originalCells = Array.from(originalRow.cells).slice(1, -1); // Omit the first cell (anchor) y (save y cancel)
  const currentCells = Array.from(row.cells).slice(1, -1); 
  cells.forEach((cell, index) => {
    if (index < cells.length - 1) { // Skip the last cell edit 

      const input = cell.firstChild;
      if (input.textContent!=`Ver Equipo`){
        if (input.type === 'checkbox') {
          cell.textContent = input.checked?'Si':'No';
        }
        if (input.type === 'number') {
          cell.textContent = input.value;
        }             
      }
    } 
  });
  row.deleteCell(-1); // Remove the save and cancel buttons cell
  const editButton = document.querySelectorAll(".editbtn, .verEq");
    editButton.forEach(btn=>{
    btn.disabled = false;
    });
  
  const changes = {};
  
  originalCells.forEach((cell, index) => {

    if (cell.textContent !== currentCells[index].textContent) {
      console.log('orig cell : ', cell.textContent,' curr cell : ', currentCells[index].textContent);
      if(currentCells[index].textContent=='Si'||currentCells[index].textContent=='No'){

       changeObj['mxn'] = currentCells[index].textContent == 'Si' ? true : false;
   
      }else{

        changeObj[keys[index + 1]] = parseFloat(currentCells[index].textContent);
       
      }
    }
  });
  if (Object.keys(changeObj).length > 0) {
    changes.uptValue=changeObj;
  }
  
if (Object.keys(changes).length === 0) {
  alert('No se hizo ningun cambio!');
  return;
}else{
  changes.header={
        rangMod: tId,
        modelo: modelo,
        tUpt:ul
      };
      console.log('Changes:', changes);
       fetch('api/cmbeos',{
    method:'PUT',
    headers:{'Content-Type': 'application/json'},  
    body: JSON.stringify(changes)
  }).then(response =>{
    if (!response.ok) {
      return response.json().then(err => {throw err});
    }
    return response.json(); 
  })
  .then(saved => {
    console.log('saved:',saved);
    if(saved.succ === true){
      alert('Cambios guardados en la base de datos');
      bomSol().then(updatedData => {
        jason = updatedData;
      });
    }else{
      alert('Error al guardar los cambios:', saved?.message);
    }
  }).catch(error => {
    alert('Error al guardar los cambios:', error);
    
    console.error('Error en auth de usuario:', error);
  });
}



 
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

  


/*
async function createUsr(){
 
debe postear la data en node y al json 
Access the vendedores array
const vendedores = jsonData.vendedores;

Get the length of the vendedores array
const vendedoresLength = vendedores.length; 

validar que el usr este asociado a un vendedor para hacer match con los ids aunque puede ser 
mejor que cada user tenga su propio id y un sales red asociado o puede no tenerlo
pero lo de arriba servira parra asignar el siguiente ID de user y puede ser que en el form pongamos un switch de
asociar vendedor si esta apagado lee bombsol vendedores y postea uno nuevo con un  id y asociado a un user si no pues pasan bye


}
*/
/*
 if (buttonState === 0) {
 // control boton KOR
  korBtn.textContent=`Esconder div KOR`
  buttonState = 1;
  }else if (buttonState === 1) {
  
    korBtn.innerHTML=`Mostrar Bombas KOR` 
    const htmKOR = document.getElementById('tKOR');
    taKOR.forEach(table=>{
    table.style.display='none';
    });
    buttonState = 0; 
  }//*/


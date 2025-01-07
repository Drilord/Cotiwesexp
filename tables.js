let jason, cotis, a=1, buttonState = 0, k;
//  en la linea de abajo borrar pimer  /* para localhost ponerlo para ip 
const hostUrl = "localhost"; /*/ "172.31.3.233"; //*/
/*Login*/
/*
function authMain(){
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
                       </inpunt>
                       <label for="pwdA">
                       Introduce la contraseña de autorización:
                       </label>
                       <input id="pwdA" type="password"  class="form-control" placeholder="Contraseña:">
                       </inpunt>`;
  const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop')); // traer la modal instance
  myModal.show(); // Show the modal programmatically
  
}
async function valLogin(){
  const usrHtm=document.getElementById('usr');
  const pwdHtm=document.getElementById('pwdA');
  let usr=usrHtm.value.trim();
  let pwd=pwdHtm.value.trim();
  usr = usr === '' ? null : usr;  
  pwd = pwd === '' ? null : pwd;
  if(usr==null){
    ifusrHtm.classList.add('is-invalid')
    alert('EL campo Usuario no puede estar vacio')
    return;
  }
  if(pwd==null){
    ifusrHtm.classList.add('is-invalid')
    alert('EL campo Contraseña no puede estar vacio')
    return;
  }
  const apiParamsUrl = `http://${hostUrl}:3000/vende/${usr}/${pwd}`; 
  console.log('api url:',apiParamsUrl);
  fetch(apiParamsUrl)
  .then(response => response.json())
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
                       <input id="usr" type="text"  class="form-control is-invalid" placeholder="Usr">
                       </inpunt>
                       <label for="pwdA">
                       Datos incorrectos
                       </label>
                       <input id="pwdA" type="password"  class="form-control is-invalid">
                       </inpunt>`;
    k=k+1;
    console.log('auth try:',k);
   }
  }
  else if(auth.token!='invalid'&& auth.id!=null){  
    
   console.log('vend Id', auth.id); 
   repId=auth.id
   const vendSelect = selectVend(reps,repId);
   const salesRep = document.getElementById('vendSelect');
   salesRep.value= vendSelect?.nombre
   pyct.rep= vendSelect;
   const myModal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
   myModal.hide();

  } 

  });

    
  
}*/
      
const url=`http://${hostUrl}:3000/bombSol/`;
   fetch(url)
  .then(response => response.json())
  .then(jsonData => { 
    jason=jsonData
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  function KOR() {
    const korBtn = document.getElementById('KORbtn');
    if (buttonState === 0) {
    const container = document.getElementById("KOR");
    const exiTab = document.getElementById('KOR1'); 
    if(!exiTab){
    jason.bomSol.bombas.forEach(bomba => {
   
      const table = document.createElement("table");
      table.classList.add("table", "tKOR", "table-striped");
      table.id="KOR"+a;
    
  
      //  header row de la tabla
      const headerRow = document.createElement("tr");
      headerRow.innerHTML = `<th>Modelo</th><th>HP</th><th>Precio</th><th>Altura Máxima</th><th>Calibre</th>`;
      table.appendChild(headerRow);
  
      // populate tablas 
      bomba.modelos.forEach((pump) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${pump.Modelo}</td>
          <td>${pump.hp}</td>
          <td>${pump.precio}</td>
          <td>${pump.altMax}</td>
          <td>${pump.calibre}</td>
        `;
        table.appendChild(row);

      });
      
      //table caption modificar para que se vea mas perro y este arriba de cada tabla 
      const caption = document.createElement("caption");
      caption.textContent = `Bombas de - ${bomba.lts}lt/s`;
      table.appendChild(caption);
  
      // Append the table to the container
      container.appendChild(table);
      a=a+1;
    });
  } else { //este pedo las muestra si ya existen y se escondieron con el boton
    const taKOR = document.querySelectorAll('.tKOR');
    taKOR.forEach(table=>{
    table.style.display='block';
    });
  }
  // control boton KOR
  korBtn.textContent=`Esconder Bombas KOR`
  buttonState = 1;
  }else if (buttonState === 1) {
  
    korBtn.innerHTML=`Mostrar Bombas KOR` 
    const taKOR = document.querySelectorAll('.tKOR');
    taKOR.forEach(table=>{
    table.style.display='none';
    });
    buttonState = 0; 
  }
  

  }
  
async function genpass(){
  fetch(`http://${hostUrl}:3000/disc`)
  .then(response => response.json())
  .then(auth => {

    const container = document.getElementById("gPass");
    const p= document.createElement("inpunt");
    const rewrite= document.getElementById("genP");
    console.log(rewrite);
    if(!rewrite){
      console.log('if rewrite');
     
    p.id='genP'
    p.classList.add('form-control');
    p.type = 'text';
    p.disabled = true; 
    const lbl = document.createElement('label');
    lbl.htmlFor = 'genP';
    lbl.textContent = 'Autogenerado';
    p.textContent=`OTP: ${auth.otp}`;
    container.appendChild(p);
    }
    else{
      console.log('else rewrite');
      rewrite.textContent=`OTP: ${auth.otp}`;
    }
  })
  .catch(error => {
    console.error('Error generando otp:', error);
  });

}
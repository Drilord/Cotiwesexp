let a ,b,c,d,e,f,g,h,i,j,k,l;

/*
navigator.storage.estimate().then(estimate => {
  console.log('Quota:', estimate.quota);
  console.log('Usage:', estimate.usage);
});*/

document.addEventListener('DOMContentLoaded', () => {
    const Bomba = document.getElementById('bomba');
    const idP = document.getElementById('idProyecto');
    const nomP = document.getElementById('nomP');
    const descP = document.getElementById('descP');
    const nomV = document.getElementById('nomV');
    const nomVf = document.getElementById('nomvf');
    const tel = document.getElementById('tel');
    const mail =document.getElementById('mail');
    const hpGraph =document.getElementById('hpGraph');
    if(Bomba && idP && nomP && descP && nomV && tel && mail && nomVf ){
    const myObject = getObjectFromLocalStorage    ('cotData');
    if (myObject) {
    const pumpModel= myObject.Modelo;
    const pumpHP= myObject.hp;
    const proyT= myObject.cotType;
    const lts= myObject.pyct.lts;
    const proPozo= myObject.pyct.proPozo;
    const loc= myObject.pyct.loc;
    const mot= myObject.pyct.motor;
    const volt= myObject.pyct.motor.volt;
    const pumpCal= myObject.calibre;
    const cdt=myObject.pyct.cdtP;
    const cantPan=myObject.pyct.cantPan

    idP.innerHTML    =  ` ${myObject.pyct.id} `;
    nomP.innerHTML   =  ` ${myObject.pyct.nombre} `;
    nomV.innerHTML   =  `${myObject.pyct.rep.nombre}`;
    mail.innerHTML   =  `${myObject.pyct.rep.mail}`;
    tel.innerHTML    =  `${myObject.pyct.rep.tel}`;
    nomVf.innerHTML  =  `${myObject.pyct.rep.nombre}`;
    hpGraph.innerHTML=  `${pumpHP} Hp`;
    Bomba.innerHTML  =  `Bomba de ${pumpHP} HP marca Altamira trifasico ${volt}v con bomba ${pumpModel}, ${mot.Modelo}  Serie ${mot.serie}.<br> EquipamientoBomba: Cableado sumergible Calibre ${pumpCal}, tubo, kit adaptador y check de columna `;
    if(proyT ==1){
      //poner solo la desc de bombeo
      descP.innerHTML= ` Instalación de bomba para un pozo de ${proPozo} metros de profundidad, con un volumen de agua de ${lts} LT/S, Con una carga dinamica de ${cdt} metros, en la localidad de ${loc}.`;
    }  
    if(proyT ==2){
      //poner solo la desc de bombeo
      descP.innerHTML= `Instalación de ${cantPan} paneles solares, en la localidad de ${loc}.`;

    }  
    if(proyT ==3){
      descP.innerHTML= ` Instalación de bombeo solar para un pozo de ${proPozo} metros de profundidad, con un volumen de agua de ${lts} LT/S, Con una carga dinamica de ${cdt} metros, en la localidad de ${loc}.`;

    }  

  }
    else{
    console.log("error retrieving myObject")
    }
    }
    else {
        console.error('Elements not found.',error);
    }

});


  function getObjectFromLocalStorage(key) {
    try {
      const storedObject = localStorage.getItem(key);
      if (storedObject) {
        console.log('Object retrieved from local storage successfully:', storedObject);
        return JSON.parse(storedObject);
      } else {
        console.warn('Object not found in local storage.');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving object from local storage:', error);
      return null;
    }
  }



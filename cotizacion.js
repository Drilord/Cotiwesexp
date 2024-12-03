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
    if(Bomba && idP && nomP && descP){
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
    

    idP.innerHTML=  ` ${myObject.pyct.id} `;
    nomP.innerHTML=  ` ${myObject.pyct.nombre} `;
    Bomba.innerHTML = `Bomba de ${pumpHP} HP marca Altamira trifasico ${volt}v con bomba ${pumpModel}, ${mot.Modelo}  Serie ${mot.serie}.<br> EquipamientoBomba: Cableado sumergible Calibre ${pumpCal}, tubo, kit adaptador y check de columna `;
    if(proyT ==1){
      //poner solo la desc de bombeo
      descP.innerHTML= ` Instalación de puru bombeu miju`
    }  
    if(proyT ==2){
      //poner solo la desc de bombeo
      descP.innerHTML= ` Instalación de purus panelis solaris vali`

    }  
    if(proyT ==3){
      descP.innerHTML= ` Instalación de bombeo solar para un pozo de ${proPozo} metros de profundidad, un volumen de agua de ${lts} LT/S, Con una carga dinamica de 50 metros, en la localidad de ${loc}.`

    }  
  }
    else{
    console.log("error retrieving myObject")
    }
    }
    else {
        console.error('Element with ID "bomba" not found.',error);
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



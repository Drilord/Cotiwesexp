let a ,b,c,d,e,f,g,h,i,j,k,l;

/*
navigator.storage.estimate().then(estimate => {
  console.log('Quota:', estimate.quota);
  console.log('Usage:', estimate.usage);
});*/

document.addEventListener('DOMContentLoaded', () => {
    const Bomba = document.getElementById('bomba');
    if(Bomba){
    const myObject = getObjectFromLocalStorage    ('cotData');
    if (myObject) {
    const pumpModel= myObject.Modelo
    const pumpHP= myObject.hp
    Bomba.innerHTML = `Bomba de ${pumpHP} HP marca Altamira trifasico 440v con bomba ${pumpModel}, MOTOR ALTAMIRA RT 3 FASES 440V 6"Serie RT.<br> EquipamientoBomba: Cableado sumergible Calibre 10, tubo, kit adaptador y check de columna `;
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



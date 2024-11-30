let a, b, c, d, e, f, g, h, i, j, k, l;
let selPump

fetch('datos.json')
  .then(response => response.json())
  .then(jsonData => {
    const ltsSelect = document.getElementById('ltsSelect');
    const vendSelect = document.getElementById('vendSelect');
    const input6 = document.getElementById('input6');
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

input6.addEventListener('blur', () => {
selPump=datosBomba(jsonData);

});



  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


/*consultar tipo de cambio*/
const banxicourl="https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF18561/datos/oportuno?token="
const token="b762a196dea52ff59a8a0609a3e74a5bcac7e697da6e107748f7ee33d59e1cfd"


function mostrarTexto() {
    console.log(selPump.Modelo)
    a = genID()
    alert(a);
    data = {nombre: a};
    document.getElementById('text1').textContent = data.nombre;
}
function actualizar() {
    a = document.getElementById('input0').value;
    alert('Los datos se actualizaron correctamente!');
}

async function consultarTipoCambio() {
    try{
        const response = await fetch(banxicourl+token)
        if(!response.ok){
            console.log("sin respuesta")
            return
        }
        const data= await response.json()
        const series= data.bmx.series[0]
        const tipCam = series.datos[0].dato 
        console.log(tipCam)
        document.getElementById("input0").value = tipCam;
    
    } catch(error){
        console.log("error de informacion recibida:", error)
    }
}

function datosBomba(data) {
let datosBomba= null 
const lts= document.getElementById("ltsSelect").value 
const cdt= document.getElementById("input6").value 

        
        data.bomSol.bombas.forEach(bomba=>{
          if(lts==bomba.lts){
            bomba.modelos.forEach(model=>{
              if(model.altMax >= cdt){
                if(!datosBomba){
               datosBomba= model
                }
              }
              })
          }
        });
    if(datosBomba){

     //alert('Modelo: '+datosBomba.Modelo+' Hp: '+datosBomba.hp);
      return datosBomba;
    }
    else{
      alert("No existe bomba de "+lts+" lt/s para altura de "+cdt)
      maxCDT();
    }
}


function equipBomb(modelo, altMax, lts, hp){
  /*esta funcion debe calcular el equipamento de la bomba de acuerdo a los lt/s se usa un diametro de tuberia y se le suman todas las piezas esta funcion debe calcular
  el precio total del equipamiento que es por metro so se calcula en base a la altura maxima de la bomba elegida, debe retornar precio, */
}
function motorBomba(hp,temp){
  /*esta funcion debe elegir el motor de bomba segun los hp y si es para agua caliente o normal
   debe retornar el motor modelo y precio*/
}
function datosSolar(hp, distPan){
/*esta funcion usando los hp ya sea que vengan de la funcion datosBomba o ingresados manualmente en el caso que no se este cotizando bomba
  con los hp se calcula el gabinete armado y el variador normalmente el variador es el que sigue en HP ejemplo si la bomba es de 10 el variador es de 15 y asi
  esta funcion debe retornar el tipo de panel, cantidad de paneles, precio, gabinete armado precio, */
}
function maxCDT(){
const dropdown = document.getElementById('ltsSelect');
const cdtMax = document.getElementById('cdtMax');
const cdt= document.getElementById("input6").value 
//if (!dropdown){ console.error("Error: Could not find dropdown element.");}
//if(!cdtMax)   { console.error("Error: Could not find cdtMax element.");}
const maxAltValues = {
  0.6: 360,0.96: 381, 1.4: 356, 
  2.5: 422, 4.16:123, 5.33:369, 
  9.33:343, 15: 242, 20:182,
  23.3:250, 30:190, 40:144,
  53.3:119, 70:83}
const selectedValue = dropdown.value;
const legendText = maxAltValues[selectedValue];
cdtMax.textContent = `(CDT Max ${legendText}mts)`;
if(cdt>legendText){cdtMax.textContent = `(Elegir otro Volumen de agua, CDT Max ${legendText}mts)`;}
else{cdtMax.textContent = `(CDT Max ${legendText}mts)`;}
}

function genID() {
  const nom = document.getElementById('input1').value;
  const loc = document.getElementById('input2').value;
  const selHp = selPump.hp
  const nom3 = nom.substring(0, 3).toUpperCase();
  const loc3 = loc.substring(0, 3).toUpperCase();
  const finalID = `WES-${nom3}-${loc3}-${selHp}`;

  return finalID;
}

/* to check session storage
navigator.storage.estimate().then(estimate => {
  console.log('Quota:', estimate.quota);
  console.log('Usage:', estimate.usage);
});
*/

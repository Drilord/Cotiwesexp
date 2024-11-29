let a, b, c, d, e, f, g, h, i, j, k, l;

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
  datosBomba(jsonData);

});



  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


/*consultar tipo de cambio*/
const banxicourl="https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF18561/datos/oportuno?token="
const token="b762a196dea52ff59a8a0609a3e74a5bcac7e697da6e107748f7ee33d59e1cfd"


function mostrarTexto() {
    a = document.getElementById('vendSelect').value;
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

      alert('Modelo: '+datosBomba.Modelo+' Hp: '+datosBomba.hp);
      return datosBomba;
    }
    else{
      alert("No existe bomba de "+lts+" lt/s para altura de "+cdt)
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
if (!dropdown){ console.error("Error: Could not find dropdown element.");}
if(!cdtMax)   { console.error("Error: Could not find cdtMax element.");}
const maxAltValues = {
  0.6: 'CDT Max 360mts',0.96: 'CDT Max 381mts', 1.4: 'CDT Max 356mts', 
  2.5: 'CDT Max 422mts', 4.16: 'Altura Max 123mts', 5.33: 'Altura Max 369mts', 
  9.33: 'Altura Max 343mts', 15: 'Altura Max 242mts', 20: 'Altura Max 182mts',
  23.3: 'Altura Max 250mts', 30: 'Altura Max 190mts', 40: 'Altura Max 144mts',
  53.3: 'Altura Max 119mts', 70: 'Altura Max 83mts'}
const selectedValue = dropdown.value;
const legendText = maxAltValues[selectedValue];
cdtMax.textContent = `(${legendText})`;
}

/* to check session storage
navigator.storage.estimate().then(estimate => {
  console.log('Quota:', estimate.quota);
  console.log('Usage:', estimate.usage);
});
*/

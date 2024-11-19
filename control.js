let a, b, c, d, e, f, g, h, i, j, k, l;

/* load data and create tables*/
fetch('datos.json')
  .then(response => response.json())
  .then(jsonData => {
    // Data is now in the 'data' variable
    console.log(jsonData);
       // Create tables using the fetched data
       createTables(jsonData);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  function createTables(jsonData) {
    const container = document.querySelector(".tcontainer");
  
    // Loop through each flow rate in the "bombas" section
    for (const flowRate in jsonData.bomSol.bombas) {
      const table = document.createElement("table");
      table.classList.add("table", "table-striped");
  
      // Create table header row
      const headerRow = document.createElement("tr");
      headerRow.innerHTML = `<th>Modelo</th><th>HP</th><th>Precio</th><th>Altura Máxima</th><th>Calibre</th>`;
      table.appendChild(headerRow);
  
      // Loop through each pump for the current flow rate
      jsonData.bomSol.bombas[flowRate].forEach((pump) => {
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
  
      // Add table caption (optional)
      const caption = document.createElement("caption");
      caption.textContent = `Bombas - ${flowRate}`;
      table.appendChild(caption);
  
      // Append the table to the container
      container.appendChild(table);
    }
  }
  

const banxicourl="https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF18561/datos/oportuno?token="
const token="b762a196dea52ff59a8a0609a3e74a5bcac7e697da6e107748f7ee33d59e1cfd"
function mostrarTexto() {
    a = document.getElementById('input0').value;
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

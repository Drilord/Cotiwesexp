let jason, a=1;
/* load data and create tables*/

fetch('http://172.31.3.233:3000/bombSol/')
  .then(response => response.json())
  .then(jsonData => {
    // Data is now in the 'jason' global variable
    jason=jsonData
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
  fetch('http://172.31.3.233:3000/cots/')
  .then(response => response.json())
  .then(jsonData => {
    // Data is now in the 'jason' global variable
    jason=jsonData
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
/*modificar a que sea void y mas bien usa la variable jason y en el html poner boton de ver bombas KOR on click KOR() despues
 hacer una funcion para cada conjunto iterativo de tablas que compartan columnas hacer que tenga un boton ocultar que cree la func como event listener para ocultarla
 
 analizar para agregar boton que esconda las tablas de kor() 
  const container = document.querySelector(".tcontainer");

  // Create the button
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "Hide/Show Tables";
  toggleButton.addEventListener("click", () => {
    const tables = container.querySelectorAll(".kor-table");
    tables.forEach(table => {
      table.style.display = table.style.display === "none" ? "table" : "none";
    });
  });
  container.appendChild(toggleButton);

  // ... rest of your table creation code ...

  // Add the "kor-table" class to each table
  const tables = container.querySelectorAll("table");
  tables.forEach(table => {
    table.classList.add("kor-table");
  });
}
 
 */
  function KOR() {
    const container = document.querySelector(".tcontainer");
    const exiTab = document.getElementById('KOR1'); 
    if(!exiTab){
    jason.bomSol.bombas.forEach(bomba => {
   
      const table = document.createElement("table");
      table.classList.add("table", "table-striped");
      table.id="KOR"+a;
    
  
      // Create table header row
      const headerRow = document.createElement("tr");
      headerRow.innerHTML = `<th>Modelo</th><th>HP</th><th>Precio</th><th>Altura Máxima</th><th>Calibre</th>`;
      table.appendChild(headerRow);
  
      // Loop through each pump for the current flow rate
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
      
      // Add table caption (optional)
      const caption = document.createElement("caption");
      caption.textContent = `Bombas de - ${bomba.lts}lt/s`;
      table.appendChild(caption);
  
      // Append the table to the container
      container.appendChild(table);
      a=a+1;
    });
  } 
  }
  

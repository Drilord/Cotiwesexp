/*<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=TU_CLAVE_API&libraries=places,geometry&callback=initMap">

    TU_CLAVE_API se debe obtener con la cuenta de wesh podemos usar una para pruebas de expertease solo monitorear el uso 

</script>
<input type="text" id="localidadInput" placeholder="Ingrese una localidad">
<div id="resultado"></div>*/

function initMap() {
    // Localidad guardada (ejemplo)
    const localidadGuardada = { lat: 19.4326, lng: -99.1332 }; // Cambiar a 20.663980957136737, -103.45710300887333 weslaco energias renovables

    const input = document.getElementById('localidadInput');
    const resultado = document.getElementById('resultado');

    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry)   
 {
            resultado.textContent = 'No se pudo encontrar la ubicación';
            return;
        }

        const origen = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        const servicioDistancia = new google.maps.DistanceMatrixService();
        servicioDistancia.getDistanceMatrix({
            origins: [origen],
            destinations: [localidadGuardada],
            travelMode: 'DRIVING' // Puedes cambiar a WALKING, BICYCLING, TRANSIT
        }, (response, status) => {
            if (status === 'OK') {
                const distancia = response.rows[0].elements[0].distance.text;
                resultado.textContent = `La distancia es: ${distancia}`;
            } else {
                resultado.textContent = 'Error al calcular la distancia';
            }
        });
    });
}

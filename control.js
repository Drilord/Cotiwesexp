let a, b, c, d, e, f, g, h, i, j, k, l;
const banxicourl="https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno?token="
const token="b762a196dea52ff59a8a0609a3e74a5bcac7e697da6e107748f7ee33d59e1cfd"
function mostrarTexto() {
    a = document.getElementById('input0').value;
    alert(a);
    data = {nombre: a};
    document.getElementById('text1').textContent = data.nombre;
}
function consultarTipoCambio() {
    try{
        const response = await fetch(banxicourl+token)
        if(!response.ok){
            console.log("sin respuesta")
            return
        }
        const data=await response.json()
        const series= data.bmx.series[0]
        const tipCam = series.datos[0].datos 
    } catch(error){
        console.log("error de informacion", error)
    }
}
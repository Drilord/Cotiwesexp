let a, b, c, d, e, f, g, h, i, j, k, l;

function mostrarTexto() {
    a = document.getElementById('input0').value;
    alert(a);
    data = {nombre: a};
    document.getElementById('text1').textContent = data.nombre;
}
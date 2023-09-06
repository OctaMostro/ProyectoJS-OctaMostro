let boton = document.getElementById("convertir")
let resultado2 = document.getElementById("resultado")


boton.addEventListener("click", function () {
    const dolares = parseFloat(document.getElementById("dolares").value);

    fetch("https://api.bluelytics.com.ar/v2/latest")
        .then(response => response.json())
        .then(data => {
            const valueAvg = data.blue.value_avg;
            const resultado = valueAvg * dolares;

            resultado2.innerText = resultado;
        })
        .catch(error => {
            console.error("Error al obtener los datos de la API:", error);
        });
});

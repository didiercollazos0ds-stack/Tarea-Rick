const contenedor = document.getElementById("contenedor");
const btnCargar = document.getElementById("btnCargar");
const btnBuscar = document.getElementById("btnBuscar");
const buscar = document.getElementById("buscar");

function mostrarPersonajes(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {

            contenedor.innerHTML = "";

            data.results.forEach(personaje => {

                contenedor.innerHTML += `
    <div class="card">
        <img src="${personaje.image}" alt="${personaje.image}"> 
        <p><strong>Nombre:</strong> ${personaje.name}</p>
        <p><strong>Estado:</strong> ${personaje.status}</p>
        <p><strong>Especie:</strong> ${personaje.species}</p>
        <p><strong>Género:</strong> ${personaje.gender}</p>
    </div>
`;
            });

        })
        .catch(error => {
            console.error(error);
            contenedor.innerHTML = "<h3>Error al cargar personajes.</h3>";
        });
}

btnCargar.addEventListener("click", () => {
    mostrarPersonajes("https://rickandmortyapi.com/api/character");
});

btnBuscar.addEventListener("click", () => {
    const nombre = buscar.value.trim();

    if (nombre !== "") {
        mostrarPersonajes(
            `https://rickandmortyapi.com/api/character/?name=${nombre}`
        );
    }
});

mostrarPersonajes("https://rickandmortyapi.com/api/character");
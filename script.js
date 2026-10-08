const contenedor = document.getElementById("contenedor");
const buscar = document.getElementById("buscar");
const genero = document.getElementById("genero");
const ordenar = document.getElementById("ordenar");

const btnBuscar = document.getElementById("btnBuscar");
const btnCargar = document.getElementById("btnCargar");

const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

const contador = document.getElementById("contador");
const paginaActual = document.getElementById("paginaActual");

let pagina = 1;
let nombreActual = "";
let generoActual = "";

async function mostrarPersonajes() {

    let url = `https://rickandmortyapi.com/api/character/?page=${pagina}`;

    if (nombreActual) {
        url += `&name=${encodeURIComponent(nombreActual)}`;
    }

    if (generoActual) {
        url += `&gender=${encodeURIComponent(generoActual)}`;
    }

    try {

        const respuesta = await fetch(url); // Puedes leer mas sobre el metodo fetch , porque puedes acceder a los headers, usar "then y catch" y mas....
        const data = await respuesta.json();
        //Puedes usar console.log("data",data) para que veas que es data en la consola del navegador.

        if (!data.results) {

            contenedor.innerHTML =
            "<h3>No se encontraron personajes.</h3>";

            contador.textContent = "";
            return;
        }

        let personajes = [...data.results];  // spread operation leer https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax  (son los [...data]) 

        if (ordenar.value === "asc") {
            personajes.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        }

        if (ordenar.value === "desc") {
            personajes.sort((a, b) =>
                b.name.localeCompare(a.name)
            );
        }

        contenedor.innerHTML = "";

        contador.textContent =
        `Personajes encontrados: ${data.info.count}`;

        paginaActual.textContent =
        `Página ${pagina} de ${data.info.pages}`;

        personajes.forEach(personaje => {

            let colorEstado = "#f1c40f";

            if (personaje.status === "Alive") {
                colorEstado = "#22c55e";
            } else if (personaje.status === "Dead") {
                colorEstado = "#ef4444";
            }

            let estadoHTML = "";

            if (personaje.status === "Alive") {
                estadoHTML =
                '<span class="estado vivo">Alive</span>';
            }
            else if (personaje.status === "Dead") {
                estadoHTML =
                '<span class="estado muerto">Dead</span>';
            }
            else {
                estadoHTML =
                '<span class="estado desconocido">Unknown</span>';
            }

            contenedor.innerHTML += `
                <div class="card"
                style="border-top:8px solid ${colorEstado}">

                    <img src="${personaje.image}" alt="${personaje.name}">

                    <h3>${personaje.name}</h3>

                    <p><strong>Estado:</strong> ${estadoHTML}</p>

                    <p>
                        <strong>Especie:</strong>
                        ${personaje.species}
                    </p>

                    <p>
                        <strong>Género:</strong>
                        ${personaje.gender}
                    </p>

                    <p>
                        <strong>Origen:</strong>
                        ${personaje.origin.name}
                    </p>

                </div>
            `;
        });

        btnAnterior.disabled = !data.info.prev;
        btnSiguiente.disabled = !data.info.next;

    }
    catch (error) {

        contenedor.innerHTML =
        "<h3>Error al cargar personajes.</h3>";     

        contador.textContent = "";

        console.error(error);   // esto queda accesible en el navegador.
    }
}

btnBuscar.addEventListener("click", () => {

    pagina = 1;

    nombreActual = buscar.value.trim();
    generoActual = genero.value;

    mostrarPersonajes();
});

btnCargar.addEventListener("click", () => {

    pagina = 1;

    nombreActual = "";
    generoActual = "";

    buscar.value = "";
    genero.value = "";
    ordenar.value = "";

    mostrarPersonajes();
});

ordenar.addEventListener("change", () => {
    mostrarPersonajes();
});

btnSiguiente.addEventListener("click", () => {

    pagina++;
    mostrarPersonajes();
});

btnAnterior.addEventListener("click", () => {

    if (pagina > 1) {
        pagina--;
        mostrarPersonajes();
    }
});

mostrarPersonajes();

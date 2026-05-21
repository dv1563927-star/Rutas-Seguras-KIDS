//aqui me toca guardar referencias a los elementos del html

const formularioRuta = document.querySelector("#form-ruta");
const formularioEstudiante = document.querySelector("#form-estudiante");
const listaRutas = document.querySelector("#lista-rutas");
const listaEstudiantes = document.querySelector("#lista-estudiantes-disponibles");

//creo una ruta

formularioRuta.addEventListener("submit", (e) => {
    //aqui evito q el formulario recargue la pagina
    e.preventDefault();
    //creo el objeto con los datos del formulario
    const datos = {
        nombre: document.querySelector("#nombre-ruta").value,
        conductor: document.querySelector("#conductor").value,
        ciudad: document.querySelector("#ciudad").value,
        hora: document.querySelector("#hora-salida").value
    };

    //envio los datos a la funcion de crear ruta para q acomode las cosas
    crearRuta(datos);
    //vuelvo a dibujar las tarjetas de las rutas
    renderizarRutas();

    //limpio el formulario
    formularioRuta.reset();
});

// creo estudiante

formularioEstudiante.addEventListener("submit", (e) => {
    //evito q el formulario recargue la pagina aqui tmb
    e.preventDefault();

    //creo el objeto de estudiante con lo que me dio el formulario
    const datos = {
        nombre: document.querySelector("#nombre-estudiante").value,
        tutor: document.querySelector("#nombre-tutor").value,
        telefono: document.querySelector("#telefono").value,
        direccion: document.querySelector("#direccion").value
    };

    //le paso los datos a la de crear estudiantes nuevos para q acomode
    crearEstudiante(datos);
    //actualizo la lista de los estudiantes
    renderizarEstudiantes();
    //limpio el formulario
    formularioEstudiante.reset();
});

//renderizo a los estudiantes

function renderizarEstudiantes() {
   // limpio el html
   listaEstudiantes.innerHTML = "";
   //recorro cada estudiante del array estudiantes[]
    estudiantes.forEach((estudiante) => {
        //creo un div nuevo para las tarjetas
        const tarjeta = document.createElement("div");
        //le agrego una clase q ya existe en mi css
        tarjeta.classList.add("estudiante-card");
        //construyo el html dinamico 
        tarjeta.innerHTML = `
        <div>
            <strong> ${estudiante.nombre} </strong>
            <span> Tutor: ${estudiante.tutor} </span>
        </div>

        <button class = "boton-eliminar-estudiante" data-id="${estudiante.id}">Eliminar</button>
        `;

        //meto la tarjeta en el contenedor
        listaEstudiantes.appendChild(tarjeta);
    });
};

// renderizo las rutas

function renderizarRutas() {
    //limpio el html aqui tmb
    listaRutas.innerHTML = "";

    //recorro todas las rutas
    rutas.forEach((ruta) => {
        //creo el componente personalizado
        const tarjeta = document.createElement("route-card");

        tarjeta.cargarDatos(ruta);

        //ameto el componente al html
        listaRutas.appendChild(Tarjeta);
    });
};

//para iniciarlo

cargarDatos(); //aca carga la informacion cuando la pagina se inicia

renderizarRutas();
renderizarEstudiantes();
//Ahi lo que hace es que abre la pagina y carga los datos, accede al local storage y renderiza ambos arrays


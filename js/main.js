//aqui me toca guardar referencias a los elementos del html

const formularioRuta = document.querySelector("#form-ruta");
const formularioEstudiante = document.querySelector("#form-estudiante");
const listaRutas = document.querySelector("#lista-rutas");
const listaEstudiantes = document.querySelector("#lista-estudiantes-disponibles");
let editandoRutaId = null; //lo dejo para la funcion de ahorita para editar

//creo una ruta

formularioRuta.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombreRuta = document.querySelector("#nombre-ruta");
    const conductor = document.querySelector("#conductor");
    const ciudad = document.querySelector("#ciudad");
    const hora = document.querySelector("#hora-salida");

    const valido =
        validarCampo(nombreRuta, document.querySelector("#error-nombre-ruta"), "Ingrese un nombre") &&
        validarCampo(conductor, document.querySelector("#error-conductor"), "Ingrese un conductor") &&
        validarCampo(ciudad, document.querySelector("#error-ciudad"), "Ingrese una ciudad") &&
        validarCampo(hora, document.querySelector("#error-hora-salida"), "Ingrese una hora válida");

    if (!valido) return;

    const datos = {
        nombre: nombreRuta.value.trim(),
        conductor: conductor.value.trim(),
        ciudad: ciudad.value.trim(),
        hora: hora.value.trim()
    };

    if (editandoRutaId !== null) {
        // Modo edición: actualizar ruta existente
        const rutaIndex = rutas.findIndex(r => r.id === editandoRutaId);
        if (rutaIndex !== -1) {
            rutas[rutaIndex] = {
                ...rutas[rutaIndex],   // conserva el id, estudiantes, etc.
                ...datos               // sobreescribe nombre, conductor, ciudad, hora
            };
            guardarDatos();
            renderizarRutas();
        }
        // Restaurar formulario a modo "crear"
        editandoRutaId = null;
    } else {
        // Modo creación normal
        crearRuta(datos);
        renderizarRutas();
    }
    formularioRuta.reset();
});

// creo estudiante

formularioEstudiante.addEventListener("submit", (e) => {
    //evito q el formulario recargue la pagina aqui tmb
    e.preventDefault();

    // Obtén los elementos input
    const inputNombre = document.querySelector("#nombre-estudiante");
    const inputTutor = document.querySelector("#nombre-tutor");
    const inputTelefono = document.querySelector("#telefono");
    const inputDireccion = document.querySelector("#direccion");

    // valida pasando los elementos, no los valores
    const valido =
        validarCampo(inputNombre, document.querySelector("#error-nombre-estudiante"), "Ingrese el nombre del estudiante") &&
        validarCampo(inputTutor, document.querySelector("#error-nombre-tutor"), "Ingrese el nombre del tutor") &&
        validarCampo(inputTelefono, document.querySelector("#error-telefono"), "Ingrese un número de teléfono válido (mínimo 7 dígitos)") &&
        validarCampo(inputDireccion, document.querySelector("#error-direccion"), "Ingrese la dirección");

    if (!valido) return;

    // ahora sí, toma los valores limpios
    const datos = {
        nombre: inputNombre.value.trim(),
        tutor: inputTutor.value.trim(),
        telefono: inputTelefono.value.trim(),
        direccion: inputDireccion.value.trim()
    };

    crearEstudiante(datos);
    renderizarEstudiantes();
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
        listaRutas.appendChild(tarjeta);
    });
};

listaRutas.addEventListener("editarRuta", (e) => {
    const idRuta = e.detail.id;
    const ruta = rutas.find(r => r.id === idRuta);
    if (!ruta) return;

    // Rellenar el formulario con los datos de la ruta
    document.querySelector("#nombre-ruta").value = ruta.nombre;
    document.querySelector("#conductor").value = ruta.conductor;
    document.querySelector("#ciudad").value = ruta.ciudad;
    document.querySelector("#hora-salida").value = ruta.hora;

    // Establecer el modo edición
    editandoRutaId = idRuta;

    // cambiar el texto del botón para que el usuario sepa que está editando
    const btnSubmit = formularioRuta.querySelector(".boton-primario");
    btnSubmit.textContent = "Actualizar Ruta";

    // desplazar la página hacia el formulario
    document.querySelector(".seccion-formulario").scrollIntoView({ behavior: "smooth" });
});

listaRutas.addEventListener("eliminarRuta", (e) => {
    eliminarRuta(e.detail.id);
    renderizarRutas();
})

listaEstudiantes.addEventListener("click", (e) => {
    if (e.target.matches(".boton-eliminar-estudiante")) {
        const id = Number(e.target.dataset.id);
        eliminarEstudiante(id);
        renderizarEstudiantes();
        renderizarRutas();
    }
});

listaRutas.addEventListener("agregarEstudianteRuta", (e) => {
    const {idRuta, nombre} = e.detail;
    agregarEstudianteRuta(idRuta, nombre);
    renderizarRutas();
});

function validarCampo(input, mensajeError, mensaje) {

    if(input.value.trim() === "") {
        input.classList.add("error");
        mensajeError.textContent = mensaje;
        return false;
    }

    input.classList.remove("error");
    mensajeError.textContent = "";

    return true;
}

//para iniciarlo
cargarDatos(); //aca carga la informacion cuando la pagina se inicia

renderizarRutas();
renderizarEstudiantes();
//Ahi lo que hace es que abre la pagina y carga los datos, accede al local storage y renderiza ambos arrays


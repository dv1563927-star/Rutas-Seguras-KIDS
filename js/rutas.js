let rutas = [];
let estudiantes = [];

//guardar todo
function guardarDatos() {
    localStorage.setItem("rutas", JSON.stringify(rutas));
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
};

//aqui cargo todos los datos
function cargarDatos() {
    rutas = JSON.parse(localStorage.getItem("rutas")) || [];
    estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
}

function crearRuta(datos) {
    //el molde del objeto ruta
    const nuevaRuta = {
        id: Date.now(),
        nombre: datos.nombre,
        conductor: datos.conductor,
        ciudad: datos.ciudad,
        hora: datos.hora,
        estudiantes:[]
    };
    //uso el .push para añadir el nuevo objeto al array vacio que hice arriba de rutas
    rutas.push(nuevaRuta);
    //llamo la funcion de guardar datos para que quede en el local storage
    guardarDatos();
    //retorno el nuevo objeto
    return nuevaRuta;
};

function crearEstudiante(datos) {
    //el molde del objeto estudiante
    const nuevoEstudiante = {
        id: Date.now(),
        nombre: datos.nombre.trim().toLowerCase(),
        tutor: datos.tutor.trim(),
        telefono: datos.telefono.trim(),
        direccion: datos.direccion.trim()
    };
    //uso el .push para añadir el nuevo objeto al array vacio que hice arriba de estudiantes
    estudiantes.push(nuevoEstudiante);
    //llamo la funcion de guardar datos para que quede en el local storage
    guardarDatos();
    //retorno el nuevo objeto
    return nuevoEstudiante;
};

function eliminarRuta(id) {
    rutas = rutas.filter(r => r.id !== id);
    guardarDatos();
}

function eliminarEstudiante(id) {
    //eliminar estudiantes de la lista general q hice
    estudiantes = estudiantes.filter(e => e.id !== id);
    //eliminar ese mismo estudiante pero de las rutas donde lo meti
    rutas.forEach(ruta => {
        ruta.estudiantes = ruta.estudiantes.filter(est => est.id !== id);
    });
    guardarDatos(); //para q se actualize y si se elimine el estudiante
};

function agregarEstudianteRuta(idRuta, nombre) {
    const ruta = rutas.find(r => r.id === idRuta);
    if (!ruta) return;
    const nombreMinuscula = nombre.trim().toLowerCase();//lo pongo minuscula pa q no se pierda

    const estudianteExistente = estudiantes.find(e => e.nombre === nombreMinuscula);
    if (!estudianteExistente) {
        alert (`El estudiante "${nombre}" no esta registrado. Primero crealo en el formulario de estudiantes`);
        return;
    }

    //aca lo meto con su id real y el nombre ya chiquito
    ruta.estudiantes.push({
        id: estudianteExistente.id,
        nombre: estudianteExistente.nombre //ya chiquito
    });
    guardarDatos();
};


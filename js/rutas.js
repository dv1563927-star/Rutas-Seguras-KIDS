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
        nombre: datos.nombre,
        tutor: datos.tutor,
        telefono: datos.telefono,
        direccion: datos.direccion
    };
    //uso el .push para añadir el nuevo objeto al array vacio que hice arriba de estudiantes
    estudiantes.push(nuevoEstudiante);
    //llamo la funcion de guardar datos para que quede en el local storage
    guardarDatos();
    //retorno el nuevo objeto
    return nuevoEstudiante;
};
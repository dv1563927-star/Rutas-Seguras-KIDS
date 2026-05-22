class RouteCard extends HTMLElement {
    constructor() {
        super();
        //activo el shadow dom
        this.attachShadow({mode:"open"});

        //busco mi template
        const template = document.querySelector("#route-card-template");
        //clono el template
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    };

    //funcion para recibir los datos
    cargarDatos(datos) {
        //guardo la info dentro del componente
        this.datos=datos;
        //inserto los datos de una
        this.shadowRoot.querySelector('[data-field="nombre"]').textContent = this.datos.nombre;
        this.shadowRoot.querySelector('[data-field="conductor"]').textContent = this.datos.conductor;
        this.shadowRoot.querySelector('[data-field="hora"]').textContent = this.datos.hora;
        this.shadowRoot.querySelector('[data-field="ciudad"]').textContent = this.datos.ciudad;

        const climaDiv = this.shadowRoot.querySelector('[data-field="clima"]');
        climaDiv.textContent = 'Clima en espera...';

        obtenerClima(this.datos.ciudad).then(clima => {
            if(clima) {
                climaDiv.innerHTML = `🌡️ ${clima.temperatura}°C, ${clima.descripcion}`;
            } else {
                climaDiv.textContent = 'Clima actualmente no disponible';
            }
        });

        // renderizar estudiantes que ya tiene la ruta
        const lista = this.shadowRoot.querySelector('[data-field="lista-estudiantes"]');
        lista.innerHTML = "";
        datos.estudiantes.forEach((est) => {
            const li = document.createElement("li");
            li.textContent = est.nombre;
            lista.appendChild(li);
        });
        
        //evento eliminar
        this.shadowRoot.querySelector('[data-action="eliminar"]').addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("eliminarRuta", {detail:{id:this.datos.id}, bubbles:true, composed:true}));
        })

        //evento editar
        this.shadowRoot.querySelector('[data-action="editar"]').addEventListener("click", () => {
            console.log("Editando ruta con id: ", this.datos.id);
            this.dispatchEvent(new CustomEvent("editarRuta", {detail:{id: this.datos.id }, bubbles:true, composed:true}))
        })

        //evento agregar
        this.shadowRoot.querySelector('[data-action="agregar-estudiante"]').addEventListener("click", () => {
            const input = this.shadowRoot.querySelector('[data-field="input-estudiante"]');
            const nombre = input.value.trim();
            if (!nombre) return;
            this.dispatchEvent(new CustomEvent("agregarEstudianteRuta", {detail:{idRuta: datos.id, nombre}, bubbles: true, composed: true}));
            input.value = "";

        })
    }

};

customElements.define("route-card", RouteCard);

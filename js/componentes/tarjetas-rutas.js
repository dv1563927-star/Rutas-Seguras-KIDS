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

        //evento eliminar
        this.shadowRoot.querySelector('[data-action="eliminar"]').addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("eliminarRuta", {detail:{id:this.datos.id}, bubbles:true, composed:true}));
        })
    }

};

customElements.define("route-card", RouteCard);

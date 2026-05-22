const API_KEY = '7cb24f8c272fd8aecaca820d7a81c286'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function obtenerClima (ciudad) {
    try {
        const url =`${BASE_URL}?q=${encodeURIComponent(ciudad)}&appid=${API_KEY}&units=metric&lang=es`;
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error ('Ciudad no encontrada');
        const datos = await respuesta.json();
        return {
            temperatura: Math.round(datos.main.temp),
            descripcion: datos.weather[0].description,
            icono: datos.weather[0].icon
        };
    } catch (error) {
        console.error('Error al obtener clima: ', error);
        return null;
    }
};


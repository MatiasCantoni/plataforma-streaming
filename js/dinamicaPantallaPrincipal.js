const SERIES_Y_PELICULAS = JSON.parse(localStorage.getItem("seriesYPeliculas"));
const rutaActual = window.location.pathname;
const selectCategoria = document.getElementById("categoria");
const busquedaNombre = document.getElementById("buscador")
//Nos trae en que parte de la url estamos, ej serie.html o pelicula.html

function mostrarPeliculasYSeries(arrayDePeliculasYSeries) {
    const nodoElement = document.querySelector(".grilla-contenido");
    nodoElement.innerHTML = "";

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));//Traemos al usuario activo
    const todosLosUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];//Traemos TODOS LOS USUARIOS REGISTRADOS

    let favoritosPeliculas = [];//Creamos un array de peliculas favoritas que iremos modificando
    let favoritosSeries = [];//Creamos un array de series favoritas que iremos modificando

    if (usuarioActivo) {//verifica que haya un usuario activo (que no sea null o undefined)
        const usuarioData = todosLosUsuarios.find(usuarios => usuarios.usuario === usuarioActivo.usuario);//Busca el usuario que este activo en la sesion
        if (usuarioData && usuarioData.favoritos) {//Si los usuarios ya tienen guardadas peliculas favoritas se guardan en las variables
            favoritosPeliculas = usuarioData.favoritos.peliculas || []; //Estos let
            favoritosSeries = usuarioData.favoritos.series || []; //Estos let
        }
    }

    // Creamos una variable para ir acumulando todo el HTML
    let tarjetasHTML = "";

    arrayDePeliculasYSeries.forEach(item => {
        // 1. Calculamos si es favorito igual que antes
        const esFavorito = item.tipo === "pelicula" 
            ? favoritosPeliculas.includes(item.id) 
            : favoritosSeries.includes(item.id);
        
        // 2. Definimos la clase del corazón
        const claseFavorito = esFavorito ? "favorito" : "";

        // 3. (Opcional) Si tu JSON tiene el género o el año, lo usamos. 
        // Si no tienes el año en el JSON, puedes borrar esa parte.
        const genero = item.genero ? item.genero.toUpperCase() : "CONTENIDO";

        // 4. Armamos la tarjeta escribiendo HTML puro, inyectando las variables con ${}
        tarjetasHTML += `
            <a href="./serie-pelicula.html?id=${item.id}" class="tarjeta-contenido">
                <div class="imagen-contenedor">
                    <img src="${item.imagen.url}" alt="${item.imagen.alt}">
                    <div class="gradiente"></div>
                </div>
                
                <div class="info-tarjeta">
                    <h3 class="titulo-tarjeta">${item.nombre}</h3>
                    <p class="metadata-tarjeta">${genero}</p>
                    <div class="divisor"></div>
                    
                    <span class="corazon ${claseFavorito}" data-id="${item.id}" data-tipo="${item.tipo}">
                        ❤
                    </span>
                </div>
            </a>
        `;
    });

    // 5. Finalmente, inyectamos todo el código de golpe en el DOM.
    // Esto es mucho más rápido para el navegador que hacer appendChild 10 veces por tarjeta.
    nodoElement.innerHTML = tarjetasHTML;
}

document.addEventListener("click", (cora) => {//Esto se ejecuta cuando haya un click
    if (cora.target.classList.contains("corazon")) {//Esto verifica si el elemento donde se hizo el click contiene corazon
        cora.preventDefault();//Hace que no se ejecute la etiqueta <a> de la tarjeta
        cora.stopPropagation();////Hace que no se ejecute la etiqueta <a> de la tarjeta

        const id = cora.target.dataset.id;
        const tipo = cora.target.dataset.tipo;

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];//Trae todos los usuarios
        const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));//Trae al usuario logueado

        if (!usuarioActivo) {
            alert("Inicia sesión para guardar favoritos.");
            return;
        }

        const usuarioIndex = usuarios.findIndex(u => u.usuario === usuarioActivo.usuario);//Trae el indice del arreglo usuarios donde esta guardado el usuario activo
        if (usuarioIndex === -1) return;//Si no encuentra al usuario corta el addEvent

        const user = usuarios[usuarioIndex];//Guarda de forma auxiliar en user el usuario activo

        if (!user.favoritos) {//Si user no tiene favoritos crea ambos atributos vacios
            user.favoritos = { peliculas: [], series: [] };
        }

        const lista = tipo === "pelicula" ? user.favoritos.peliculas : user.favoritos.series;//El ternario elige si operamos sobre series o peliculas

        const index = lista.indexOf(id);//Si encuentra el id en el array devuelve la posicion. Si no lo encuentra devuelve -1
        if (index !== -1) {//Si ya esta en la lista y le hicimos click, le borra la clase favorito
            lista.splice(index, 1);
            cora.target.classList.remove("favorito");
        } else {//Si no esta en la lista lo agregamos con la clase favorito
            lista.push(id);
            cora.target.classList.add("favorito");
        }

        usuarios[usuarioIndex] = user;//En el array de usuarios en la posicion del usuario que estamos modificando, guarda las modificaciones que hicimos
        localStorage.setItem("usuarios", JSON.stringify(usuarios));//Guarda en el local storage los cambios
        localStorage.setItem("usuarioActivo", JSON.stringify(user));//Guarda en el local storage los cambios
    }
});

function aplicarFiltros(){
    const valorElegido = selectCategoria.value.toLowerCase();
    const busquedaPalabra = busquedaNombre.value.toLowerCase();

    let resultados = SERIES_Y_PELICULAS; //Creamos un array auxiliar llamado resultados para ir filtrando sobre este mismo

    if(valorElegido !== ""){
        resultados = resultados.filter(seriesOPeliculas => seriesOPeliculas.genero.toLowerCase() === valorElegido);
    }
    if(busquedaPalabra !== ""){
        resultados = resultados.filter(seriesOPeliculas => seriesOPeliculas.nombre.toLowerCase().includes(busquedaPalabra));
    }

    if(rutaActual.includes("serie")){
        resultados = resultados.filter(seriesOPeliculas => seriesOPeliculas.tipo === "serie");
    }else if(rutaActual.includes("pelicula")){
        resultados = resultados.filter(seriesOPeliculas => seriesOPeliculas.tipo === "pelicula");
    }
    mostrarPeliculasYSeries(resultados);
}

document.addEventListener("DOMContentLoaded", () => {
    aplicarFiltros();
})
selectCategoria.addEventListener("change", aplicarFiltros);
busquedaNombre.addEventListener("keyup", aplicarFiltros);
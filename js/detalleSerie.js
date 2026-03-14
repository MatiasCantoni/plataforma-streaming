const SERIES_Y_PELICULAS = JSON.parse(localStorage.getItem("seriesYPeliculas"));
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const objetoVisual = SERIES_Y_PELICULAS.find(p => p.id == id);
//objeto visual es un objeto donde se guarda el objeto buscado por el id en la url
console.log(objetoVisual);

function agregarIframeYCorazon() {
    const nodeElement = document.querySelector(".video_detalle");//Contenedor del iframe
    const iframeElement = document.createElement("iframe");
    const botonVerElement = document.createElement("a");
    botonVerElement.innerHTML = "Comenzar";
    botonVerElement.className = "boton_ver";
    botonVerElement.target = "_blank";
    botonVerElement.href = objetoVisual.video.urlVideo;
    iframeElement.src = objetoVisual.video.iframe;
    nodeElement.appendChild(iframeElement);
    nodeElement.appendChild(botonVerElement);

    const corazon = document.createElement("span");
    corazon.classList.add("corazon");
    corazon.dataset.id = objetoVisual.id;
    corazon.dataset.tipo = objetoVisual.tipo;
    corazon.innerHTML = "❤";

    // Verifica si ya es favorito (usuario logueado)
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarioActivo) {
        const userData = usuarios.find(u => u.usuario === usuarioActivo.usuario);
        if (userData && userData.favoritos) {
            const esFavorito = objetoVisual.tipo === "pelicula"
                ? userData.favoritos.peliculas.includes(objetoVisual.id)
                : userData.favoritos.series.includes(objetoVisual.id);//Este ternario devuelve true si no esta dentro del array marcado como favorito

            if (esFavorito) {
                corazon.classList.add("favorito");//Entonces si es true lo marca como favorito
            }
        }
    }

    nodeElement.appendChild(corazon);
}

function agregarTitulo() {
    const nodeElement = document.querySelector(".detalle_pelicula");
    const tituloElement = document.createElement("p");
    tituloElement.innerHTML = `<strong>Título:</strong> ${objetoVisual.nombre}`;
    nodeElement.appendChild(tituloElement);
};

function agregarTemporadasODuracion(arrayDePeliculasYSeries) {
    agregarTitulo();
    const nodeElement = document.querySelector(".detalle_pelicula");
    if (arrayDePeliculasYSeries.tipo == 'serie') {
        const divElement = document.createElement("div");
        divElement.className = "temporadaYCapitulos";
        nodeElement.appendChild(divElement);
        const temporadaElement = document.createElement("p");
        temporadaElement.innerHTML = "<strong>Temporada: </strong>"

        const selectorElement = document.createElement("select");
        selectorElement.id = "temporadaSelector";
        for (let index = 1; index <= arrayDePeliculasYSeries.temporadas.length; index++) {
            const optionElement = document.createElement("option");
            optionElement.value = index;
            optionElement.textContent = index;
            selectorElement.appendChild(optionElement);
        }
        temporadaElement.appendChild(selectorElement);
        divElement.appendChild(temporadaElement);
        //Codigo que se ejecuta para crear las temporadas y los capitulos de las series
        //Capitulos
        const capituloElement = document.createElement("p");
        capituloElement.innerHTML = "<strong>Capitulo: </strong>";
        const selectorSegundoElement = document.createElement("select");
        selectorSegundoElement.id = "capitulosSelector";
        let numeroDeCapitulos = arrayDePeliculasYSeries.temporadas[0].capitulos;

        for (let index = 1; index <= numeroDeCapitulos; index++) {
            const optionElement = document.createElement("option");
            optionElement.value = index;
            optionElement.innerHTML = index;
            selectorSegundoElement.appendChild(optionElement);
        }
        capituloElement.appendChild(selectorSegundoElement);
        divElement.appendChild(capituloElement);

        selectorElement.addEventListener("change", event => {
            const temporadaSeleccionada = parseInt(selectorElement.value);
            const numeroDeCapitulos = arrayDePeliculasYSeries.temporadas[temporadaSeleccionada - 1].capitulos; //Se le resta uno porque el array empieza en 0
            selectorSegundoElement.innerHTML = "";//Limpia los capitulos para poder agregar los nuevos
            for (let index = 1; index <= numeroDeCapitulos; index++) {
                const nuevosCapitulos = document.createElement("option");
                nuevosCapitulos.value = index;
                nuevosCapitulos.innerHTML = index;
                selectorSegundoElement.appendChild(nuevosCapitulos);
            }
        }
        )

    } else {
        //Codigo que se ejecutra para crear las peliculas con su duracion
        const duracionElement = document.createElement("p");
        duracionElement.innerHTML = `<strong>Duración: </strong>${arrayDePeliculasYSeries.duracion}`;
        nodeElement.appendChild(duracionElement);

    }

};

function agregarGenero(arrayDePeliculasYSeries) {
    const nodeElement = document.querySelector(".detalle_pelicula");
    const generoElement = document.createElement("p");
    generoElement.innerHTML = `<strong>Género: </strong>${arrayDePeliculasYSeries.genero}`;
    nodeElement.appendChild(generoElement);
}

function agregarActores(arrayDePeliculasYSeries) {
    const nodeElement = document.querySelector(".detalle_pelicula");
    const contenedorActores = document.createElement("p");
    contenedorActores.innerHTML = "<strong>Actores: </strong>";

    for (let i = 0; i < arrayDePeliculasYSeries.actores.length; i++) {
        const actorObj = arrayDePeliculasYSeries.actores[i]; //Traemos el objeto con el parametro actor y wiki, para separarlos
        const actorLink = document.createElement("a");
        actorLink.className = "linkActores";//Le damos una clase para en css poder acomodarlo mejor
        actorLink.href = actorObj.wiki; //url a la wiki
        actorLink.target = "_blank";
        actorLink.innerHTML = `${actorObj.actor}`;//Mostramos nombre de actor
        contenedorActores.appendChild(actorLink);
        if (i !== arrayDePeliculasYSeries.actores.length - 1) {
            contenedorActores.append(", ");//Si el tamaño es distinto al ultimo actor, agregamos coma para separar los nombres
        }
    }

    nodeElement.appendChild(contenedorActores);
}

function agregarSinopsis(arrayDePeliculasYSeries) {
    const nodeElement = document.querySelector(".detalle_pelicula");
    const sinopsisElement = document.createElement("p");
    sinopsisElement.innerHTML = `<strong>Sinopsis: </strong>${arrayDePeliculasYSeries.sinopsis}`;
    nodeElement.appendChild(sinopsisElement);
}

document.addEventListener("DOMContentLoaded", function () {
    const carruselElement = document.getElementById("carrusel");
    let index = 0;

    // Crea todos los elementos div pero sin contenido
    SERIES_Y_PELICULAS.forEach(() => {
        const slideCarrusel = document.createElement("div");
        slideCarrusel.classList.add("slide");
        carruselElement.appendChild(slideCarrusel);
    });

    const slides = document.querySelectorAll(".slide");//Seleccionamos todos los div vacios

    function actualizarCarrusel() {
        slides.forEach((slide, i) => {//Itera sobre todos los slide
            slide.classList.remove("activo");//Remueve la clase activo
            slide.innerHTML = ""; // Limpiamos el contenido anterior
            if (i === index) { //Cuando el for sea el mismo que el del index
                slide.classList.add("activo");
                const linkElement = document.createElement("a");
                linkElement.href = `serie-pelicula.html?id=${SERIES_Y_PELICULAS[index].id}`;
                const imagenElement = document.createElement("img");
                imagenElement.src = SERIES_Y_PELICULAS[index].imagen.url;
                imagenElement.alt = SERIES_Y_PELICULAS[index].imagen.alt;
                linkElement.appendChild(imagenElement);
                slide.appendChild(linkElement);
            }
        });
    }

    function mostrarSiguiente() {
        index = (index + 1) % SERIES_Y_PELICULAS.length; //Cada click en el siguiente aumenta el index
        actualizarCarrusel();
    }

    function mostrarAnterior() {
        index = (index - 1 + SERIES_Y_PELICULAS.length) % SERIES_Y_PELICULAS.length; //Cada click en anterior resta el index
        actualizarCarrusel();
    }

    document.getElementById("prev").addEventListener("click", mostrarAnterior);
    document.getElementById("next").addEventListener("click", mostrarSiguiente);

    actualizarCarrusel(); // Mostrar la primera imagen al cargar
});


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

agregarIframeYCorazon();
agregarTemporadasODuracion(objetoVisual);
agregarGenero(objetoVisual);
agregarActores(objetoVisual);
agregarSinopsis(objetoVisual);
const SERIES_Y_PELICULAS = JSON.parse(localStorage.getItem("seriesYPeliculas"));
const cerrarSesion = document.querySelector(".cerrar-sesion");
const usuarioActual = JSON.parse(localStorage.getItem("usuarioActivo")); //agarramos el usuario activo
const confirmarCambios = document.querySelector(".confirmar-cambios__js");
const mensajeError1 = document.querySelector("#mensaje-error-js");
const mensajeError2 = document.querySelector("#mensaje-errorb-js");
const numeroTarjetaError = document.querySelector(".numero-tarjeta-error-js");
const codigoTarjetaError = document.querySelector(".codigo-tarjeta-error-js");
const cuponError = document.querySelector(".cupon-error");



cerrarSesion.addEventListener("click", function () {
    localStorage.removeItem("usuarioActivo");
})

// --- correo electronico y usuario dinamicamente ---
let textoEmail = document.querySelector(".email-js");
let textoUsuario = document.querySelector(".usuario-js");
let textoContrasenia = document.querySelector(".contrasenia-js")
let correoActual = usuarioActual.correo; // guardamos el correo del usuario en un let
let nombreUsuarioActual = usuarioActual.usuario; // guardamos el nombre de usuario en un let
let contraseniaActualB = "*".repeat(usuarioActual.contrasenia.length);


textoEmail.textContent = correoActual;  // hacemos que aparezca en pantalla el correo en modo de texto
textoUsuario.textContent = nombreUsuarioActual; // hacemos que aparezca en pantalla el nombre del usuario en modo de texto
textoContrasenia.textContent = contraseniaActualB;

// --- guardar los cambios del usuario ---
document.querySelector(".form").addEventListener("submit", function (event) {
    event.preventDefault();


    const contraseniaNueva = document.querySelector("#contraseña-nueva").value;
    const contraseniaRepetida = document.querySelector("#repetir-contraseña").value;
    const contraseniaValida = /^(?=(?:.*[A-Za-z]){2,})(?=(?:.*\d){2,})(?=(?:.*[!@#$%^&*()_\-+=?¿¡:;.,<>]){2,}).{8,}$/;
    const quiereCambiarContrasenia = contraseniaNueva !== "" || contraseniaRepetida !== "";
    const campoTarjeta = document.querySelector("#campo-texto-tarjeta");
    const codigoTarjeta = document.querySelector("#codigo-texto-tarjeta");
    const metodoPagoSeleccionado = document.querySelector('input[name="opcion-pago"]:checked')?.value;
    const quiereCambiarMetodoPago = metodoPagoSeleccionado !== usuarioActual.metodoPago;
    const checkboxPF = document.querySelector("#PF");
    const checkboxRP = document.querySelector("#RP");
    const cuponSeleccionado = checkboxPF.checked ? "Pago Fácil" : (checkboxRP.checked ? "RapiPago" : null);
    const cuponAnterior = usuarioActual.tipoCupon?.[0] || null;
    const quiereCambiarTipoCupon = metodoPagoSeleccionado === "Cupón de pago" && cuponSeleccionado !== cuponAnterior;
    const numeroTarjetaAnterior = usuarioActual.numeroTarjeta || "";
    const codigoTarjetaAnterior = usuarioActual.codigoTarjeta || "";
    const quiereCambiarNumeroTarjeta = campoTarjeta.value !== numeroTarjetaAnterior;
    const quiereCambiarCodigoTarjeta = codigoTarjeta.value !== codigoTarjetaAnterior;

    const usuarioAuxiliar = usuarioActual;


    cuponError.textContent = ""
    numeroTarjetaError.textContent = ""
    codigoTarjetaError.textContent = ""

    // parte metodo de pago
    if (quiereCambiarMetodoPago || quiereCambiarTipoCupon || quiereCambiarNumeroTarjeta || quiereCambiarCodigoTarjeta) {
        usuarioAuxiliar.metodoPago = metodoPagoSeleccionado;
        if (metodoPagoSeleccionado === "Tarjeta de crédito") {
            if (!/^\d{16}$/.test(campoTarjeta.value)) {
                event.preventDefault();
                numeroTarjetaError.textContent = "El número de tarjeta debe contener exactamente 16 dígitos";
            } else {
                let suma = 0;
                for (let i = 0; i < 15; i++) {
                    suma += parseInt(campoTarjeta.value[i]);
                }
                let ultimoDigito = parseInt(campoTarjeta.value[15]);

                if (suma % 2 === 0 && ultimoDigito % 2 === 0) {
                    event.preventDefault();
                    numeroTarjetaError.textContent = "El último dígito debe ser impar (la suma de los anteriores es par)";
                } else if (suma % 2 === 1 && ultimoDigito % 2 === 1) {
                    event.preventDefault();
                    numeroTarjetaError.textContent = "El último dígito debe ser par (la suma de los anteriores es impar)";
                } else {
                    numeroTarjetaError.textContent = "";
                    usuarioAuxiliar.numeroTarjeta = campoTarjeta.value;
                }
                if (codigoTarjeta.value === "000") {
                    event.preventDefault();
                    codigoTarjetaError.textContent = "El código de seguridad no puede ser 000"
                } else {
                    codigoTarjetaError.textContent = "";
                    usuarioAuxiliar.codTarjeta = codigoTarjeta.value;
                }
            }
            usuarioAuxiliar.tipoCupon = [];
        }
        if (metodoPagoSeleccionado === "Cupón de pago") {
            const checkboxPF = document.querySelector("#PF");
            const checkboxRP = document.querySelector("#RP");
            usuarioAuxiliar.numeroTarjeta = "";
            usuarioAuxiliar.codTarjeta = "";
            if (checkboxPF.checked === false && checkboxRP.checked === false) {
                event.preventDefault();
                cuponError.textContent = "Debe seleccionar al menos un tipo de cupón"
            }
            if (checkboxPF.checked) {
                usuarioAuxiliar.tipoCupon = ["Pago Fácil"];
            }
            if (checkboxRP.checked) {
                usuarioAuxiliar.tipoCupon = ["RapiPago"];
            }
        }
        if (metodoPagoSeleccionado === "Transferencia bancaria") {
            usuarioAuxiliar.numeroTarjeta = "";
            usuarioAuxiliar.codTarjeta = "";
            usuarioAuxiliar.tipoCupon = [];
        }
    }

    // parte contraseña
    if (quiereCambiarContrasenia) {
        if (!contraseniaValida.test(contraseniaNueva)) {
            event.preventDefault();
            mensajeError1.innerHTML = "La contraseña debe tener al menos 8 caracteres, 2 letras, 2 números y 2 símbolos";
            mensajeError1.style.color = "red";
        } else {
            mensajeError1.innerHTML = "";
        }

        if (contraseniaRepetida !== contraseniaNueva) {
            event.preventDefault();
            mensajeError2.innerHTML = "la contraseña no coincide";
            mensajeError2.style.color = "red";
        } else {
            mensajeError2.innerHTML = "";
        }
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let usuarioBuscado = usuarios.find(
        (user) => user.usuario === usuarioActual.usuario);

    if (contraseniaRepetida === contraseniaNueva && contraseniaValida.test(contraseniaNueva)) {
        if (quiereCambiarContrasenia) {
            usuarioBuscado.contrasenia = contraseniaNueva;
            usuarioActual.contrasenia = contraseniaNueva;
            alert("Contraseña cambiada exitosamente");
        }
    }
    if (quiereCambiarMetodoPago || quiereCambiarTipoCupon || quiereCambiarNumeroTarjeta) {
        usuarioBuscado.metodoPago = usuarioAuxiliar.metodoPago;
        usuarioBuscado.tipoCupon = usuarioAuxiliar.tipoCupon;
        usuarioBuscado.numeroTarjeta = usuarioAuxiliar.numeroTarjeta;
        usuarioBuscado.codTarjeta = usuarioAuxiliar.codTarjeta;
        usuarioActual.metodoPago = usuarioAuxiliar.metodoPago;
        usuarioActual.tipoCupon = usuarioAuxiliar.tipoCupon;
        usuarioActual.numeroTarjeta = usuarioAuxiliar.numeroTarjeta;
        usuarioActual.codTarjeta = usuarioAuxiliar.codTarjeta;
        usuarioBuscado.numeroTarjeta = usuarioAuxiliar.numeroTarjeta;
        usuarioActual.numeroTarjeta = usuarioAuxiliar.numeroTarjeta;

    }
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActual));
    console.log(usuarioBuscado)
})
console.log(JSON.parse(localStorage.getItem("usuarioActivo")).numeroTarjeta);


//--- eliminar usuario del LocalStorage ---
function eliminarUsuario() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let usuarioActual = JSON.parse(localStorage.getItem("usuarioActivo"));
    let nuevosUsuarios = usuarios.filter(function (user) {
        return user.usuario != usuarioActual.usuario;
    })
    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios))
    localStorage.removeItem("usuarioActivo")
}


document.querySelector(".boton-cancelar-js").addEventListener("click", function () {
    eliminarUsuario(console.log("Eliminado"));
})
// ---------------------------------------------------------
function mostrarMetodoDePago() {
    const RadioTarjeta = document.querySelector("#tarjeta-credito");
    const radioCupon = document.querySelector("#cupon");
    if (usuarioActual.metodoPago === "Tarjeta de crédito") {
        RadioTarjeta.checked = true;
        const campoTarjeta = document.querySelector("#campo-texto-tarjeta");
        const codigoTarjeta = document.querySelector("#codigo-texto-tarjeta");
        campoTarjeta.placeholder = usuarioActual.numeroTarjeta;
        codigoTarjeta.placeholder = usuarioActual.codTarjeta;

    }
    if (usuarioActual.metodoPago === "Cupón de pago") {
        radioCupon.checked = true;
        if (usuarioActual.tipoCupon[0] === "Pago Fácil") {  //Pongo el 0 para que se fije en la primera posicion del array
            const checkboxPagoFacil = document.querySelector("#PF").checked = true;
        }
        if (usuarioActual.tipoCupon[0] === "RapiPago") {  //Pongo el 0 para que se fije en la primera posicion del array
            const checkboxRapiPago = document.querySelector("#RP").checked = true;
        }
    }
    if (usuarioActual.metodoPago === "Transferencia bancaria") {
        const transferenciaBancaria = document.querySelector("#Transferencia").checked = true;
    }
}

mostrarMetodoDePago();

function inicializarCarrusel(idCarrusel, items) {//Crea el mismo carrusel que hay en serie-pelicula.html. Pasando por parametro el id del html carrusel  y los items que debe colocar dentro
    const carruselElement = document.getElementById(idCarrusel);
    const contenedor = carruselElement.parentElement;
    const btnPrev = contenedor.querySelector(".prev");
    const btnNext = contenedor.querySelector(".next");

    let index = 0;

    items.forEach(() => {
        const slide = document.createElement("div");//Crea los slides vacios 
        slide.classList.add("slide");
        carruselElement.appendChild(slide);
    });

    const slides = carruselElement.querySelectorAll(".slide");

    function actualizarCarrusel() {
        slides.forEach((slide, i) => {
            slide.classList.remove("activo");//Cada vez que se actualiza el i (indice) remueve el que esta activo
            slide.innerHTML = "";//Ademas de vaciarlo

            if (i === index) {//Si coincide, le agrega la clase activo y crea la tarjeta con <a> y la img
                slide.classList.add("activo");

                const linkElement = document.createElement("a");
                linkElement.href = `serie-pelicula.html?id=${items[index].id}`;

                const img = document.createElement("img");
                img.src = items[index].imagen.url;
                img.alt = items[index].imagen.alt;

                linkElement.appendChild(img);
                slide.appendChild(linkElement);
            }
        });
    }

    function mostrarSiguiente() {
        index = (index + 1) % items.length;
        actualizarCarrusel();
    }

    function mostrarAnterior() {
        index = (index - 1 + items.length) % items.length;
        actualizarCarrusel();
    }

    btnPrev.addEventListener("click", mostrarAnterior);//Ambas funciones aumentan o disminuyen el indice y no le permite excederse del maximo o minimo
    btnNext.addEventListener("click", mostrarSiguiente);

    actualizarCarrusel();
}

document.addEventListener("DOMContentLoaded", function () {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioData = usuarios.find(u => u.usuario === usuarioActivo?.usuario);//Busca el usuario activo en usuarios. El ? hace que devuelva null o undefined si no lo encuentra

    const favoritosSeries = usuarioData.favoritos.series || []; //Crea el array de series favoritas o vacio si no hay ninguna
    const favoritosPeliculas = usuarioData.favoritos.peliculas || [];//Crea el array de peliculas favoritas o vacio si no hay

    const seriesFavoritas = SERIES_Y_PELICULAS.filter(p => p.tipo === "serie" && favoritosSeries.includes(p.id));
    const peliculasFavoritas = SERIES_Y_PELICULAS.filter(p => p.tipo === "pelicula" && favoritosPeliculas.includes(p.id));
    //Busca en el array total todas las peliculas y series favoritas para poder traer sus datos 


    inicializarCarrusel("carrusel-series", seriesFavoritas);//Crea carrusel de serie con series favoritas
    inicializarCarrusel("carrusel-peliculas", peliculasFavoritas);//Crea carrusel de peliculas con peliculas favoritas
});

document.querySelectorAll('input[type="checkbox"][name="cupon"]').forEach((checkbox) => {//El queryselector busca el checkbox de name cupon
    checkbox.addEventListener("change", (e) => {
        if (e.target.checked) {//Si el target esta checkeado se ejecuta el if
            document.querySelectorAll('input[type="checkbox"][name="cupon"]').forEach((cb) => {
                if (cb !== e.target) cb.checked = false;//Se desmarca la opcion que esta checkeada
            });
        }
    });
});

document.querySelectorAll('input[name="opcion-pago"]').forEach(radio => {//El forEach se ejecuta constantemente
    radio.addEventListener('change', () => {//Si el radio button cambia
        const metodoSeleccionado = radio.value;//Se toma el metodo seleccionado
        if (metodoSeleccionado !== "Cupón de pago") {
            document.querySelectorAll('input[name="cupon"]').forEach(cb => cb.checked = false);
        }//Si el metodo seleccionado es distinto de cupon de pago, se marca el radio button como false

        if (metodoSeleccionado !== "Tarjeta de crédito") {//Si el metodo es distinto de tarjeta de credito, se vacian los campos
            const campoTarjeta = document.querySelector("#campo-texto-tarjeta");
            const codigoTarjeta = document.querySelector("#codigo-texto-tarjeta");
            if (campoTarjeta) {
                campoTarjeta.value = "";
                campoTarjeta.placeholder = "Numero de tarjeta";
            }

            if (codigoTarjeta) {
                codigoTarjeta.value = "";
                codigoTarjeta.placeholder ="XXX";
            }

        }

        cuponError.textContent = "";
        numeroTarjetaError.textContent = "";
        codigoTarjetaError.textContent = "";
    });
});
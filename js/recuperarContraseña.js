const formRecuperar = document.querySelector(".main__primary__form"); // seleccionamos el formulario
const correoInput = document.querySelector("#correo"); // input de email
const usuarioInput = document.querySelector("#usuario"); // input de usuario
const botonEnviar = formRecuperar.querySelector("button"); // botón de enviar email

// función para habilitar o deshabilitar el botón según los campos estén completos
function actualizarEstadoBoton() {
  if (correoInput.value.trim() !== "" && usuarioInput.value.trim() !== "") {
    botonEnviar.disabled = false;
  } else {
    botonEnviar.disabled = true;
  }
}

// escuchamos cambios en ambos inputs
correoInput.addEventListener("input", actualizarEstadoBoton);
usuarioInput.addEventListener("input", actualizarEstadoBoton);

// llamamos a la función una vez al cargar por si ya hay texto cuando cargas la pagina (osea si tenes guardado contraseña y usuario)
actualizarEstadoBoton();

formRecuperar.addEventListener("submit", function(e) {
  e.preventDefault(); // prevenir el comportamiento por defecto (recargar)

  const correo = correoInput.value.trim();
  const usuario = usuarioInput.value.trim();

  const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || []; // obtenemos usuarios guardados

  const usuarioEncontrado = usuariosGuardados.find( // buscamos coincidencia
    (user) => user.correo === correo && user.usuario === usuario
  );

  if (usuarioEncontrado) {
    alert("Se ha enviado un correo con instrucciones para restablecer su contraseña.");
    window.location.href = "../index.html";
  } else {
    alert("Correo o nombre de usuario incorrecto.");
  }
});

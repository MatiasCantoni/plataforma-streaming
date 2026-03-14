const loginForm = document.querySelector(".main__primary__form"); // buscamos el formulario y lo guardamos en la cons loginForm

const usuarioInput = document.querySelector("#usuario"); // seleccionamos el input del usuario
const contraseniaInput = document.querySelector("#contraseña"); // seleccionamos el input de la contraseña
const botonLogin = loginForm.querySelector("button"); // seleccionamos el botón del formulario

function actualizarEstadoBoton() {
  if (usuarioInput.value.trim() !== "" && contraseniaInput.value.trim() !== "") {
    botonLogin.disabled = false; // habilitamos el botón
  } else {
    botonLogin.disabled = true; // lo deshabilitamos si falta algo
  }
}

// escuchamos los cambios en ambos campos para actualizar el estado del botón
usuarioInput.addEventListener("input", actualizarEstadoBoton);
contraseniaInput.addEventListener("input", actualizarEstadoBoton);

// llamamos a la función una vez al cargar por si ya hay texto cuando cargas la pagina (osea si tenes guardado contraseña y usuario)
actualizarEstadoBoton();

loginForm.addEventListener("submit", function(e) { // agregamos evento tipo submit ya que se ejecuta cuando el usuario envía
  e.preventDefault(); 

  const usuario = document.querySelector("#usuario").value;
  const contrasenia = document.querySelector("#contraseña").value;

  const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || []; // se busca en el localStorage 'usuarios' 
                                                                                 // y el JSON.parse lo convierte en un array de objetos

  const usuarioValido = usuariosGuardados.find( // el método .find busca en el array el usuario que cumpla ambas condiciones
    (user) => user.usuario === usuario && user.contrasenia === contrasenia
  );

  if (usuarioValido) {
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioValido)) // si es válido, lo guardamos como usuario activo
  } else {
    alert("Usuario o contraseña incorrectos!");
    return;
  }

  alert(`Inicio exitoso`);

  window.location.href = "./paginas/pantalla-principal.html"; // redireccionamos a la pantalla principal
});
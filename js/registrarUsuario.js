// guardamos los mensajes de error
const ERROR_MESSAGES = {
  nombre: "Solo se permiten letras",
  apellido: "Solo se permiten letras",
  correo: "Ingrese un email válido (ej: ejemplo@correo.com)",
  usuario: "Solo se permiten letras y números",
  contrasenia: "La contraseña debe tener al menos 8 caracteres, 2 letras, 2 números y 2 símbolos",
  contraseniaB: "Las contraseñas no coinciden",
  numeroTarjeta: "Debe contener exactamente 16 dígitos",
  codTarjeta: "Debe contener exactamente 3 números",
  codTarjetaZeros: "La clave no puede ser 000",
  tarjetaPar: "El último dígito debe ser par (la suma de los anteriores es impar)",
  tarjetaImpar: "El último dígito debe ser impar (la suma de los anteriores es par)",
  metodoPago: "Debe seleccionar un método de pago"
};

function actualizarEstadoBoton() {
  const registerForm = document.getElementById('registerForm');
  const submitBtn = registerForm.querySelector('button');

  // se obtienen todos los campos desde el formulario 
  const nombre = registerForm.querySelector('#nombre').value.trim();
  const apellido = registerForm.querySelector('#apellido').value.trim();
  const correo = registerForm.querySelector('#correo').value.trim();
  const usuario = registerForm.querySelector('#usuario').value.trim();
  const contrasenia = registerForm.querySelector('#contrasenia').value.trim();
  const contraseniaB = registerForm.querySelector('#contraseniaB').value.trim();

  // también obtenemos los radios desde el formulario 
  const radioTarjeta = registerForm.querySelector('#tarjeta');
  const radioCupon = registerForm.querySelector('#cupon');
  const radioTransferencia = registerForm.querySelector('#transferencia');


  //validar que los campos no esten vacios
  const camposBasicosCompletos = nombre !== "" && apellido !== "" && correo !== "" &&
    usuario !== "" && contrasenia !== "" && contraseniaB !== "";

  // Validar que se seleccionó un método de pago
  const metodoPagoSeleccionado = radioTarjeta.checked || radioCupon.checked || radioTransferencia.checked;


  let camposMetodoPagoCompletos = true;

  if (radioTarjeta.checked) {
    const numeroTarjeta = registerForm.querySelector("#numeroTarjeta").value.trim();
    const codTarjeta = registerForm.querySelector("#codTarjeta").value.trim();
    camposMetodoPagoCompletos = numeroTarjeta !== "" && codTarjeta !== "";
  }

  if (radioCupon.checked) {
    const pagoFacil = registerForm.querySelector('#pago-facil').checked;
    const rapiPago = registerForm.querySelector('#rapi-pago').checked;
    camposMetodoPagoCompletos = pagoFacil || rapiPago;
  }

  // Habilitar botón solo si todo está completo
  submitBtn.disabled = !(camposBasicosCompletos && metodoPagoSeleccionado && camposMetodoPagoCompletos);
}

// Función principal de validación
function registerValidate() {
  const registerForm = document.getElementById('registerForm')
  const submitBtn = registerForm.querySelector('button')



  const radioTarjeta = document.getElementById('tarjeta');
  const radioCupon = document.getElementById('cupon');
  const radioTransferencia = document.getElementById('transferencia');

  // eventos para la actualizacion del boton
  document.getElementById('nombre').addEventListener('input', actualizarEstadoBoton);
  document.getElementById('apellido').addEventListener('input', actualizarEstadoBoton);
  document.getElementById('correo').addEventListener('input', actualizarEstadoBoton);
  document.getElementById('usuario').addEventListener('input', actualizarEstadoBoton);
  document.getElementById('contrasenia').addEventListener('input', actualizarEstadoBoton);
  document.getElementById('contraseniaB').addEventListener('input', actualizarEstadoBoton);

  // Campos de tarjeta
  document.getElementById('numeroTarjeta').addEventListener('input', actualizarEstadoBoton);
  document.getElementById('codTarjeta').addEventListener('input', actualizarEstadoBoton);

  // Métodos de pago
  radioTarjeta.addEventListener('change', actualizarEstadoBoton);
  radioCupon.addEventListener('change', actualizarEstadoBoton);
  radioTransferencia.addEventListener('change', actualizarEstadoBoton);

  // Checkboxes de cupón
  document.getElementById('pago-facil').addEventListener('change', actualizarEstadoBoton);
  document.getElementById('rapi-pago').addEventListener('change', actualizarEstadoBoton);

  document.getElementById('pago-facil').addEventListener('change', function () {
    if (this.checked) {
      radioTarjeta.checked = false;
      radioTransferencia.checked = false;
      document.getElementById('numeroTarjeta').value = '';
      document.getElementById('codTarjeta').value = '';
    }
    actualizarEstadoBoton();
  });

  document.getElementById('rapi-pago').addEventListener('change', function () {
    if (this.checked) {
      radioTarjeta.checked = false;
      radioTransferencia.checked = false;
      document.getElementById('numeroTarjeta').value = '';
      document.getElementById('codTarjeta').value = '';
    }
    actualizarEstadoBoton();
  });
  // si el usuario selecciona tarjeta
  radioTarjeta.addEventListener('change', function () {
    if (this.checked) {
      document.getElementById('pago-facil').checked = false;
      document.getElementById('rapi-pago').checked = false;
    }
    actualizarEstadoBoton();
  });

  // si el usuario selecciona cupon de pago
  radioCupon.addEventListener('change', function () {
    if (this.checked) {

      document.getElementById('numeroTarjeta').value = '';
      document.getElementById('codTarjeta').value = '';
    }
    actualizarEstadoBoton();
  });

  // si el usuario selecciona transferencia
  radioTransferencia.addEventListener('change', function () {
    if (this.checked) {
      document.getElementById('numeroTarjeta').value = '';
      document.getElementById('codTarjeta').value = '';
      document.getElementById('pago-facil').checked = false;
      document.getElementById('rapi-pago').checked = false;
    }
    actualizarEstadoBoton();
  });

  //se ejecuta apenas carga la pagina
  actualizarEstadoBoton();

  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Inputs a validar
    const nombre = registerForm.querySelector('#nombre').value.trim();
    const apellido = registerForm.querySelector('#apellido').value.trim();
    const correo = registerForm.querySelector('#correo').value.trim();
    const usuario = registerForm.querySelector('#usuario').value.trim();
    const contrasenia = registerForm.querySelector('#contrasenia').value;
    const contraseniaB = registerForm.querySelector('#contraseniaB').value;
    const numeroTarjeta = registerForm.querySelector('#numeroTarjeta').value.trim();
    const codTarjeta = registerForm.querySelector('#codTarjeta').value.trim();

    // Mensajes de error
    const nombreError = registerForm.querySelector('.js-nombre-error');
    const apellidoError = registerForm.querySelector('.js-apellido-error');
    const correoError = registerForm.querySelector('.js-correo-error');
    const usuarioError = registerForm.querySelector('.js-usuario-error');
    const contraseniaError = registerForm.querySelector('.js-contrasenia-error');
    const contraseniaBError = registerForm.querySelector('.js-contraseniaB-error');
    const numeroTarjetaError = registerForm.querySelector('.js-numeroTarjeta-error');
    const codTarjetaError = registerForm.querySelector('.js-codTarjeta-error');
    const metodoPagoError = registerForm.querySelector('.js-metodoPago-error');

    // Limpiar errores
    nombreError.textContent = "";
    apellidoError.textContent = "";
    correoError.textContent = "";
    usuarioError.textContent = "";
    contraseniaError.textContent = "";
    contraseniaBError.textContent = "";
    numeroTarjetaError.textContent = "";
    codTarjetaError.textContent = "";
    metodoPagoError.textContent = "";
    let isFormValid = true;

    // Validaciones existentes
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre) || nombre === "") {
      nombreError.textContent = ERROR_MESSAGES.nombre
      isFormValid = false;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido) || apellido === "") {
      apellidoError.textContent = ERROR_MESSAGES.apellido
      isFormValid = false;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo) || correo === "") {
      correoError.textContent = ERROR_MESSAGES.correo;
      isFormValid = false;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]+$/.test(usuario) || usuario === "") {
      usuarioError.textContent = ERROR_MESSAGES.usuario;
      isFormValid = false;
    }

    if (!/^(?=(?:.*[A-Za-z]){2,})(?=(?:.*\d){2,})(?=(?:.*[!@#$%^&*()_\-+=?¿¡:;.,<>]){2,}).{8,}$/.test(contrasenia)) {
      contraseniaError.textContent = ERROR_MESSAGES.contrasenia;
      isFormValid = false;
    }

    if (contrasenia !== contraseniaB || contraseniaB === "") {
      contraseniaBError.textContent = ERROR_MESSAGES.contraseniaB;
      isFormValid = false;
    }

    if (!radioTarjeta.checked && !radioCupon.checked && !radioTransferencia.checked) {
      metodoPagoError.textContent = ERROR_MESSAGES.metodoPago;
      isFormValid = false;
    }


    if (radioTarjeta.checked) {

      if (numeroTarjeta === "") {
        numeroTarjetaError.textContent = "El número de tarjeta es obligatorio";
        isFormValid = false;
        // regex para verificar que hayan 16 numeros
      } else if (!/^\d{16}$/.test(numeroTarjeta)) {
        numeroTarjetaError.textContent = ERROR_MESSAGES.numeroTarjeta;
        isFormValid = false;
      } else {

        let suma = 0;
        // se suman los primero 15 numeros
        for (let i = 0; i < 15; i++) {
          suma += parseInt(numeroTarjeta[i]);
        }
        let ultimoDigito = parseInt(numeroTarjeta[15]); // guardamos el ultimo digito

        // Si la suma es par, el último dígito debe ser impar
        if (suma % 2 === 0 && ultimoDigito % 2 === 0) {
          numeroTarjetaError.textContent = ERROR_MESSAGES.tarjetaImpar;
          isFormValid = false;
          // Si la suma es impar, el último dígito debe ser par
        } else if (suma % 2 === 1 && ultimoDigito % 2 === 1) {
          numeroTarjetaError.textContent = ERROR_MESSAGES.tarjetaPar;
          isFormValid = false;
        }
      }

      // validamos codigo de la tarjeta
      if (!/^\d{3}$/.test(codTarjeta)) {
        codTarjetaError.textContent = ERROR_MESSAGES.codTarjeta;
        isFormValid = false;

      } else if (codTarjeta === "000") {
        codTarjetaError.textContent = ERROR_MESSAGES.codTarjetaZeros;
        isFormValid = false;
      }
    }


    if (radioCupon.checked) {

      const pagoFacil = document.getElementById('pago-facil').checked;
      const rapiPago = document.getElementById('rapi-pago').checked;
      if (!pagoFacil && !rapiPago) {
        metodoPagoError.textContent = "Debe seleccionar al menos un tipo de cupón";
        isFormValid = false;
      }
    }

    if (isFormValid) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      // Verificar si el usuario o correo ya existe
      const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];


      const usuarioRepetido = usuariosGuardados.some(function (usuarioGuardado) {
        return usuarioGuardado.usuario === usuario;
      });

      const correoRepetido = usuariosGuardados.some(function (usuarioGuardado) {
        return usuarioGuardado.correo === correo;
      });

      if (usuarioRepetido || correoRepetido) {


        if (usuarioRepetido) {
          usuarioError.textContent = "Este nombre de usuario ya está registrado.";
        }

        if (correoRepetido) {
          correoError.textContent = "Este correo ya está registrado.";
        }

        submitBtn.disabled = false;
        submitBtn.textContent = "Confirmar";
        return;
      }


      // determinamos metodo de pago
      let metodoPago = "";
      if (radioTarjeta.checked) {
        metodoPago = "Tarjeta de crédito";
      } else if (radioCupon.checked) {
        metodoPago = "Cupón de pago";
      } else if (radioTransferencia.checked) {
        metodoPago = "Transferencia bancaria";
      }

      // creamos objeto de usuario
      const usuarioData = {
        nombre,
        apellido,
        correo,
        usuario,
        contrasenia,
        metodoPago
      };


      if (radioTarjeta.checked) {
        usuarioData.numeroTarjeta = numeroTarjeta;
        usuarioData.codTarjeta = codTarjeta;
      }


      if (radioCupon.checked) {
        usuarioData.tipoCupon = [];
        if (document.getElementById("pago-facil").checked) {
          usuarioData.tipoCupon.push("Pago Fácil");
        }
        if (document.getElementById("rapi-pago").checked) {
          usuarioData.tipoCupon.push("RapiPago");
        }
      }


      usuariosGuardados.push(usuarioData);
      localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Confirmar";
        registerForm.reset();
        actualizarEstadoBoton();
        window.location.href = "../index.html";
      }, 1000);
    }
  });
}
document.querySelectorAll('input[type="checkbox"][name="tipoCupon"]').forEach((checkbox) => {//El queryselector busca el checkbox de name cupon
  checkbox.addEventListener("change", (e) => {
    if (e.target.checked) {//Si el target esta checkeado se ejecuta el if
      document.querySelectorAll('input[type="checkbox"][name="tipoCupon"]').forEach((cb) => {
        if (cb !== e.target) cb.checked = false;//Se desmarca la opcion que esta checkeada
      });
    }
  });
});
registerValidate();

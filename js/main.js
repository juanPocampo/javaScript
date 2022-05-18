/*!
 * Start Bootstrap - Scrolling Nav v5.0.5 (https://startbootstrap.com/template/scrolling-nav)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-scrolling-nav/blob/master/LICENSE)
 */

//
// Scripts
//

// Declaración de constantes
const CC = "Cuenta Corriente";
const CP = "Caja de Ahorro en Pesos";
const CD = "Caja de Ahorro en Dolares";

// Declaración del array clientes
const arrayClientes = JSON.parse(localStorage.getItem("arrayClientes")) || [];

let cliente = JSON.parse(sessionStorage.getItem("usuario")) || {};

// Función display de menúes
function abrirMenu(menu) {
  if (menu == "menuNuevoCliente") {
    document.querySelector("#menuPrincipal").style.display = "none";
    document.querySelector("#menuNuevoCliente").style.display = "block";
  } else if (menu == "menuLogin") {
    document.querySelector("#menuPrincipal").style.display = "none";
    document.querySelector("#menuLogin").style.display = "block";
  } else if (menu == "menuClave") {
    document.querySelector("#menuPrincipal").style.display = "none";
    document.querySelector("#menuClave").style.display = "block";
  } else {
    document.querySelector("#menuClave").style.display = "none";
    document.querySelector("#menuNuevoCliente").style.display = "none";
    document.querySelector("#menuLogin").style.display = "none";
    document.querySelector("#menuPrincipal").style.display = "block";
  }
}
// Fin función display menúes

// Evento click ingresar
if (document.querySelector("#loginCliente")) {
  document
    .querySelector("#loginCliente")
    .addEventListener("click", () => abrirMenu("menuLogin"));
}

// Evento click registrarme
if (document.querySelector("#nuevoRegistro")) {
  document
    .querySelector("#nuevoRegistro")
    .addEventListener("click", () => abrirMenu("menuNuevoCliente"));
}
// Evento click recuperar clave
if (document.querySelector("#recuperoClave")) {
  document
    .querySelector("#recuperoClave")
    .addEventListener("click", () => abrirMenu("menuClave"));
}

// Función nuevo cliente y control evento
if (document.querySelector("#formNuevoCliente")) {
  document
    .querySelector("#formNuevoCliente")
    .addEventListener("submit", nuevoCliente);
}
/* const header = `<div class="headerSaldoCC">${cliente.hasOwnProperty("saldo") ? cliente.saldo.CC : ""
  }</div>
  <div class="headerSaldoCP">${cliente.hasOwnProperty("saldo") ? cliente.saldo.CP : ""
  }</div>
                <div class="headerSaldoCD">${cliente.hasOwnProperty("saldo") ? cliente.saldo.CD : ""
  }</div>`; */

const header = `<h2 class="mt-4">Saldos</h2>
  <div class="row mb-3">
    <div class="col-md-3 themed-grid-col">Cuenta corriente<br>$ ${cliente.hasOwnProperty("saldo") ? new Intl.NumberFormat("es-ES").format(parseFloat((cliente.saldo.CC)).toFixed(2)) : ""
  }</div>
    <div class="col-md-3 themed-grid-col">Caja de ahorro en pesos<br>$ ${cliente.hasOwnProperty("saldo") ? new Intl.NumberFormat("es-ES").format(parseFloat((cliente.saldo.CP)).toFixed(2)) : ""
  }</div>
    <div class="col-md-3 themed-grid-col">Caja de ahorro en dólares<br>U$S ${cliente.hasOwnProperty("saldo") ? new Intl.NumberFormat("es-ES").format(parseFloat((cliente.saldo.CD)).toFixed(2)) : ""
  }</div>
  </div><hr>`

function nuevoCliente(e) {
  // Detener el envío del formulario submit
  e.preventDefault();
  // Recuperar información de los inputs
  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const dni = document.querySelector("#dni").value;
  const edad = document.querySelector("#edad").value;
  const clave = document.querySelector("#clave").value;
  const saldo = { CC: 1000000, CP: 0, CD: 0 };
  const operaciones = [];
  // Creación del objeto persona
  const cliente = {
    nombre,
    apellido,
    dni,
    edad,
    clave,
    saldo,
    operaciones,
  };
  if (edad >= 18) {
    // Pusheo en el array y disparo de un sweet alert para informar que el cliente fue registrado
    arrayClientes.push(cliente);
    Swal.fire({
      title: "Nuevo cliente registrado",
      icon: "success",
      imageWidth: 400,
      imageHeight: 200,
      showConfirmButton: true,
    });
    // Guardado del array en localstorage y conversión en JSON
    localStorage.setItem("arrayClientes", JSON.stringify(arrayClientes));
    document.querySelector("#menuPrincipal").style.display = "block";
    document.querySelector("#menuNuevoCliente").style.display = "none";
  } else {
    // Disparo de un sweet alert en el caso de que la persona sea menor a 18 años
    Swal.fire({
      title: "Debe ser mayor a 18 años",
      icon: "warning",
      imageWidth: 400,
      imageHeight: 200,
      showConfirmButton: true,
    });
  }
  // Incorporo un operador ternario para segmentar los clientes según sean activos o jubilados
  const jubilado = cliente.edad > 65 ? true : false;
  jubilado
    ? console.log("Nuevo cliente segmento jubilados")
    : console.log("Nuevo cliente segmento activos");
  // Incorporo un operador lógico AND y desestructuro la variable "edad" para guardar en consola. Si es activo, no guardo el registro de la fecha; si es jubilado sí lo guardo.
  const registroIngreso = cliente.edad >= 65 && new Date();
  console.log(registroIngreso);
  console.log(edad);
  console.log(...arrayClientes);
}
// Fin función nuevo cliente

// Función recuperar clave
if (document.querySelector("#formRecuperarClave")) {
  document
    .querySelector("#formRecuperarClave")
    .addEventListener("submit", recuperarClave);
}
function recuperarClave(e) {
  // Detener el envío del formulario submit
  e.preventDefault();
  // Buscar información input DNI
  const dniBuscar = document.querySelector("#dniBuscar").value;
  // Buscar en localstorage
  const arrayParaBuscar = JSON.parse(sessionStorage.getItem("arrayClientes"));
  const resultadoBuscar = arrayParaBuscar.find(
    (personita) => personita.dni == dniBuscar
  );
  let textoPersonaEncontrada;
  if (resultadoBuscar != undefined) {
    textoPersonaEncontrada = `<h2>${resultadoBuscar.nombre} ${resultadoBuscar.apellido}</h2>
                                <span><h2>DNI ${resultadoBuscar.dni}</h2></span><br>
                                <span class="claveRecuperada">Clave ${resultadoBuscar.clave}</span><br>
                                <a href="./principal.html" class="btnOp ingreso" id="ingresar">Ir al menú principal</a><br>`;
  } else {
    textoPersonaEncontrada = `No hay ninguna coincidencia
                                <br><br><a href="./principal.html" class="btnOp volverPpal" id="volver">Volver</a>`;
  }
  // Modifico el HTML a través de los id correspondiente (borro y luego escribo)
  let borrarMenuClave = `<p></p>`;
  document.querySelector("#borrarMenuClave").innerHTML = borrarMenuClave;
  document.querySelector("#clienteEncontrado").innerHTML =
    textoPersonaEncontrada;
}
// Fin función recuperar clave

// Función ingresar
if (document.querySelector("#formLogin")) {
  document
    .querySelector("#formLogin")
    .addEventListener("submit", ingresoCliente);
}
function ingresoCliente(e) {
  // Paramos el envio del formulario submit
  e.preventDefault();
  const arrayParaBuscar = JSON.parse(localStorage.getItem("arrayClientes"));
  if (arrayParaBuscar) {
    // Buscar información input DNI
    const dniLogin = document.querySelector("#dniLogin").value;
    const claveLogin = document.querySelector("#claveLogin").value;
    // Buscar en localstorage
    const resultadoBuscar = arrayParaBuscar.find(
      (personita) => personita.dni == dniLogin
    );
    let textoLogin = document.getElementById("#menuLogin");
    if (resultadoBuscar?.clave == claveLogin) {
      sessionStorage.setItem("usuario", JSON.stringify(resultadoBuscar));
      console.info("Cliente logueado:", cliente);
      textoLogin = `<h4 class="bienvenido">Bienvenido</h4>
                    <span><h2>${resultadoBuscar.nombre} ${resultadoBuscar.apellido}</h2></span><br>
                    <a href="./operaciones.html" class="btnOp operacion" id="operar">Operar</a><br>
                    <a href="./principal.html" class="btnOp salir" id="salir">Salir</a><br>`;
      // Disparo de un sweet alert en el caso de que el ingreso del cliente sea correcto
      Swal.fire({
        icon: "success",
        title: "Ingreso exitoso",
        showConfirmButton: true,
      });
      // Si algún dato ingresado es incorrecto, se le avisa al cliente
    } else {
      textoLogin = `<span class="alerta"><h3 class="alert1">Alguno de los datos ingresados es incorrecto</h3><br><br><h3 class="alert2">Intente nuevamente</span></h4><br>
                    <a href="./principal.html" class="btnOp volver" id="volver">Volver</a><br>`;
    }
    let borrarMenuLogin = `<p></p>`;
    document.querySelector("#borrarMenuLogin").innerHTML = borrarMenuLogin;
    document.querySelector("#clienteLogin").innerHTML = textoLogin;
  } else {
    // Disparo de un sweet alert en el caso de que no haya clientes registrados
    Swal.fire({
      position: "down-center",
      icon: "warning",
      title: "No hay clientes registrados",
      showConfirmButton: true,
    });
  }
}
// Fin función ingresar

// Función display de menúes de operaciones
function abrirMenuOp(menu) {
  // Operación transferencia a cuentas propias
  if (menu == "transfPropia0") {
    document.querySelector("#menuOperaciones").style.display = "none";
    document.querySelector("#transfPropia0").style.display = "block";
    const element = document.querySelector("#encabezadoMenuOp");
    element.remove();
    document.querySelector("#transfPropia0").innerHTML =
      header +
      `<h2 class="dolarTitulo0">Transferencia a cuenta propia</h2>
                                                                <form id="transfPropia">
                                                                    <span id="origen">
                                                                        <label for="cuenta">Seleccione la cuenta de <strong>origen:</strong></label>
                                                                            <span>
                                                                                <select name="cuentas" id="cuentaOrigen">
                                                                                    <option value=""></option>
                                                                                    <option value="${CC}">Cuenta Corriente</option>
                                                                                    <option value="${CP}">Caja de Ahorro</option>
                                                                                </select>
                                                                            </span>
                                                                            <br><br>
                                                                    </span>    
                                                                    <div class="inputTransfPropia">
                                                                        <span>
                                                                          <h4 class="ingresarImporteTransf">Ingresá el importe a transferir</h4>
                                                                          <input type="number" name="inputMonto" id="inputMonto" class="inputMonto" required>
                                                                        </span>
                                                                    </div>
                                                                    <br>
                                                                    <input type="submit" class="btnOp confirmTransfPropia" id="confimTransfPropia" value="Confirmar">
                                                                    <a href="./operaciones.html" class="btnOp volverTransf" id="volver">Volver</a>
                                                                </form>`;
    // Al seleccionar una cuenta de origen, se modifica el id con el texto "Cuenta origen... Cuenta Destino"
    let origen = document.getElementById("cuentaOrigen");
    origen.onchange = () => {
      if (origen.value === CC) {
        document.querySelector(
          "#origen"
        ).innerHTML = `<strong>Origen</strong>: ${CC}<br><br>
                        <strong>Destino</strong>: ${CP}<br><br>`;
      } else if (origen.value === CP) {
        document.querySelector(
          "#origen"
        ).innerHTML = `<strong>Origen</strong>:${CP}<br><br>
                        <strong>Destino</strong>:${CC}<br><br>`;
      }
    };
    // Función confirmar transferencia (crear un objeto con los datos de la operación)
    if (document.querySelector("#transfPropia")) {
      document
        .querySelector("#transfPropia")
        .addEventListener("submit", confTransfPropia);
    }
    function confTransfPropia(e) {
      // Paramos el envio del formulario submit
      e.preventDefault();
      // Recuperar información de los selects
      const tipo = "Transferencia a Cuenta Propia";
      const importe = Number(document.querySelector("#inputMonto").value);
      // Creación del objeto
      const operacion = {
        tipo,
        origen: origen.value,
        destino: origen.value === CC ? CP : CC,
        importe,
      };
      // Actualizo saldos
      switch (origen.value) {
        case CC:
          if (!(cliente.saldo.CC - importe < 0)) {
            console.log("si entró");
            cliente.saldo.CC = cliente.saldo.CC - importe;
            cliente.saldo.CP = cliente.saldo.CP + importe;

            // Pusheo en el array
            cliente.operaciones.push(operacion);
            const arrayClientes = JSON.parse(
              localStorage.getItem("arrayClientes")
            );
            const oldCliente = arrayClientes.find(
              (elemento) => elemento.dni == cliente.dni
            );
            sessionStorage.setItem("usuario", JSON.stringify(cliente));
            const index = arrayClientes.indexOf(oldCliente);
            arrayClientes.splice(index, 1);
            arrayClientes.push(cliente);
            localStorage.setItem(
              "arrayClientes",
              JSON.stringify(arrayClientes)
            );
            Swal.fire({
              title: "Operación realizada",
              icon: "success",
              imageWidth: 400,
              imageHeight: 200,
              showConfirmButton: true,
            }).then(() => {
              window.open("./comprobante.html");
            });
          } else {
            Swal.fire({
              title: "Oops ha ocurrido un error inesperado",
              text: "No tiene saldo suficiente en su cuenta para realizar esta operación.",
              icon: "error",
              imageWidth: 400,
              imageHeight: 200,
              showConfirmButton: true,
            });
          }
          break;
        case CP:
          if (!(cliente.saldo.CP - importe < 0)) {
            cliente.saldo.CC = cliente.saldo.CC + importe;
            cliente.saldo.CP = cliente.saldo.CP - importe;
            // Pusheo en el array
            cliente.operaciones.push(operacion);
            const arrayClientes = JSON.parse(
              localStorage.getItem("arrayClientes")
            );
            const oldCliente = arrayClientes.find(
              (elemento) => elemento.dni == cliente.dni
            );
            sessionStorage.setItem("usuario", JSON.stringify(cliente));
            const index = arrayClientes.indexOf(oldCliente);
            arrayClientes.splice(index, 1);
            arrayClientes.push(cliente);
            localStorage.setItem(
              "arrayClientes",
              JSON.stringify(arrayClientes)
            );
            Swal.fire({
              title: "Operación realizada",
              icon: "success",
              imageWidth: 400,
              imageHeight: 200,
              showConfirmButton: true,
            }).then(() => {
              window.open("./comprobante.html");
            });
          } else {
            Swal.fire({
              title: "Oops ha ocurrido un error inesperado",
              text: "No tiene saldo suficiente en su cuenta para realizar esta operación.",
              icon: "error",
              imageWidth: 400,
              imageHeight: 200,
              showConfirmButton: true,
            });
          }
          break;
        default:
          Swal.fire({
            title: "Oops ha ocurrido un error inesperado",
            text: "El origen seleccionado no está definido.",
            icon: "error",
            imageWidth: 400,
            imageHeight: 200,
            showConfirmButton: true,
          });
          break;
      }
    }
    // Fin función confirmar transferencia
    // Fin operación transferencia a cuentas propias
  } else if (menu == "transfTerceros0") {
    document.querySelector("#menuOperaciones").style.display = "none";
    document.querySelector("#transfTerceros0").style.display = "block";
    const element = document.querySelector("#encabezadoMenuOp");
    element.remove();
    document.querySelector("#transfTerceros0").innerHTML =
      header +
      `<h2 class="dolarTitulo0">Transferencia a cuenta de terceros</h2>
                                                                <form id="transfTerceros">
                                                                  <span id="origenTerceros">
                                                                      <label for="cuenta">Seleccione la cuenta de origen:</label>
                                                                        <span>
                                                                        <select name="cuentas" id="cuentaOrigen">
                                                                          <option value=""></option>
                                                                          <option value="${CC}">Cuenta Corriente</option>
                                                                          <option value="${CP}">Caja de Ahorro</option>
                                                                        </select>
                                                                        </span>   
                                                                        <br><br>
                                                                  </span>   
                                                                    <label for="cuenta">Ingrese CBU de la cuenta de destino:</label>
                                                                    <input type="text" name="montoTransf" id="CBUDestino" class="input" pattern=".{22}" title="Debe contener 22 números" required><br>
                                                                    <div class="inputTransfTerceros">
                                                                      <h4 class="ingresarImporteTransf">Ingresá el importe a transferir</h4>
                                                                      <input type="number" name="inputMonto" id="inputMonto" class="inputMonto" required><br>
                                                                    </div>
                                                                    <input type="submit" class="btnOp confirmTransfPropia" id="confimTransfPropia" value="Confirmar">
                                                                    <a href="./operaciones.html" class="btnOp volverTransf" id="volver">Volver</a>
                                                                </form>`;
    // Al seleccionar una cuenta de origen, se modifica el id con el texto "Origen: Cuenta Corriente / Caja de Ahorro"
    let origen = document.getElementById("cuentaOrigen");
    origen.onchange = () => {
      console.log(origen.value);
      if (origen.value === CC) {
        document.querySelector(
          "#origenTerceros"
        ).innerHTML = `<strong>Origen</strong>: ${CC}<br><br>`;
      } else if (origen.value === CP) {
        document.querySelector(
          "#origenTerceros"
        ).innerHTML = `<strong>Origen</strong>:${CP}<br><br>`;
      }
    };
    // Función confirmar transferencia a terceros
    if (document.querySelector("#transfTerceros")) {
      document
        .querySelector("#transfTerceros")
        .addEventListener("submit", confTransfTerceros);
    }
    function confTransfTerceros(e) {
      // Paramos el envio del formulario submit
      e.preventDefault();
      // Recuperar información de los selects
      {
        const tipo = "Transferencia a Cuenta de Terceros";
        const importe = Number(document.querySelector("#inputMonto").value);
        // Creación del objeto
        const operacion = {
          tipo,
          origen: origen.value,
          destino: document.querySelector("#CBUDestino").value,
          importe,
        };
        // Actualizo saldos
        switch (origen.value) {
          case CC:
            if (!(cliente.saldo.CC - importe < 0)) {
              cliente.saldo.CC -= importe;
              // Pusheo en el array
              cliente.operaciones.push(operacion);
              const arrayClientes = JSON.parse(
                localStorage.getItem("arrayClientes")
              );
              const oldCliente = arrayClientes.find(
                (elemento) => elemento.dni == cliente.dni
              );
              sessionStorage.setItem("usuario", JSON.stringify(cliente));
              const index = arrayClientes.indexOf(oldCliente);
              arrayClientes.splice(index, 1);
              arrayClientes.push(cliente);
              localStorage.setItem(
                "arrayClientes",
                JSON.stringify(arrayClientes)
              ); // dentro del cliente ya está guardada la operacion en su atributo operaciones
              Swal.fire({
                title: "Operación realizada",
                icon: "success",
                imageWidth: 400,
                imageHeight: 200,
                showConfirmButton: true,
              }).then(() => {
                window.open("./comprobante.html");
              });
            } else {
              Swal.fire({
                title: "Oops ha ocurrido un error inesperado",
                text: "No tiene saldo suficiente en su cuenta para realizar esta operación.",
                icon: "error",
                imageWidth: 400,
                imageHeight: 200,
                showConfirmButton: true,
              });
            }
            break;
          case CP:
            if (!(cliente.saldo.CP - importe < 0)) {
              cliente.saldo.CP -= importe;
              // Pusheo en el array
              cliente.operaciones.push(operacion);
              const arrayClientes = JSON.parse(
                localStorage.getItem("arrayClientes")
              );
              const oldCliente = arrayClientes.find(
                (elemento) => elemento.dni == cliente.dni
              );
              sessionStorage.setItem("usuario", JSON.stringify(cliente));
              const index = arrayClientes.indexOf(oldCliente);
              arrayClientes.splice(index, 1);
              arrayClientes.push(cliente);
              localStorage.setItem(
                "arrayClientes",
                JSON.stringify(arrayClientes)
              ); // dentro del cliente ya está guardada la operacion en su atributo operaciones
              Swal.fire({
                title: "Operación realizada",
                icon: "success",
                imageWidth: 400,
                imageHeight: 200,
                showConfirmButton: true,
              }).then(() => {
                window.open("./comprobante.html");
              });
            } else {
              Swal.fire({
                title: "Oops ha ocurrido un error inesperado",
                text: "No tiene saldo suficiente en su cuenta para realizar esta operación.",
                icon: "error",
                imageWidth: 400,
                imageHeight: 200,
                showConfirmButton: true,
              });
            }
            break;
          default:
            Swal.fire({
              title: "Oops ha ocurrido un error inesperado",
              text: "El origen seleccionado no está definido.",
              icon: "error",
              imageWidth: 400,
              imageHeight: 200,
              showConfirmButton: true,
            });
            break;
        }
      }
    }
    // Fin función confirmar transferencia
  } else if (menu == "cvDolares0") {
    document.querySelector("#menuOperaciones").style.display = "none";
    document.querySelector("#cvDolares0").style.display = "block";
    // Utilizo el método fetch() para hacer peticiones HTTP a un servicio externo
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "global-currency.p.rapidapi.com",
        "X-RapidAPI-Key": "a839f95f45msh1aa3f23a9d629f0p1ffae6jsn4b11b3fd1b1d",
      },
    };
    const tipoDeCambio = document.querySelector("#tipoDeCambio");
    fetch("https://global-currency.p.rapidapi.com/currency/USD/ARS/1", options)
      .then((resp) => resp.json())
      .then((data) => {
        return data["rateCurrency"].amount * 1.047;
        /* return (new Intl.NumberFormat('de-DE').format(data["rateCurrency"].amount * 1.047)); */
      })
      .then((data) => {
        precioDolar = data;
        const element = document.querySelector("#encabezadoMenuOp");
        element.remove();
        document.querySelector("#cvDolares0").innerHTML =
          header +
          `<h2 class="dolarTitulo0">Compra de dólares</h2>
                                                                    <h4 class="normativaBCRA">Le recordamos que la operatoria de compra de dólares se encuentra regulada por la normativa de Exterior y Cambios del BCRA y la Ley Penal Cambiarla. La compra es sólo para atesoramiento personal. El cupo de U$S 200 es mensual y por persona. Se encuentra prohibido tanto ceder y/o vender el cupo mensual. No se puede comprar dólares a favor de o por cuentas de terceros. En el caso de que se detecte la violación a la normativa vigente, el banco se reserva el derecho de cerrar las cuentas, efectuar la correspondiente denuncia al BCRA y tomar cualquier medida que estime necesaria.</h4>                               
                                                                        <h3 class="dolarTitulo1">Comprás a $${(new Intl.NumberFormat().format(data))} sin impuestos ni retenciones</h3>
                                                                        <h4 class="cotizacionDolar">Cotización dólar por unidad en el Mercado Libre de Cambios, ámbito de aplicación y vigencia para operaciones por banca online al momento de su consulta</h4>
                                                                    </h4>                               
                                                                    <h3 class="dolarTitulo1">¿Cuánto querés comprar?</h3>
                                                                    <h4 class="cotizacionDolar">Recordá que el cupo es de U$S 200 mensuales</h4>
                                                                    </h4>
                                                                    <h4 class="ingresarImporte">Ingresá el importe en U$S</h4>
                                                                    <form id="formCompraDolares">
                                                                        <input type="hidden" name="precioDolar" id="precioDolar" class="precioDolae" value=${data} />
                                                                        <input type="number" name="cupoDolares" id="inputMonto" class="inputMonto" onchange=calcularDolares() min="0" max="200" step = "0.01" required><br>
                                                                        <h4 class="simularTotal" id="simularTotal">Total con impuesto ley Nº27.541 y Percepción RG 4815/20 $<span id="montoTotal" class="simulDolares">0</span></h4>
                                                                        <input type="submit" class="btnOp compraDolares" id="compraDolares" value="Confirmar">
                                                                        <a href="./operaciones.html" class="btnOp volverDolares" id="volver">Volver</a>
                                                                    </form>`;
        // Evento que simular la compra de dólares al mismo tiempo que se está ingresando el monto en el input
      });
    // Fin de la petición
    // Función confirmar compra de dólares
    if (document.querySelector("#cvDolares0")) {
      document
        .querySelector("#cvDolares0")
        .addEventListener("submit", confCompraDolares);
    }
    function confCompraDolares(e) {
      // Paramos el envio del formulario submit
      e.preventDefault();
      // Recuperar información del input
      const tipo = "Compra de dólares";
      const importe = Number(document.querySelector("#inputMonto").value);
      const precioDolar = Number(document.querySelector("#precioDolar").value);
      if (!(cliente.saldo.CP - importe * precioDolar * 1.65 < 0)) {
        // Creación del objeto
        const operacion = {
          tipo,
          origen: CP,
          destino: CD,
          importe,
        };
        // Actualizo saldos de las cuentas
        cliente.saldo.CP -= importe * precioDolar * 1.65;
        cliente.saldo.CD += importe;
        // Pusheo en el array
        cliente.operaciones.push(operacion);
        const arrayClientes = JSON.parse(localStorage.getItem("arrayClientes"));
        const oldCliente = arrayClientes.find(
          (elemento) => elemento.dni == cliente.dni
        );
        sessionStorage.setItem("usuario", JSON.stringify(cliente));
        const index = arrayClientes.indexOf(oldCliente);
        arrayClientes.splice(index, 1);
        arrayClientes.push(cliente);
        localStorage.setItem("arrayClientes", JSON.stringify(arrayClientes)); // dentro del cliente ya está guardada la operacion en su atributo operaciones
        Swal.fire({
          title: "Operación realizada",
          icon: "success",
          imageWidth: 400,
          imageHeight: 200,
          showConfirmButton: true,
        }).then(() => {
          window.open("./comprobante.html");
        });
      } else {
        Swal.fire({
          title: "Oops ha ocurrido un error inesperado",
          text: "No tiene saldo suficiente en su cuenta para realizar esta operación.",
          icon: "error",
          imageWidth: 400,
          imageHeight: 200,
          showConfirmButton: true,
        });
      }
    }
  } else {
    document.querySelector("#cvDolares0").style.display = "none";
    document.querySelector("#transfTerceros0").style.display = "none";
    document.querySelector("#transfPropia0").style.display = "none";
    document.querySelector("#menuOperaciones").style.display = "block";
  }
}
// Fin función display de menúes de operaciones

// Calcular el monto total en pesos de la compra de dólares y mostar en pantalla
function calcularDolares() {
  const monto = document.querySelector("#inputMonto").value;
  const precioDolar = document.querySelector("#precioDolar").value;
  costo = Number.parseFloat(monto) * precioDolar * 1.65;
  !Number.isNaN(costo)
    ? (document.querySelector("#montoTotal").textContent = `${new Intl.NumberFormat().format(costo)}`)
    : (document.querySelector("#montoTotal").textContent = "0");
}

// Evento click transferir a cuenta propia
if (document.querySelector("#TransfPropia")) {
  document
    .querySelector("#TransfPropia")
    .addEventListener("click", () => abrirMenuOp("transfPropia0"));
}

// Evento click transferir a cuenta de terceros
if (document.querySelector("#TransfTerceros")) {
  document
    .querySelector("#TransfTerceros")
    .addEventListener("click", () => abrirMenuOp("transfTerceros0"));
}

// Evento click comprar o vender dólares
if (document.querySelector("#cvDolares")) {
  document
    .querySelector("#cvDolares")
    .addEventListener("click", () => abrirMenuOp("cvDolares0"));
}

// Fin del alert para cuando hace click en "Salir

if (!!document.querySelector("#comprobante")) {
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));
  console.log(usuario);
  const operacion = usuario.operaciones[usuario.operaciones.length - 1];
  document.querySelector("#idComprobante").textContent =
    usuario.operaciones.length;
  document.querySelector("#origen").textContent = operacion.origen;
  document.querySelector("#destino").textContent = operacion.destino;
  document.querySelector("#importe").textContent = operacion.importe;
}

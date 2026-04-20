document.addEventListener("DOMContentLoaded", function () {
  iniciarLogin();
  iniciarActividad();
  iniciarVacaciones();
  iniciarAprobaciones();
});

function mostrarMensaje(elemento, mensaje, tipo) {
  if (!elemento) return;

  elemento.style.display = "block";
  elemento.textContent = mensaje;

  if (tipo === "error") {
    elemento.className = "info-box";
    elemento.style.background = "#FEE2E2";
    elemento.style.border = "1px solid #FECACA";
    elemento.style.color = "#B91C1C";
  } else {
    elemento.className = "info-box";
    elemento.style.background = "#DCFCE7";
    elemento.style.border = "1px solid #BBF7D0";
    elemento.style.color = "#15803D";
  }
}

/* LOGIN */
function iniciarLogin() {
  const loginBtn = document.getElementById("loginBtn");
  if (!loginBtn) return;

  loginBtn.addEventListener("click", function () {
    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");
    const message = document.getElementById("loginMessage");

    if (!email.value.trim() || !password.value.trim()) {
      mostrarMensaje(message, "Todos los campos son obligatorios.", "error");
      return;
    }

    if (!email.value.includes("@")) {
      mostrarMensaje(message, "El correo debe tener un formato válido.", "error");
      return;
    }

    if (password.value.length < 6) {
      mostrarMensaje(message, "La contraseña debe tener al menos 6 caracteres.", "error");
      return;
    }

    mostrarMensaje(message, "Inicio de sesión correcto. Redirigiendo...", "success");

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  });
}

/* ACTIVIDAD */
function iniciarActividad() {
  const guardarBtn = document.getElementById("guardarActividadBtn");
  if (!guardarBtn) return;

  guardarBtn.addEventListener("click", function () {
    const proyecto = document.getElementById("actividadProyecto");
    const descripcion = document.getElementById("actividadDescripcion");
    const horas = document.getElementById("actividadHoras");
    const estado = document.getElementById("actividadEstado");
    const mensaje = document.getElementById("actividadMessage");
    const lista = document.getElementById("listaActividades");

    if (!proyecto.value || !descripcion.value.trim() || !horas.value || !estado.value) {
      mostrarMensaje(mensaje, "Debes completar todos los campos.", "error");
      return;
    }

    if (Number(horas.value) <= 0) {
      mostrarMensaje(mensaje, "Las horas deben ser mayores que 0.", "error");
      return;
    }

    const item = document.createElement("div");
    item.className = "request-card";
    item.style.marginBottom = "12px";

    item.innerHTML = `
      <div class="request-left">
        <div class="person-avatar">📝</div>
        <div>
          <p style="font-size:14px;font-weight:600;">${proyecto.value}</p>
          <p style="font-size:12px;color:#64748B;">${descripcion.value}</p>
          <p style="font-size:12px;color:#64748B;">${horas.value}h · ${estado.value}</p>
        </div>
      </div>
      <div class="request-right">
        <button class="btn btn-danger eliminar-actividad" type="button">Eliminar</button>
      </div>
    `;

    lista.appendChild(item);

    const btnEliminar = item.querySelector(".eliminar-actividad");
    btnEliminar.addEventListener("click", function () {
      item.remove();
    });

    mostrarMensaje(mensaje, "Actividad registrada correctamente.", "success");

    proyecto.value = "";
    descripcion.value = "";
    horas.value = "";
    estado.value = "";
  });
}

/* VACACIONES */
function iniciarVacaciones() {
  const enviarBtn = document.getElementById("enviarVacacionesBtn");
  if (!enviarBtn) return;

  enviarBtn.addEventListener("click", function () {
    const inicio = document.getElementById("vacacionesInicio");
    const fin = document.getElementById("vacacionesFin");
    const comentario = document.getElementById("vacacionesComentario");
    const mensaje = document.getElementById("vacacionesMessage");
    const lista = document.getElementById("listaVacaciones");

    if (!inicio.value || !fin.value) {
      mostrarMensaje(mensaje, "Debes seleccionar fecha de inicio y fecha de fin.", "error");
      return;
    }

    if (inicio.value > fin.value) {
      mostrarMensaje(mensaje, "La fecha de inicio no puede ser mayor que la fecha final.", "error");
      return;
    }

    const item = document.createElement("div");
    item.className = "request-card";
    item.style.marginBottom = "12px";

    item.innerHTML = `
      <div class="request-left">
        <div class="person-avatar">📅</div>
        <div>
          <p style="font-size:14px;font-weight:600;">Solicitud enviada</p>
          <p style="font-size:12px;color:#64748B;">Inicio: ${inicio.value}</p>
          <p style="font-size:12px;color:#64748B;">Fin: ${fin.value}</p>
          <p style="font-size:12px;color:#64748B;">Comentario: ${comentario.value ? comentario.value : "Sin comentario"}</p>
        </div>
      </div>
      <div class="request-right">
        <span class="badge badge-pendiente">Pendiente</span>
      </div>
    `;

    lista.appendChild(item);

    mostrarMensaje(mensaje, "Solicitud de vacaciones enviada correctamente.", "success");

    inicio.value = "";
    fin.value = "";
    comentario.value = "";
  });
}

/* APROBACIONES */
function iniciarAprobaciones() {
  const aprobarBotones = document.querySelectorAll(".aprobar-btn");
  const rechazarBotones = document.querySelectorAll(".rechazar-btn");

  aprobarBotones.forEach((boton) => {
    boton.addEventListener("click", function () {
      const fila = boton.closest("tr");
      const badge = fila.querySelector(".badge");
      badge.textContent = "Aprobado";
      badge.className = "badge badge-aprobado";
    });
  });

  rechazarBotones.forEach((boton) => {
    boton.addEventListener("click", function () {
      const fila = boton.closest("tr");
      const badge = fila.querySelector(".badge");
      badge.textContent = "Rechazado";
      badge.className = "badge badge-rechazado";
    });
  });
}
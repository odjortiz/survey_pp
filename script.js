const totalSecciones = 5;
let seccionActual = 1;

document.getElementById('totalSecciones').textContent = totalSecciones;

// ========== NAVEGACIÓN Y VALIDACIÓN ==========

function mostrarSeccion(n) {
  for (let i = 1; i <= totalSecciones; i++) {
    document.getElementById('seccion' + i).classList.remove('activa');
  }
  document.getElementById('seccion' + n).classList.add('activa');
  document.getElementById('numSeccion').textContent = n;
  seccionActual = n;
}

function siguienteSeccion(n) {
  if (!validateSection(n)) return;
  if (n < totalSecciones) mostrarSeccion(n + 1);
}

function anteriorSeccion(n) {
  if (n > 1) mostrarSeccion(n - 1);
}

function validateSection(n) {
  // Valida todas las tablas de la sección
  const seccion = document.getElementById('seccion' + n);
  const tbodies = seccion.querySelectorAll('tbody');
  for (const tbody of tbodies) {
    if (tbody.children.length === 0) {
      alert("Debe agregar al menos una fila en cada tabla antes de continuar.");
      return false;
    }
    for (const row of tbody.children) {
      const inputs = row.querySelectorAll('input, select');
      for (const input of inputs) {
        if (!input.disabled && !input.checkValidity()) {
          input.reportValidity();
          return false;
        }
      }
    }
  }
  return true;
}

// ========== TABLAS DINÁMICAS ==========

// 1. Presupuesto
function agregarFilaPresupuesto() {
  const tbody = document.getElementById('tablaPresupuestoBody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Universidad Santo Tomás</option>
        <option>Universidad Militar Nueva Granada</option>
        <option>Uniagustiniana</option>
        <option>Universidad Central</option>
        <option>Universidad Antonio Nariño</option>
      </select>
    </td>
    <td><input type="text" pattern="^\\d{4}$" placeholder="AAAA" required /></td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Menor a 499</option>
        <option>Entre 500 y 699</option>
        <option>Entre 700 y 899</option>
        <option>Entre 900 y 1100</option>
        <option>Mayor a 1101</option>
      </select>
    </td>
    <td><button type="button" onclick="eliminarFila(this)">🗑️</button></td>
  `;
  tbody.appendChild(tr);
}
agregarFilaPresupuesto();

// 2. Fuente de recursos
function agregarFilaFuente() {
  const tbody = document.getElementById('tablaFuenteBody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" pattern="^\\d{4}$" placeholder="AAAA" required /></td>
    <td>
      <select required onchange="habilitarTipoEntidad(this)">
        <option value="" disabled selected>Seleccione</option>
        <option>Interna</option>
        <option>Externa</option>
      </select>
    </td>
    <td>
      <select disabled>
        <option value="" disabled selected>Seleccione</option>
        <option>Caja de Compensación</option>
        <option>Empresa Privada</option>
        <option>Gubernamental</option>
        <option>Otro</option>
      </select>
    </td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Entre el 1% y el 25%</option>
        <option>Entre el 26% y el 50%</option>
        <option>Entre el 51% y el 75%</option>
        <option>100%</option>
      </select>
    </td>
    <td><button type="button" onclick="eliminarFila(this)">🗑️</button></td>
  `;
  tbody.appendChild(tr);
}
agregarFilaFuente();

function habilitarTipoEntidad(sel) {
  const td = sel.parentElement.parentElement;
  const tipoEntidad = td.querySelector('select[disabled], select:not([required])');
  if (sel.value === "Externa") {
    tipoEntidad.disabled = false;
    tipoEntidad.required = true;
  } else {
    tipoEntidad.disabled = true;
    tipoEntidad.required = false;
    tipoEntidad.value = "";
  }
}

// 3. Porcentaje por área
function agregarFilaArea() {
  const tbody = document.getElementById('tablaAreaBody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" pattern="^\\d{4}$" placeholder="AAAA" required /></td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Deporte</option>
        <option>Actividad Física</option>
        <option>Cultura</option>
        <option>Salud</option>
        <option>Deserción</option>
      </select>
    </td>
    <td><input type="number" min="0" max="100" step="0.1" required placeholder="Ej: 12" /></td>
    <td><button type="button" onclick="eliminarFila(this)">🗑️</button></td>
  `;
  tbody.appendChild(tr);
}
agregarFilaArea();

// 4. Personal por área
function agregarFilaPersonal() {
  const tbody = document.getElementById('tablaPersonalBody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" required /></td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Operativo</option>
        <option>Asistencial</option>
        <option>Profesional</option>
        <option>Coordinación</option>
        <option>Jefatura</option>
        <option>Dirección</option>
        <option>Vicerrectoría</option>
      </select>
    </td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Deporte</option>
        <option>Actividad Física</option>
        <option>Cultura</option>
        <option>Salud</option>
        <option>Deserción</option>
      </select>
    </td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Básica</option>
        <option>Media</option>
        <option>Técnico Profesional</option>
        <option>Tecnológico</option>
        <option>Profesional</option>
        <option>Especialización</option>
        <option>Maestría</option>
        <option>Doctorado</option>
      </select>
    </td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>A Término Indefinido</option>
        <option>A Término Fijo</option>
        <option>Civil por Prestación de Servicios</option>
        <option>Obra o Labor</option>
        <option>Aprendizaje</option>
      </select>
    </td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Activo</option>
        <option>Inactivo</option>
      </select>
    </td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Femenino</option>
        <option>Masculino</option>
        <option>No Binario</option>
      </select>
    </td>
    <td><input type="date" required /></td>
    <td><button type="button" onclick="eliminarFila(this)">🗑️</button></td>
  `;
  tbody.appendChild(tr);
}
agregarFilaPersonal();

// 5. Salud Mental
function agregarFilaSalud() {
  const tbody = document.getElementById('tablaSaludBody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" required /></td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Estudiante</option>
        <option>Profesor Planta</option>
        <option>Profesor Cátedra</option>
        <option>Administrativo</option>
      </select>
    </td>
    <td><input type="date" required /></td>
    <td><input type="date" required /></td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Femenino</option>
        <option>Masculino</option>
        <option>No Binario</option>
      </select>
    </td>
    <td><input type="date" required /></td>
    <td>
      <select required onchange="toggleSuicida(this)">
        <option value="" disabled selected>Seleccione</option>
        <option>Depresión</option>
        <option>Ansiedad</option>
        <option>Conducta suicida</option>
      </select>
    </td>
    <td>
      <select class="suicida-detalle" disabled>
        <option value="" disabled selected>Seleccione</option>
        <option>Ideación suicida</option>
        <option>Plan suicida</option>
        <option>Intento suicidio</option>
        <option>Suicidio</option>
      </select>
    </td>
    <td><input type="date" class="suicida-fecha" disabled /></td>
    <td><button type="button" onclick="eliminarFila(this)">🗑️</button></td>
  `;
  tbody.appendChild(tr);
}
agregarFilaSalud();

function toggleSuicida(sel) {
  const tr = sel.closest('tr');
  const detalle = tr.querySelector('.suicida-detalle');
  const fecha = tr.querySelector('.suicida-fecha');
  if (sel.value === "Conducta suicida") {
    detalle.disabled = false;
    detalle.required = true;
    fecha.disabled = false;
    fecha.required = true;
  } else {
    detalle.disabled = true;
    detalle.required = false;
    detalle.value = "";
    fecha.disabled = true;
    fecha.required = false;
    fecha.value = "";
  }
}

// 6. Instalaciones actividad física
function agregarFilaInstalacion() {
  const tbody = document.getElementById('tablaInstalacionBody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Gimnasio</option>
        <option>Cancha cubierta</option>
        <option>Cancha múltiple descubierta</option>
        <option>Pista de atletismo</option>
        <option>Piscina</option>
      </select>
    </td>
    <td><input type="number" min="0" required /></td>
    <td><button type="button" onclick="eliminarFila(this)">🗑️</button></td>
  `;
  tbody.appendChild(tr);
}
agregarFilaInstalacion();

// Eliminar fila
function eliminarFila(btn) {
  btn.closest('tr').remove();
}

// ========== EXPORTAR A EXCEL ==========

function exportarExcel() {
  // Exporta cada tabla por separado
  let tablas = document.querySelectorAll('table');
  let contenido = '';
  tablas.forEach((tabla, idx) => {
    contenido += `<table border="1">${tabla.innerHTML}</table><br>`;
  });
  let blob = new Blob([contenido], { type: "application/vnd.ms-excel" });
  let link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "encuesta_bienestar.xls";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ========== ENVÍO ==========

document.getElementById('encuestaForm').addEventListener('submit', function(e) {
  e.preventDefault();
  if (!validateSection(totalSecciones)) return;
  document.getElementById('encuestaForm').classList.add('oculto');
  document.getElementById('barraProgreso').classList.add('oculto');
  document.getElementById('mensajeFinal').classList.remove('oculto');
  document.getElementById('mensajeFinal').textContent = '¡Gracias! Sus respuestas han sido registradas.';
});

// --- Control de preguntas dentro de la sección Cultura ---
let preguntaActualCultura = 0;
const preguntasCultura = document.querySelectorAll('.pregunta-cultura');
const totalPreguntasCultura = preguntasCultura.length;

function mostrarPreguntaCultura(n) {
  preguntasCultura.forEach((div, idx) => {
    div.classList.toggle('pregunta-activa', idx === n);
  });
  // Actualiza barra de progreso de preguntas
  document.getElementById('progresoPreguntasCultura').innerHTML =
    `Pregunta ${n + 1} de ${totalPreguntasCultura}`;
  preguntaActualCultura = n;
}

function siguientePreguntaCultura() {
  const pregunta = preguntasCultura[preguntaActualCultura];
  // Validación simple: que el campo requerido esté lleno
  const required = pregunta.querySelector('[required]');
  if (required && !required.value) {
    required.focus();
    required.reportValidity();
    return;
  }
  if (preguntaActualCultura < totalPreguntasCultura - 1) {
    mostrarPreguntaCultura(preguntaActualCultura + 1);
  }
}

function anteriorPreguntaCultura() {
  if (preguntaActualCultura > 0) {
    mostrarPreguntaCultura(preguntaActualCultura - 1);
  }
}

function finalizarSeccionCultura() {
  document.getElementById('seccion-cultura').classList.add('oculto');
  document.getElementById('mensajeFinal').classList.remove('oculto');
  document.getElementById('mensajeFinal').textContent = '¡Gracias! Sección Cultura completada.';
}

// --- Barra de progreso de secciones (ajusta según el total de secciones) ---
function updateProgressSecciones(seccionActual, totalSecciones) {
  document.getElementById('progresoSecciones').innerHTML =
    `Sección ${seccionActual} de ${totalSecciones}`;
}

// --- Tablas dinámicas ---
function agregarFilaActividadesCultura() {
  const tbody = document.getElementById('tablaActividadesCultura');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" required></td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Estudiantes</option>
        <option>Profesores</option>
        <option>Administrativos</option>
      </select>
    </td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Femenino</option>
        <option>Masculino</option>
        <option>No binario</option>
      </select>
    </td>
    <td><input type="number" min="0" required></td>
    <td><button type="button" onclick="eliminarFila(this)">🗑️</button></td>
  `;
  tbody.appendChild(tr);
}
agregarFilaActividadesCultura();

function agregarFilaAsociacionCultural() {
  const tbody = document.getElementById('tablaAsociacionesCulturales');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Ascun</option>
        <option>Otros</option>
      </select>
    </td>
    <td><input type="number" min="0" required></td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Estudiantes</option>
        <option>Profesores</option>
        <option>Administrativos</option>
      </select>
    </td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Femenino</option>
        <option>Masculino</option>
        <option>No binario</option>
      </select>
    </td>
    <td><button type="button" onclick="eliminarFila(this)">🗑️</button></td>
  `;
  tbody.appendChild(tr);
}

function agregarFilaGrupoRepresentativo() {
  const tbody = document.getElementById('tablaGruposRepresentativos');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Música</option>
        <option>Danza</option>
        <option>Teatro</option>
        <option>Arte</option>
      </select>
    </td>
    <td><input type="number" min="0" required></td>
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Estudiantes</option>
        <option>Docentes</option>
        <option>Administrativos</option>
      </select>
    </td>
    <td><button type="button" onclick="eliminarFila(this)">🗑️</button></td>
  `;
  tbody.appendChild(tr);
}

function agregarFilaEstimuloApoyo() {
  const tbody = document.getElementById('tablaEstimulosApoyos');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>
      <select required>
        <option value="" disabled selected>Seleccione</option>
        <option>Académico</option>
        <option>Económico</option>
      </select>
    </td>
    <td><input type="number" min="0" required></td>
    <td><input type="text" required placeholder="Ej: 300000 o 10%"></td>
    <td><button type="button" onclick="eliminarFila(this)">🗑️</button></td>
  `;
  tbody.appendChild(tr);
}

function agregarFilaEventoAcademico() {
  const tbody = document.getElementById('tablaEventosAcademicos');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" required></td>
    <td><input type="number" min="0" required></td>
    <td><input type="number" min="0" step="0.1" required></td>
    <td><button type="button" onclick="eliminarFila(this)">🗑️</button></td>
  `;
  tbody.appendChild(tr);
}

function agregarFilaResponsabilidadSocial() {
  const tbody = document.getElementById('tablaResponsabilidadSocial');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" required></td>
    <td><input type="number" min="0" required></td>
    <td><button type="button" onclick="eliminarFila(this)">🗑️</button></td>
  `;
  tbody.appendChild(tr);
}

function eliminarFila(btn) {
  btn.closest('tr').remove();
}

// --- Mostrar/ocultar tablas condicionales ---
function toggleAsociacionCultural(sel) {
  document.getElementById('detalleAsociacionCultural').style.display = (sel.value === 'Sí') ? '' : 'none';
  if (sel.value === 'Sí' && document.getElementById('tablaAsociacionesCulturales').children.length === 0) {
    agregarFilaAsociacionCultural();
  }
}
function toggleEventosAcademicos(sel) {
  document.getElementById('detalleEventosAcademicos').style.display = (sel.value === 'Sí') ? '' : 'none';
  if (sel.value === 'Sí' && document.getElementById('tablaEventosAcademicos').children.length === 0) {
    agregarFilaEventoAcademico();
  }
}
function toggleResponsabilidadSocial(sel) {
  document.getElementById('detalleResponsabilidadSocial').style.display = (sel.value === 'Sí') ? '' : 'none';
  if (sel.value === 'Sí' && document.getElementById('tablaResponsabilidadSocial').children.length === 0) {
    agregarFilaResponsabilidadSocial();
  }
}

// --- Inicialización ---
mostrarSeccion(1);
// ---mostrarPreguntaCultura(0);
updateProgressSecciones(1, 1); // Si tienes más secciones, actualiza el total


// Inicializar


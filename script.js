let canchas = 0;
let horariosDisponibles = [];
let parejas = [];
let zonas = [];
let partidosProgramados = [];
let llaves = [];

function irAPantalla(id) {
  document.querySelectorAll("section").forEach(s => s.classList.add("oculto"));
  document.getElementById(id).classList.remove("oculto");
}

function agregarHorario() {
  const cont = document.getElementById("contenedor-horarios");
  const div = document.createElement("div");
  div.innerHTML = `
    Día: <input type="text" placeholder="Ej: Lunes" required />
    Desde: <input type="time" required />
    Hasta: <input type="time" required />
  `;
  cont.appendChild(div);
}

function agregarRestriccion() {
  const div = document.getElementById("horarios-no-pueden");
  const fila = document.createElement("div");
  fila.innerHTML = `
    Día: <input type="text" required />
    Desde: <input type="time" required />
    Hasta: <input type="time" required />
  `;
  div.appendChild(fila);
}

document.getElementById("form-pareja").addEventListener("submit", function (e) {
  e.preventDefault();
  const inputs = e.target.querySelectorAll("input");
  const jugador1 = inputs[0].value.trim();
  const jugador2 = inputs[1].value.trim();
  const restricciones = [];
  const restriccionesInputs = document.querySelectorAll("#horarios-no-pueden div");
  restriccionesInputs.forEach(div => {
    const dia = div.querySelectorAll("input")[0].value.trim();
    const desde = div.querySelectorAll("input")[1].value;
    const hasta = div.querySelectorAll("input")[2].value;
    restricciones.push({ dia, desde, hasta });
  });

  parejas.push({
    nombre: `${jugador1} / ${jugador2}`,
    restricciones
  });

  inputs[0].value = "";
  inputs[1].value = "";
  document.getElementById("horarios-no-pueden").innerHTML = "";

  actualizarListaParejas();
});

function actualizarListaParejas() {
  const ul = document.getElementById("lista-parejas");
  ul.innerHTML = "";
  parejas.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p.nombre;
    ul.appendChild(li);
  });
}

function generarZonas() {
  const cant = parseInt(document.getElementById("cant-canchas").value);
  canchas = cant;

  const horariosDOM = document.querySelectorAll("#contenedor-horarios div");
  horariosDisponibles = Array.from(horariosDOM).map(div => {
    const [dia, desde, hasta] = div.querySelectorAll("input");
    return {
      dia: dia.value.trim(),
      desde: desde.value,
      hasta: hasta.value
    };
  });

  zonas = [];
  const parejasCopy = [...parejas];
  while (parejasCopy.length > 0) {
    const zona = parejasCopy.splice(0, 3);
    zonas.push(zona);
  }

  mostrarZonas();
  irAPantalla("pantalla-zonas");
}

function mostrarZonas() {
  const cont = document.getElementById("zonas-generadas");
  cont.innerHTML = "";
  zonas.forEach((zona, i) => {
    const div = document.createElement("div");
    div.className = "zona";
    div.innerHTML = `<h3>Zona ${i + 1}</h3>`;
    zona.forEach(p => div.innerHTML += `<p>${p.nombre}</p>`);
    cont.appendChild(div);
  });
}

function irAPantallaLlaves() {
  const cont = document.getElementById("llaves-finales");
  cont.innerHTML = "";
  zonas.forEach((zona, i) => {
    const div = document.createElement("div");
    div.className = "zona";
    div.innerHTML = `<h3>Llave de Zona ${i + 1}</h3>`;
    zona.forEach(p => {
      const ptag = document.createElement("p");
      ptag.textContent = p.nombre;
      div.appendChild(ptag);
    });
    cont.appendChild(div);
  });
  irAPantalla("pantalla-llaves");
}

function reiniciarTorneo() {
  if (confirm("¿Deseas reiniciar todo el torneo?")) {
    localStorage.clear();
    location.reload();
  }
}

window.onload = () => {
  // En futuras versiones se puede cargar desde localStorage aquí
};

document.addEventListener("DOMContentLoaded", () => {
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const contenedor = document.getElementById("contenedor-dias");

  dias.forEach(dia => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${dia}</h3>
      <div id="rangos-${dia}" class="rangos"></div>
      <button onclick="agregarRango('${dia}')">Agregar rango</button>
      <hr/>
    `;
    contenedor.appendChild(div);
  });
});

function agregarRango(dia) {
  const contenedor = document.getElementById(`rangos-${dia}`);
  const div = document.createElement("div");
  div.className = "rango-horario";
  div.innerHTML = `
    <input type="time" class="inicio" required />
    <span>a</span>
    <input type="time" class="fin" required />
  `;
  contenedor.appendChild(div);
}

function guardarConfiguracion() {
  const cantidadCanchas = parseInt(document.getElementById("cantidadCanchas").value);
  if (!cantidadCanchas || cantidadCanchas < 1) {
    alert("Debe ingresar una cantidad válida de canchas.");
    return;
  }

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const horarios = {};

  for (const dia of dias) {
    const rangos = [];
    const contenedor = document.getElementById(`rangos-${dia}`);
    const entradas = contenedor.querySelectorAll(".rango-horario");

    entradas.forEach(div => {
      const inicio = div.querySelector(".inicio").value;
      const fin = div.querySelector(".fin").value;
      if (inicio && fin && inicio < fin) {
        rangos.push({ inicio, fin });
      }
    });

    if (rangos.length > 0) {
      horarios[dia] = rangos;
    }
  }

  const configuracion = {
    cantidadCanchas,
    horarios
  };

  localStorage.setItem("configuracionInicial", JSON.stringify(configuracion));
  alert("Configuración guardada correctamente.");

  // Acá se podría redirigir a la siguiente pantalla
  // window.location.href = "carga-parejas.html";
}

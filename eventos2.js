/*---------- VARIABLES ----------*/

var cuadrito = document.getElementById("area_de_dibujo");
var grosorInput = document.getElementById("grosor");
var papel = cuadrito.getContext("2d");
var botonesColor = document.getElementsByClassName("colores");
var botonesTrazo = document.getElementsByClassName("trazo");
var botonBorrar = document.getElementById("borrar");
var colorcito = "black";
var draw = 0;
var initDibujar = {
  x: undefined,
  y: undefined,
  primerClick: false,
};
var espacio = 1;
var opciones = "mouse";
var trazo = "alzado";
var movimiento = 10;
var grosor = 3;
var borrar = false;

/*---------- FUNCIONES ----------*/

function cambiarColor(color, boton) {
  colorcito = color;
  if (borrar) toggleBorrar();
  Array.from(botonesColor).forEach((boton) => {
    boton.classList.remove("seleccionado");
  });

  boton.classList.add("seleccionado");
}

function cambiarTrazo(nuevoTrazo, boton) {
  trazo = nuevoTrazo;
  Array.from(botonesTrazo).forEach((boton) => {
    boton.classList.remove("seleccionado");
  });

  boton.classList.add("seleccionado");
}

function dibujarLinea(color, xinicial, yinicial, xfinal, yfinal, lienzo) {
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.lineWidth = grosor;
  lienzo.moveTo(xinicial, yinicial);
  lienzo.lineTo(xfinal, yfinal);
  lienzo.stroke();
  lienzo.closePath();
}

function dibujarMouse(evento) {
  if (opciones !== "mouse" || trazo !== "alzado") return;
  if (draw == 1) {
    dibujarLinea(borrar ? "white" : colorcito, x, y, evento.offsetX, evento.offsetY, papel);
  }
  x = evento.offsetX;
  y = evento.offsetY;
}

function toggleBorrar() {
  borrar = !borrar;
  grosor = borrar ? 30 : grosorInput.value;
  botonBorrar.classList.toggle("seleccionado");
  cambiarTrazo("alzado", document.getElementById("alzado"));
}

function mouseDown() {
  draw = 1;
}
function mouseUp(evento) {
  draw = 0;
  if (trazo == "recta") {
    if (initDibujar.primerClick) {
      dibujarLinea(colorcito, initDibujar.x, initDibujar.y, evento.offsetX, evento.offsetY, papel);
      initDibujar.primerClick = false;
    } else {
      initDibujar.x = evento.offsetX;
      initDibujar.y = evento.offsetY;
      initDibujar.primerClick = true;
    }
  }
}
/*---------- START ----------*/
cuadrito.width = cuadrito.offsetWidth;
cuadrito.height = cuadrito.offsetHeight;

cuadrito.addEventListener("mousemove", dibujarMouse);
cuadrito.addEventListener("mouseup", mouseUp);
cuadrito.addEventListener("mousedown", mouseDown);

grosorInput.addEventListener("change", (evento) => (grosor = evento.target.value));

window.addEventListener("resize", () => {
  cuadrito.width = cuadrito.offsetWidth;
  cuadrito.height = cuadrito.offsetHeight;
});

/*---------- VARIABLES ----------*/

var cuadrito = document.getElementById("area_de_dibujo");
var papel = cuadrito.getContext("2d");
var colorcito = "black";
var draw = 0;
var espacio = 1;
var opciones = prompt("Flechas o Mouse?");
var movimiento = 10;
var grosor = 3;
var colorzote;
var teclas = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32,
  R: 82,
  N: 78,
  A: 65,
};
/*---------- FUNCIONES ----------*/

function dibujarLinea(color, xinicial, yinicial, xfinal, yfinal, lienzo) {
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.lineWidth = grosor;
  lienzo.moveTo(xinicial, yinicial);
  lienzo.lineTo(xfinal, yfinal);
  lienzo.stroke();
  lienzo.closePath();
}

function dibujarTeclado(evento) {
  console.log(evento);
  if (evento.keyCode == teclas.N) {
    colorzote = "black";
  } else if (evento.keyCode == teclas.A) {
    colorzote = "blue";
  } else if ((evento.keyCode = teclas.R)) {
    colorzote = "red";
  }
  if (evento.keyCode == teclas.SPACE) {
    espacio++;
  }
  if (espacio % 2 == 0) {
    colorcito = "white";
    grosor = 30;
  } else {
    colorcito = colorzote;
    grosor = 3;
  }
  if (opciones != "flechas") {
    reurn;
  }
  switch (evento.keyCode) {
    case teclas.UP:
      dibujarLinea(colorcito, x, y, x, y - movimiento, papel);
      y = y - movimiento;
      break;
    case teclas.DOWN:
      dibujarLinea(colorcito, x, y, x, y + movimiento, papel);
      y = y + movimiento;
      break;
    case teclas.LEFT:
      dibujarLinea(colorcito, x, y, x - movimiento, y, papel);
      x = x - movimiento;
      break;
    case teclas.RIGHT:
      dibujarLinea(colorcito, x, y, x + movimiento, y, papel);
      x = x + movimiento;
      break;

    default:
  }
}
function mouseDown() {
  draw = 1;
}
function mouseUp() {
  draw = 0;
}
/*---------- START ----------*/

dibujarLinea("black", 0, 0, 0, 800, papel);
dibujarLinea("black", 0, 0, 6999, 0, papel);
dibujarLinea("black", 6999, 0, 6999, 800, papel);
dibujarLinea("black", 0, 800, 6999, 800, papel);

if (opciones == "mouse") {
  function dibujarMouse(evento) {
    if (draw == 1) {
      dibujarLinea(colorcito, x, y, evento.offsetX, evento.offsetY, papel);
    }
    x = evento.offsetX;
    y = evento.offsetY;
  }
  document.write(
    " Hace click y move el mouse sobre el recuadro negro para dibujar y apreta espacio pra activar/desactivar el modo borrador, apreta R para rojo, A para azul y N para negro ;) "
  );
} else if (opciones == "flechas") {
  var x = 400;
  var y = 400;
  dibujarLinea("red", x - 1, y - 1, x + 1, y + 1, papel);
  document.write(
    "Move las flechas de tu teclado para dibujar, apreta espacio para activar el modo borrador/libre y apreta de nuevo para volver a dibujar , apreta R para rojo, A para azul y N para negro"
  );
} else {
  alert("Opcion no valida");
  location.reload();
}

document.addEventListener("keydown", dibujarTeclado);
document.addEventListener("mousemove", dibujarMouse);
document.addEventListener("mouseup", mouseUp);
document.addEventListener("mousedown", mouseDown);

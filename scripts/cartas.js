function tapete() {
  scoreNum = 0;
  for (var naipes = [], i = 0; i < 12; ++i) naipes[i] = i;
  function shuffle(array) {
    var tmp,
      current,
      top = array.length;
    if (top)
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    return array;
  }

  naipes = shuffle(naipes);

  let cartas = "";
  let contador = '<div id="contador">Contador:<span>0</span></div>';
  let contadorNegativo = '<div id="contadorFallos">Fallos:<span>0</span></div>';
  let m = 0;
  for (let i = 0; i < naipes.length; i++) {
    m++;
    let carta = `<div><img class="carta down" cartname="${naipes[i] %
      6}" id="${i}" src="img/carta.png"/></div>`;
    cartas += carta;
  }
  document.querySelector("#ejercicio").innerHTML =
    cartas + contador + contadorNegativo;
  document.querySelector("#ejercicio").addEventListener("click", handleClick);
}

window.onload = () => {
  document.querySelector("#juegoNuevo").addEventListener("click", tapete);
};

function handleClick(event) {
  if (!event.target.classList.contains("disabled") && myVar == 0) {
    if (document.getElementsByClassName("up").length < 2) {
      //le damos la vuelta a la carta
      event.target.src = baraja[event.target.getAttribute("cartname")].img;
      //Ya no esta abajo
      document.getElementById(event.target.id).classList.remove("down");
      //La pono arriba
      document.getElementById(event.target.id).classList.add("up");
      //Tengo levantadas dos cartas
      if (document.getElementsByClassName("up").length == 2) {
        //Compruebo si son las mismas
        if (
          document.getElementsByClassName("up")[0].getAttribute("cartname") ==
          document.getElementsByClassName("up")[1].getAttribute("cartname")
        ) {
          Array.prototype.slice
            .call(document.getElementsByClassName("up"))
            .forEach(function(element) {
              document.getElementById(element.id).classList.remove("up");
              document.getElementById(element.id).classList.add("disabled");
            });
          calScore();
        } else {
          myVar = setTimeout(function() {
            Array.prototype.slice
              .call(document.getElementsByClassName("up"))
              .forEach(function(element) {
                document.getElementById(element.id).classList.remove("up");
                document.getElementById(element.id).classList.add("down");
                document.getElementById(element.id).src = "img/carta.png";
              });
            myVar = 0;
          }, 1000);
          calFailure();
        }
      }
    }
  }
}

let myVar = 0;
let scoreNum = 0;
let failNum = 0;
let calScore = function() {
  scoreNum += 10;
  document.querySelectorAll("#contador span")[0].innerText = scoreNum;
};
let calFailure = function() {
  failNum += 10;
  document.querySelectorAll("#contadorFallos span")[0].innerText = failNum;
};

let baraja = [
  {
    name: "bart",
    img: "img/Bart.jpg"
  },
  {
    name: "homer",
    img: "img/Homer.jpg"
  },
  {
    name: "marge",
    img: "img/Marge.jpg"
  },
  {
    name: "rasca",
    img: "img/Rasca.jpg"
  },
  {
    name: "pica",
    img: "img/Pica.jpg"
  },
  {
    name: "radio",
    img: "img/Radio.jpg"
  }
];

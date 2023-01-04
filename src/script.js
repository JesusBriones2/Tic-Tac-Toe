import {Players} from "./players.js";

let players = new Players(document.querySelectorAll('.player'));
let gameMode = null;



// Control de eventos de los buttons-cta del header.
document.getElementById('buttons').addEventListener('click', (e) => {
    let name = e.target.className;

    name.includes("restart") ? modal("Seguro deseas reiniciar el marcador.",() => players.restartScore()):
    
    name.includes("exit") ?
        modal("Salir al menu principal.", 
            () => { menu(); }
        ):
    
    name.includes("changeSymbol") ? 
        players.changeSymbol(): 0
});



// Captura de eventos de las casillas del tablero.
let board = [0,0,0,0,0,0,0,0,0];

document.getElementById('board').addEventListener('mousedown', e => {
    if (e.target.className.includes("board__item")) {
        e.target.innerHTML = `<i class="fa-solid ${players.turn}"></i>`;
        players.passTurn();
        players.update();
    }
});



// Control del menu principal.
const menuE = document.getElementById('menu');
function menu() {
    menuE.classList.add('menu--show');
}

menuE.addEventListener('mousedown', e => {
    if (e.target.tagName == "BUTTON") {
        players = new Players(document.querySelectorAll('.player'));
        gameMode = +e.target.value;
        players.define(gameMode);
        players.update();
        menuE.classList.remove('menu--show');
    }
});



// Control de la ventana emergente - modal.
const modalE = document.getElementById('modal');
let cbModal = null;
function modal(sms, fn) {
    modalE.firstElementChild.firstElementChild.textContent = sms;
    modalE.classList.add('modal--show');
    cbModal = fn;
}

modalE.addEventListener('mousedown', e => {
    if (e.target.tagName === "BUTTON") {
        if (+e.target.value) { cbModal(); }
        modalE.classList.remove('modal--show');
    }
});


window.addEventListener("load",function() {
    setTimeout(function(){
      window.scrollTo(0, 1);
    }, 0);
});
// Elementos.
const board = document.getElementById('board');
const score_box = document.querySelectorAll(".game-hero__scoreBox");
const score_element = document.querySelectorAll(".game-hero__scoreBox-score");

// Variables principales.
const comb_win = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let boxes = [0,0,0,0,0,0,0,0,0];
let comb_iterated;
let game_over = false;
let score = [0,0];
let turn = 1;

// Evento del boton reiniciar.
document.getElementById('game-hero__btnRestart').addEventListener('click', restart);

// Funcionalidad del tablero de juego.
board.addEventListener( 'click', (e) => {

	if ( e.target !== board ) {

		// Obtiene el indice de la casilla clickeada.
		let index = Array.prototype.indexOf.call( board.children, e.target );

		if ( game_over == true ) { restart(); }// Al dar click al board resetea el juego si alguien ya ganó.
		else {

			// Ejecuta una condicion segun el turno del jugador.
			if ( turn === 1 && boxes[index] == 0 ) {
				e.target.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
				move_low_bar();
				boxes[index] = 1;
				check_win();
				turn = 2;
			}
			
			if ( turn === 2 && boxes[index] == 0 ) {
				e.target.innerHTML = `<i class="fa-solid fa-genderless"></i>`;
				move_low_bar();
				boxes[index] = 2;
				check_win();
				turn = 1;
			}
		}
	}
});


// Mueve la barra que esta debajo de los puntajes.
function move_low_bar () {
	score_box[0].classList.toggle("low_bar");
	score_box[1].classList.toggle("low_bar");
}


// Verifica si alguien ha ganado.
function check_win () {
	
	let coincidences = 0; // Aumenta al coincidir las casillas con una combinacion ganadora. 
	let counter_full = 0;

	main:
	for ( let a of comb_win ) {
		for ( let b of a ) {
			// Comprueba si las casillas ocupadas coinciden con los indices de una combinacion ganadora.
			if ( boxes[b] == turn ) { coincidences++; comb_iterated = a; } 
		}

		// Si las casilla coinciden con los tres indices de la combinacion ganadora, ganas. 
		if ( coincidences == 3 ) {
			for ( let i of comb_iterated ) { board.children[i].classList.add('box_win'); }
			// Cambia todos a 1 para que las casillas restantes no funcionen.
			boxes = [1,1,1,1,1,1,1,1,1];
			game_over = true;
			// Aumenta el puntaje y lo actualiza en la pantalla.
			score[turn-1]++; 
			score_element[turn-1].textContent = score[turn-1];
			break main;
		}
		else if ( !boxes.includes(0) ) {
			counter_full++;
			if ( counter_full == 8 ) {
				game_over = true;
				for ( let ob of board.children ) { ob.classList.add('box_full'); }
			}
		}
		coincidences = 0;

		console.log(score)
	}
}


// reinicia el juego.
function restart (e) {

	animation_button_restart(e);

	boxes = [0,0,0,0,0,0,0,0,0];
	for ( let ob of board.children ) { 
		ob.innerHTML = '';
		ob.classList.remove("box_full","box_win");
	}

	if ( game_over == false  || e ) {
		score = [0,0];
		score_element[0].textContent = score[0];
		score_element[1].textContent = score[1];
		if ( turn == 2 ) { move_low_bar(); turn = 1; }
	}

	game_over = false;
}


function animation_button_restart (e) {
	if (e) {
		e.target.style.animation = "rotate .3s forwards";
		setTimeout( () => { e.target.style.animation = "none"; }, 300 );
	}
}
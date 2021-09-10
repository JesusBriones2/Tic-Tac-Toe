const puntajes = document.querySelectorAll(".game__nav-player-point");
let points = [0,0];


function marcador(ganador) {
	
	if (ganador == 0) {
		points[0]++;
		puntajes[0].innerHTML = points[0];
	}
	else if (ganador == 1) {
		points[1]++;
		puntajes[1].innerHTML = points[1];
	}

}
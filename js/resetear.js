const btnReset = document.querySelector(".btn-reset");

btnReset.addEventListener('click',()=>{
	reset();
	resetPoinst();
});


function reset () {

	for (let i = 0; i < 9; i++) {
		casillas[i].innerHTML = "";

		if (casillas[i].classList.contains("o")) {
			casillas[i].classList.remove("o");
		}
		else if (casillas[i].classList.contains("x")) {
			casillas[i].classList.remove("x");
		}
	}

	spaceCasilla = [null,null,null,null,null,null,null,null,null];

}


function resetPoinst () {
	points = [0,0];
	puntajes[0].innerHTML = "-";
	puntajes[1].innerHTML = "-";
}
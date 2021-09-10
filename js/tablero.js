const casillas = document.querySelectorAll(".tablero__casilla");
const rayaTurno = document.querySelectorAll(".game__nav-player");

let turno = false;
let spaceCasilla = [null,null,null,null,null,null,null,null,null];

for (let i = 0; i < 9; i++) {
	casillas[i].addEventListener('click',()=>{
		
		if (turno == false && spaceCasilla[i] == null) {
			rayaTurno[0].classList.toggle("rayaBaja");
			rayaTurno[1].classList.toggle("rayaBaja");
			casillas[i].classList.add("x");
			casillas[i].innerHTML = "X";
			turno = true;
			spaceCasilla[i] = 0;
			verificar(0);
		}
		else if (turno == true && spaceCasilla[i] == null) {
			rayaTurno[0].classList.toggle("rayaBaja");
			rayaTurno[1].classList.toggle("rayaBaja");
			casillas[i].classList.add("o");
			casillas[i].innerHTML = "O";
			turno = false;
			spaceCasilla[i] = 1;
			verificar(1);
		}
	});
}
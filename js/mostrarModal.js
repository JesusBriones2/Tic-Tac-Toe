const modal = document.querySelector(".modal");
const mostrarGanador = document.querySelector(".modal-ganador");

modal.addEventListener('click',()=>{
	modal.classList.add("none");
	reset();
});

function mostrarModal(ganador) {
	
	if (ganador == 0) {
		mostrarGanador.innerHTML = "X";
	}
	else if (ganador == 1) {
		mostrarGanador.innerHTML = "O";
	}
	else {mostrarGanador.innerHTML = "nadie";}

	
		modal.classList.remove("none");
}
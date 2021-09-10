const convinaciones = [
	[0,1,2],[3,4,5],
	[6,7,8],[0,3,6],
	[1,4,7],[2,5,8],
	[0,4,8],[2,4,6]
];



function verificar(numSim) {

	if (verificarConvi(numSim) == true) {
		marcador(numSim);
		mostrarModal(numSim);
	}
	else if (revisarEspacios() == 9) {

		if (verificarConvi(numSim) == true) {
			marcador(numSim);
			mostrarModal(numSim);
		}
		else {mostrarModal(2);}
	}
}


function verificarConvi(numSim2) {
	let veriAcertadas = 0;

	main:
	for (let i = 0; i < 8; i++) {
		for (let x = 0; x < 3; x++) {

			if (spaceCasilla[convinaciones[i][x]] == numSim2) {
				veriAcertadas++;
			}
		}

		if (veriAcertadas == 3) {
			console.log(true)
			return true;
		}
		else {veriAcertadas = 0;}
	}

	console.log(false)
	return false;
}


function revisarEspacios () {

	let ocupados = 0;

	for (let i = 0; i < 9; i++) {
		if (spaceCasilla[i] != null) {
			ocupados++;
		}
	}

	return ocupados;
}
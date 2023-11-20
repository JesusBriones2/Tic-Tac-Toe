const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const CSS_CLASS = Object.freeze({
  board: '.board',
  slot: '.board__slot',
  wall: '.wall',
  showWall: 'wall--show',
  players: '.player',
  score: '.player__score',
  turn: '.turn__icon',
  resetSlot: 'board__slot',
  reset: '.button-reset'
})


const $wall = $(CSS_CLASS.wall)
const $turn = $(CSS_CLASS.turn)
const $board = $(CSS_CLASS.board)
const $slots = $$(CSS_CLASS.slot)
const $players = $$(CSS_CLASS.players)
const $buttonReset = $(CSS_CLASS.reset)

let scores = [0, 0]
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let gameMode = 0
let turn = 0
let roundFinished = false

const icons = ['icon-x', 'icon-o']
const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


// Evento en el tablero para iniciar el juego.
$board.addEventListener('click', (e) => {
  console.log(scores)
  console.log(board)
  console.log(gameMode)
  console.log(turn)
  console.log(roundFinished)

  const item = e.target.closest(CSS_CLASS.slot)
  if (turn === 0) {
    if (item) playTurn(item.dataset.i)
    robot()
  }
})


// Evento para limpiar el tablero al terminar una ronda.
//  "animEnd" se usar para detectar la finalización de una animación
//   ya que se ejecutan varias por el numero de casillas animadas.
let animEnd = false
$board.addEventListener('animationend', () => {
  if (animEnd || !roundFinished) return

  animEnd = true
  setTimeout(() => {
    roundFinished = false
    animEnd = false
    clearBoard()
    robot()
  }, 800)
})


// Alterna el modo de juego entre: player-player y player-cpu.
$players[1].addEventListener('click', () => {
  if (turn === 1 && gameMode === 0) return

  gameMode = gameMode ? 0 : 1
  $players[0].firstElementChild.textContent = gameMode ? 'P1' : 'TU'
  $players[1].lastElementChild.textContent = gameMode ? 'P2' : 'CPU'
  reset()
})


// controlador de evento al botón para reiniciar el juego.
$buttonReset.addEventListener('click', () => {
  // No hace el reset si el turno es de la cpu.
  if (!(turn === 1 && gameMode === 0)) reset()
})


// Función que controla la acción del jugador en turno.
function playTurn(index) {
  if (board[index]) return // verifica si ya esta ocupado el slot cliqueado.

  $slots[index].classList.add(icons[turn])
  board[index] = icons[turn]

  // Se verifica si el jugador ha completado una combinación
  // para mostrar que ha ganado.
  const combination = checkCombination()
  if (combination) {
    wall()
    winAnimation(combination)
    scoreController()
    changeTurn()
    roundFinished = true
    return
  }

  if (!board.includes(0)) {
    animationFullBoard()
    roundFinished = true
  }
  changeTurn()
}


// Verifica si las casillas ocupadas cumplen un patron de combinaciones.
function checkCombination() {
  let coincidences = 0

  for (const comb of combinations) {
    for (const num of comb) {
      if (board[num] === icons[turn]) coincidences++
    }

    if (coincidences === 3) return comb
    coincidences = 0
  }
}


// Agrega una capa transparente al tablero para evitar click accidentales.
function wall(active = true) {
  active
    ? $wall.classList.add(CSS_CLASS.showWall)
    : $wall.classList.remove(CSS_CLASS.showWall)
}


// Ejecuta la animación win a las casillas.
function winAnimation(combination) {
  for (const num of combination) {
    $slots[num].classList.add('board__slot--win')
  }
}


// Controla todo lo que sucede con los puntos de los jugadores.
function scoreController(reset) {
  reset
    ? scores = [0, 0]
    : scores[turn]++

  $players[0].querySelector(CSS_CLASS.score).textContent = scores[0]
  $players[1].querySelector(CSS_CLASS.score).textContent = scores[1]
}


// Hace el cambio de turno en cada ronda.
function changeTurn() {
  const previousTurn = turn
  turn = turn ? 0 : 1
  $turn.classList.replace(icons[previousTurn], icons[turn])
}


// Agrega animación de que todas las casillas están llenas.
function animationFullBoard() {
  for (const slot of $slots) {
    slot.classList.add('board__slot--full')
  }
}


// Se encarga de volver al tablero a su estado inicial.
function clearBoard() {
  for (const elem of $slots) {
    elem.setAttribute('class', CSS_CLASS.resetSlot)
  }
  wall(false)
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
}


// Reinicia el juego por completo.
function reset() {
  clearBoard()
  scores = [0, 0]
  scoreController(true)
  turn = 0
  roundFinished = false
  $turn.classList.replace(icons[1], icons[0])
}


// popup message - info de cambio de modo
window.onload = setTimeout(() => {
  const popup = $('.message-box')
  popup.classList.add('message-box--show')

  const removePopup = () => {
    popup.removeEventListener('click', popupAnimation)
    popup.removeEventListener('animationend', removePopup)
    popup.remove()
  }

  const popupAnimation = ({ target }) => {
    if (target.matches('.message__icon')) {
      popup.classList.add('message-box--remove')
      popup.addEventListener('animationend', removePopup)
    }
  }

  popup.addEventListener('click', popupAnimation)
}, 1000)


// Algoritmo de simulación de inteligencia para el jugador CPU.
function robot() {
  // Verifica los parámetros para que el cpu pueda jugar su turno.
  if (!(gameMode === 0 && turn === 1 && roundFinished === false)) return

  wall()
  setTimeout(() => {
    // Filtra en un array los slots vacíos del tablero.
    const emptyBoxes = board
      .map((element, index) => (element === 0 ? index : -1))
      .filter((index) => index !== -1)

    // Elige de forma aleatoria un slot de los previamente filtrado.
    const numRandom = randInt(0, emptyBoxes.length - 1)
    playTurn(emptyBoxes[numRandom])

    if (!roundFinished) wall(false)
  }, 500)
}


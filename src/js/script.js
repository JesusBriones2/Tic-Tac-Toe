const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

const CSS_CLASS = Object.freeze({
  turn: '.turn__icon',
  reset: '.button-reset',
  wall: '.wall',
  
  
  players: '.score__player',
  score: '.score',
  boardItem: '.board__item',
  boardItem2: 'board__item',
  board: '.board',
  smsCta: '.message__cta',
  pointBox: '.score__point'
})

const $wall = $(CSS_CLASS.wall)
const $turn = $(CSS_CLASS.turn)
const $board = $(CSS_CLASS.board)
const $items = $$(CSS_CLASS.boardItem)
const $players = $$(CSS_CLASS.players)
const $buttonReset = $(CSS_CLASS.reset)

let playersScore = [0, 0]
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let mode = 0
let turn = 0
let winner = false

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


// Controlador de evento en el tablero para iniciar el juego.
$board.addEventListener('click', (e) => {
  const item = e.target.closest(CSS_CLASS.boardItem)
  if (item) playTurn(item.dataset.i)
  robot()
})

// Controlador de evento para limpiar el tablero al terminar una ronda.
let counter = 0
$board.addEventListener('animationend', () => {
  if (counter) return
  counter++

  setTimeout(() => {
    clearBoard()
    winner = false
    robot()
    counter = 0
  }, 800)
})

// Alterna el modo de juego entre: player-player y player-cpu.
$players[1].addEventListener('click', () => {
  mode = mode ? 0 : 1
  $players[0].firstElementChild.textContent = mode ? 'P1' : 'YOU'
  $players[1].lastElementChild.textContent = mode ? 'P2' : 'CPU'
  reset()
})

// controlador de evento al botón para reiniciar el juego.
$buttonReset.addEventListener('click', () => {
  if (!(turn === 1 && mode === 0)) reset()
})

// Función que controla la acción del jugador en turno.
function playTurn(index) {
  if (board[index]) return

  $items[index].classList.add(icons[turn])
  board[index] = icons[turn]

  // Se verifica si el jugador ha completado una combinación.
  const combination = checkCombination()

  if (combination) {
    wall()
    winAnimation(combination)
    increaseScore()
    changeTurn()
    winner = true
    return true
  }

  if (!board.includes(0)) fullAnimation()
  changeTurn()
}

// Verifica si las casillas ocupadas cumplen un patron de combinaciones.
function checkCombination() {
  let coincidences = 0

  for (const combination of combinations) {
    for (const num of combination) {
      if (board[num] === icons[turn]) coincidences++
    }

    if (coincidences === 3) return combination
    coincidences = 0
  }
}

// Agrega una capa transparente al tablero para evitar click innecesarios.
function wall(active = true) {
  const classWall = 'wall--show'
  active ? $wall.classList.add(classWall) : $wall.classList.remove(classWall)
}

// Agrega animación win a las casillas.
function winAnimation(combination) {
  for (const num of combination) {
    $items[num].classList.add('board__item--win')
  }
}

// Incrementa los puntos del jugador en turno.
function increaseScore(increase = true) {
  if (increase) ++playersScore[turn]
  $players[0].querySelector(CSS_CLASS.pointBox).textContent = playersScore[0]
  $players[1].querySelector(CSS_CLASS.pointBox).textContent = playersScore[1]
}

// Hace el cambio de turno en cada ronda.
function changeTurn() {
  const previousTurn = turn
  turn = turn ? 0 : 1
  $turn.classList.replace(icons[previousTurn], icons[turn])
}

// Agrega animación full a las casillas.
function fullAnimation() {
  for (const elem of $items) {
    elem.classList.add('board__item--full')
  }
}

// Se encarga de volver al tablero a su estado inicial.
function clearBoard() {
  for (const elem of $items) {
    elem.setAttribute('class', CSS_CLASS.boardItem2)
  }
  wall(false)
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
}

// Reinicia el juego por completo.
function reset() {
  clearBoard()
  playersScore = [0, 0]
  increaseScore(false)
  turn = 0
  winner = false
  $turn.setAttribute('class', 'header__turn-icon icon-x')
}

// Algoritmo de simulación de inteligencia para el jugador CPU.
function robot() {
  if (!(mode === 0 && turn === 1 && winner === false)) return

  wall()
  setTimeout(() => {
    const emptyBoxes = board
      .map((element, index) => (element === 0 ? index : -1))
      .filter((index) => index !== -1)

    const numRandom = randInt(0, emptyBoxes.length - 1)
    playTurn(emptyBoxes[numRandom])

    if (!winner) wall(false)
  }, 1000)
}

// Generador de números pseudo-aleatorios.
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

// popup message - info de cambio de modo
setTimeout(() => {
  const div = document.createElement('div')
  div.classList.add('message-box')
  div.innerHTML = `
    <h3 class="message__title">Change mode</h3>
    <p class="message__text">Player vs Player</p>
    <p class="message__text">Player vs CPU</p>
    <i class="message__cta icon-x-circle"></i>`

  const removeSms = ({ target }) => {
    if (!target.matches(CSS_CLASS.smsCta)) return
    div.removeEventListener('click', removeSms)
    div.remove()
  }

  div.addEventListener('click', removeSms)
  $(CSS_CLASS.score).appendChild(div)
}, 1000)

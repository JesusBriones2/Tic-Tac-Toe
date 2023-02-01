(() => {

  let mode;
  let gameStatus = false;

  // Objeto que contiene toda la funcionalidad de los players.
  const playersE = document.querySelectorAll('.player');
  const players = {
    define: function (mode) {

      this.p1 = {
        name: mode ? "Player 1" : "Player",
        icon: "fa-user",
        symbol: "fa-xmark",
        score: 0
      }

      this.p2 = {
        name: mode ? "Player 2" : "Computer",
        icon: mode ? "fa-user" : "fa-robot",
        symbol: 'fa-o',
        score: 0
      }

      this.turn = "p1";
      this.update();
    },


    update: function () {
      Array(this.p1, this.p2).forEach((obj, i) => {
        // Agrega clase al player de turno.
        playersE[i].classList.remove("player--turn");
        playersE[--this.turn[1]].classList.add('player--turn');

        // Agrega los datos a los players.
        playersE[i].firstElementChild.innerHTML = `
          <i class="fa-solid ${obj.symbol}"></i>
          <span>${obj.name}</span>
          <i class="fa-solid ${obj.icon} icon"></i>`;

        playersE[i].lastElementChild.textContent = obj.score;
      })
    },

    changeSymbol: function () {
      let g = this.p1.symbol;
      this.p1.symbol = this.p2.symbol;
      this.p2.symbol = g;
      this.update();
    },

    restartScore: function () {
      this.p1.score = this.p2.score = 0;
      this.update();
    },

    passTurn: function () {
      this.turn = this.turn == "p1" ? "p2" : "p1";
      this.update();
    },

    win: function () {
      this[this.turn].score++;
      this.update();
    }
  };






  // Funcionalidad del tablero.
  const boardE = document.querySelector('.board');
  let boxesE = document.querySelectorAll('.board__item');
  const wallE = document.querySelector('.wall');
  const combination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  boardE.addEventListener('mousedown', start);

  function start(e) {
    if (e.target.className.includes("board__item")) {
      playTurn(e.target.getAttribute('i'));

      if (!gameStatus) {
        players.passTurn();
        robot();
      }
    }
  }

  function robot() {
    if (mode == 0) {
      wall(1);

      if (board.includes(0)) {
        while (true) {
          num = numRandom(0, 8);
          if (board[num] == 0) {
            setTimeout(() => {
              playTurn(num);
              if (!gameStatus) players.passTurn();
              wall(0);
            }, Math.random() * 4000);
            break;
          };
        }
      }
    }
  }


  function playTurn(i) {
    let symbol = players[players.turn].symbol;
    board[i] = symbol;
    boxesE[i].innerHTML = `<i class="fa-solid ${symbol}"></i>`;
    checkBoard(symbol);
  }


  function checkBoard(symbol) {
    combination.forEach((el, i) => {
      if (board[el[0]] == symbol &&
          board[el[1]] == symbol &&
          board[el[2]] == symbol) {
        gameStatus = true;
        gameOver('win', el);
      }
      else if (!board.includes(0) && i == 7 && !gameStatus) {
        gameStatus = true;
        gameOver('full');
      }
    })
  }


  function gameOver(status, comb) {
    wall(1);
    if (status == "win") {
      boxesE[comb[0]].classList.add("anim_win")
      boxesE[comb[1]].classList.add("anim_win")
      boxesE[comb[2]].classList.add("anim_win")
      players.win();
    }
    
    if (status == "full") {
      for (let el of boxesE) {
        el.classList.add("anim_full");
      }
    }

    setTimeout(() => {
      clearBoard();
      players.passTurn();
      if (mode == 0 && players.turn == 'p2') robot(); 
    }, 1800)
  }



  function clearBoard() {
    let items = "";
    for (let i = 0; i < 9; i++) { items += `<span class="board__item" i="${i}"></span>`; }
    boardE.innerHTML = items;
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    boxesE = document.querySelectorAll('.board__item');
    gameStatus = false;
    wall(0);
  }

  function wall(n) {
    n ? wallE.classList.add('wall--active') : 
        wallE.classList.remove('wall--active')
  }



  // Acciones de los icon_cta del header.
  document.querySelector('.header__cta').addEventListener('click', e => {
    if (e.target.tagName == "I") {
      let name = e.target.className;

      name.includes("rotate") ? players.restartScore() :
      name.includes("arrow-left") ? players.changeSymbol() :
      name.includes("from-bracket") ? menu() : 0
      
      clearBoard();
    }
  });



  // Funcionalidad del menu.
  const menuE = document.querySelector('.menu');
  const menu = () => menuE.classList.add('menu--show');

  menuE.addEventListener('mousedown', e => {
    if (e.target.tagName == "BUTTON") {
      players.define(+e.target.value);
      mode = +e.target.value;
      menuE.classList.remove('menu--show');
    }
  })


  // Ajusta el tamaño del tablero.
  boardE.style.height = `${boardE.clientWidth}px`;


  function numRandom(start = 0, end = 100) {
    let num = -1;
    if (start <= end) {
      while (num < start) {
        num = Math.round(Math.random() * end);
      }
    }
    return num;
  }

})();
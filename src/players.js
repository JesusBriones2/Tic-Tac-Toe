export class Players {
    turn = null;
    
    constructor(elements) {
        this.p1 = {name:null, e:elements[0], symbol:'fa-xmark', score: 0, turn: true};
        this.p2 = {name:null, e:elements[1], symbol:'fa-o', score: 0, turn: false};
    }

    define(mode) {
        if (mode) {
            this.p1.name = "Player 1";
            this.p2.name = "Player 2";
            this.turn = this.p1.symbol;
        }
        else {
            this.p1.name = "Player";
            this.p2.name = "Computer";
            this.turn = this.p1.symbol;
        }
    }

    update() {
        new Array(this.p1, this.p2).forEach(p => {
            const elements = p.e.children;

            p.turn ? p.e.classList.add('player--turn'): p.e.classList.remove('player--turn');

            elements[0].innerHTML = 
            `<i class="fa-solid ${p.symbol}"></i>
            <span>${p.name}</span>
            <i class="fa-solid ${p.name == "Computer" ? "fa-robot" : "fa-user"} icon"></i>`;

            elements[1].textContent = p.score;
        });
    }

    changeSymbol() {
        let g = this.p1.symbol;
        this.p1.symbol = this.p2.symbol;
        this.p2.symbol = g;
        this.update();
    }

    restartScore() {
        this.p1.score = 0;
        this.p2.score = 0;
        this.update();
    }

    passTurn() {
        this.turn = this.turn == "fa-xmark" ? "fa-o" : "fa-xmark";
        
        if  (this.p1.turn) {
            this.p1.turn = false;
            this.p2.turn = true;
        }
        else {
            this.p1.turn = true;
            this.p2.turn = false;
        }
    }

}
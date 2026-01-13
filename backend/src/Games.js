import { Chess } from "chess.js";


export class Game {
    player1;
    player2;
    board;
    startTime;

    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date;
    }

    makeMove(socket, move) {
        
    }
}
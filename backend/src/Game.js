import { Chess } from "chess.js";
import { MOVE, INIT_GAME, GAME_OVER } from "./Messages.js";



export class Game {
    player1;
    player2;
    board;
    startTime;
    noOfMoves;

    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date;
        this.noOfMoves = 0;
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }))
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }
        }))
        console.log("Game constructor called and players got the colour")
    }

    makeMove(socket, move) {
        if(this.noOfMoves % 2 === 0 && socket !== this.player1) {
            console.log("It's White move");
            return;
        }

        if(this.noOfMoves % 2 === 1 && socket !== this.player2) {
            console.log("It's black move");
            return;
        }

        try {
            this.board.move(move);
        }   
        catch (e) {
            console.log(e)
            return;
        }

        if(this.board.isGameOver()) {
            console.log("Game finished");
            this.player1.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w'? "black" : "white"
                }
            }))
            this.player2.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w'? "black" : "white"
                }
            }))
        }

        if(this.noOfMoves % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }

        else {
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
        this.noOfMoves++;
    }
}
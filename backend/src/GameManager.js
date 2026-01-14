import { INIT_GAME, MOVE } from "./Messages.js";
import { Game } from "./Game.js";

export class GameManager {
    games;
    users;
    pendingUser;

    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket) {
        this.user = this.user.filter((user) => user !== socket);
    }

    addHandler(socket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());
            if(message.type === INIT_GAME) {
                console.log("Request is of start a game from the client")
                if(this.pendingUser) {
                    //start a game
                    console.log("Game started with a pending user")
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    console.log("Currently waiting for other player to join");
                    this.pendingUser = socket;
                }
            }
            else if(message.type === MOVE) {
                console.log("Client want to make move")
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if(game) {
                    game.makeMove(socket, message.move);
                }
            }
        })
    }
}
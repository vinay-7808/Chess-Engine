import { INIT_GAME } from "./Messages.js";
import { Game } from "./Games.js";

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
                if(this.pendingUser) {
                    //start a game
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            else if(message.type === MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if(game) {
                    game.makeMove(socket, message.move);
                }
            }
        })
    }
}
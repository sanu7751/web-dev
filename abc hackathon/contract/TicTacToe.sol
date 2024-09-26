// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TicTacToe {
    enum Player { None, X, O }
    enum GameState { Ongoing, Won, Draw }

    struct Game {
        address player1;
        address player2;
        Player currentPlayer;
        Player[9] board;
        GameState state;
        uint256 betAmount;
    }

    Game[] public games;

    function createGame() public payable {
        require(msg.value > 0, "You must wager some ETH to start a game.");

        games.push(Game({
            player1: msg.sender,
            player2: address(0),
            currentPlayer: Player.None,
            board: [Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None],
            state: GameState.Ongoing,
            betAmount: msg.value
        }));
    }

    function joinGame(uint256 gameId) public payable {
        Game storage game = games[gameId];
        require(game.state == GameState.Ongoing, "This game has already ended.");
        require(game.player2 == address(0), "Game already has two players.");
        require(msg.value == game.betAmount, "You must match the bet amount.");

        game.player2 = msg.sender;
        game.currentPlayer = Player.X;
    }

    function makeMove(uint256 gameId, uint256 position) public {
        Game storage game = games[gameId];
        require(game.state == GameState.Ongoing, "This game is not ongoing.");
        require(game.currentPlayer != Player.None, "Game hasn't started yet.");
        require(game.board[position] == Player.None, "This position is already taken.");
        require(msg.sender == game.player1 || msg.sender == game.player2, "You are not part of this game.");

        if (msg.sender == game.player1 && game.currentPlayer == Player.X) {
            game.board[position] = Player.X;
            game.currentPlayer = Player.O;
        } else if (msg.sender == game.player2 && game.currentPlayer == Player.O) {
            game.board[position] = Player.O;
            game.currentPlayer = Player.X;
        } else {
            revert("It's not your turn.");
        }

        if (checkWin(gameId)) {
            game.state = GameState.Won;
            payout(gameId);
        } else if (isDraw(gameId)) {
            game.state = GameState.Draw;
            refund(gameId);
        }
    }

    function checkWin(uint256 gameId) internal view returns (bool) {
        Game storage game = games[gameId];
        Player[9] memory b = game.board;

        // Check rows, columns, diagonals
        for (uint8 i = 0; i < 3; i++) {
            if (b[i * 3] != Player.None && b[i * 3] == b[i * 3 + 1] && b[i * 3 + 1] == b[i * 3 + 2]) return true;
            if (b[i] != Player.None && b[i] == b[i + 3] && b[i + 3] == b[i + 6]) return true;
        }
        if (b[0] != Player.None && b[0] == b[4] && b[4] == b[8]) return true;
        if (b[2] != Player.None && b[2] == b[4] && b[4] == b[6]) return true;

        return false;
    }

    function isDraw(uint256 gameId) internal view returns (bool) {
        Game storage game = games[gameId];
        for (uint8 i = 0; i < 9; i++) {
            if (game.board[i] == Player.None) {
                return false;
            }
        }
        return true;
    }

    function payout(uint256 gameId) internal {
        Game storage game = games[gameId];
        address winner = game.currentPlayer == Player.O ? game.player1 : game.player2;
        payable(winner).transfer(game.betAmount * 2);
    }

    function refund(uint256 gameId) internal {
        Game storage game = games[gameId];
        payable(game.player1).transfer(game.betAmount);
        payable(game.player2).transfer(game.betAmount);
    }
}

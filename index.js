// Modules
const gameBoard = (function () {
    let _boardState = ["", "", "", "", "", "", "", "", ""];

    let _resetBoard = () => {
        _boardState = ["", "", "", "", "", "", "", "", ""];
    };

    let _setPlayerMove = (index, piece) => {
        _boardState[index] = piece;
    };

    return {
        boardState: _boardState,
        resetBoard: _resetBoard,
        setPlayerMove: _setPlayerMove,
    };
})();

const displayController = (() => {
    let _currentBoard = document.getElementById("board");
    let _displayBoard = (boardState) => {
        let i = 0;
        _removeBoard(_currentBoard);
        boardState.forEach((piece) => {
            let square = document.createElement("div");
            square.innerText = piece;
            square.classList.add("square");
            square.dataset.index = i;
            ++i;
            _currentBoard.appendChild(square);
        });
    };

    let _resultTitle = document.createElement("h1");
    let _result = (title) => {
        _resultTitle.innerText = title;
        document.querySelector("body").appendChild(_resultTitle);
    };

    // Removes the current board in order to update game changes
    let _removeBoard = (currentBoard) => {
        while (currentBoard.firstChild) {
            currentBoard.removeChild(currentBoard.firstChild);
        }
    };

    return {
        displayBoard: _displayBoard,
        currentBoard: _currentBoard,
        result: _result,
    };
})();

// Factory Functions
const Player = (piece) => {
    return {
        piece,
    };
};

displayController.displayBoard(gameBoard.boardState);

const playerOne = Object.create(Player("X"));
const playerTwo = Object.create(Player("O"));

// For every click event update the turn variable that is stored in controlFlow
// and then based on the turn update the gameboard with the players piece

const controlFLow = (() => {
    let _turn = true;

    let _checkWinner = (piece, board) => {
        return (
            (piece == board[0] && piece == board[1] && piece == board[2]) ||
            (piece == board[3] && piece == board[4] && piece == board[5]) ||
            (piece == board[6] && piece == board[7] && piece == board[8]) ||
            (piece == board[0] && piece == board[3] && piece == board[6]) ||
            (piece == board[1] && piece == board[4] && piece == board[7]) ||
            (piece == board[2] && piece == board[5] && piece == board[8]) ||
            (piece == board[0] && piece == board[4] && piece == board[8]) ||
            (piece == board[2] && piece == board[4] && piece == board[6])
        );
    };

    let _isGameOver = (board) => {
        if (_checkWinner(playerOne.piece, board)) {
            displayController.currentBoard.removeEventListener(
                "click",
                handleClick
            );
            displayController.result(`${playerOne.piece} won the game!`);
            console.log("You win");
        } else if (_checkWinner(playerTwo.piece, board)) {
            displayController.currentBoard.removeEventListener(
                "click",
                handleClick
            );
            displayController.result(`${playerTwo.piece} won the game!`);
        } else if (!board.includes("")) {
            // TODO Do all the tie things here
            displayController.currentBoard.removeEventListener(
                "click",
                handleClick
            );
            displayController.result(`It's a tie`);
        }
    };

    let handleClick = (e) => {
        let target = e.target;
        let index = parseInt(target.dataset.index);
        if (target.innerText == "") {
            gameBoard.setPlayerMove(
                index,
                _turn ? playerOne.piece : playerTwo.piece
            );
            displayController.displayBoard(gameBoard.boardState);
            _turn = !_turn;
            _isGameOver(gameBoard.boardState);
        }
    };

    function move() {
        displayController.currentBoard.addEventListener("click", handleClick);
    }
    return {
        move,
    };
})();

controlFLow.move();

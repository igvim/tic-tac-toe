const gameBoard = (() => {
  const board = [];

  const newBoard = (row, column) => {
    for (i = 0; i < row; i++) {
      board[i] = [];
      for (j = 0; j < column; j++) {
        board[i].push("");
      }
    }
    return board;
  };

  const getBoard = () => board;

  const getCell = (row, column) => {
    const cell = board[row][column];
    return cell;
  };

  return { getBoard, newBoard, getCell };
})();

const GameController = (() => {
  let turnCount = 0;
  let message = "";

  const Player = (mark) => {
    const play = (row, column) => {
      const board = gameBoard.getBoard();
      if (board[row][column] === "") {
        board[row][column] = mark;
        ++turnCount;
      }
    };

    return { mark, play };
  };

  const PlayerX = Player("X");
  const PlayerO = Player("O");
  /*
  const newGame = () => {
    turnCount = 0;
    gameBoard.newBoard(3, 3);
    console.log("new game");
  };
*/
  const winCheck = () => {
    const checkOne = () => {
      const cell = gameBoard.getCell(1, 1);
      if (!cell) return false;
      if (cell === gameBoard.getCell(0, 0)) {
        if (cell === gameBoard.getCell(2, 2)) {
          return true;
        }
      }
      if (cell === gameBoard.getCell(0, 1)) {
        if (cell === gameBoard.getCell(2, 1)) {
          return true;
        }
      }
      if (cell === gameBoard.getCell(0, 2)) {
        if (cell === gameBoard.getCell(2, 0)) {
          return true;
        }
      }
      if (cell === gameBoard.getCell(1, 0)) {
        if (cell === gameBoard.getCell(1, 2)) {
          return true;
        }
      }
      return false;
    };

    const checkTwo = () => {
      const cell = gameBoard.getCell(0, 0);
      if (!cell) return false;
      if (cell === gameBoard.getCell(0, 1)) {
        if (cell === gameBoard.getCell(0, 2)) {
          return true;
        }
      }
      if (cell === gameBoard.getCell(1, 0)) {
        if (cell === gameBoard.getCell(2, 0)) {
          return true;
        }
      }
      return false;
    };

    const checkThree = () => {
      const cell = gameBoard.getCell(2, 2);
      if (!cell) return false;
      if (cell === gameBoard.getCell(0, 2)) {
        if (cell === gameBoard.getCell(1, 2)) {
          return true;
        }
      }
      if (cell === gameBoard.getCell(2, 0)) {
        if (cell === gameBoard.getCell(2, 1)) {
          return true;
        }
      }
      return false;
    };

    if (!checkOne()) {
      if (!checkTwo()) {
        if (!checkThree()) {
          return false;
        }
      }
    }
    return true;
  };

  const tieCheck = () => {
    const board = gameBoard.getBoard();
    const noMoves = board.some((row) => row.some((cell) => cell === ""));
    const isTie = !noMoves;
    return isTie;
  };

  const turn = (i, j) => {
    const board = gameBoard.getBoard();

    turnCount % 2 == 0 ? PlayerX.play(i, j) : PlayerO.play(i, j);

    const lastCell = board[i][j];

    if (turnCount > 4) {
      if (winCheck()) message = `${lastCell} wins!`;
    }

    if (turnCount === board.length ** 2 && !winCheck()) {
      if (tieCheck()) message = "Tie!";
    }

    const statusObj = { lastCell, message };
    return statusObj;
  };

  return { turn };
})();

const DOMController = (() => {
  const board = gameBoard.getBoard();

  const gameStatus = (msg) => {
    const statusMsg = document.querySelector(".messages");
    statusMsg.textContent = msg;
  };

  const renderBoard = () => {
    const boardSpace = document.querySelector(".board");
    boardSpace.innerHTML = "";
    board.forEach((row, i) => {
      row.forEach((column, j) => {
        const square = document.createElement("div");
        square.classList.add("square");
        square.addEventListener("click", (e) => {
          let status = GameController.turn(i, j);
          square.textContent = status.lastCell;
          gameStatus(status.message);
        });
        boardSpace.appendChild(square);
      });
    });
  };

  return { renderBoard };
})();

gameBoard.newBoard(3, 3);
DOMController.renderBoard();

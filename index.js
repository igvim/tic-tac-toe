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

const Player = (mark) => {
  const play = (row, column) => {
    const board = gameBoard.getBoard();
    board[row][column] === ""
      ? (board[row][column] = mark)
      : console.log("Square already played, choose another");
  };

  return { mark, play };
};

const PlayerX = Player("X");
const PlayerO = Player("O");

const GameController = (() => {
  let turnCount = 0;

  const getTurn = () => turnCount;

  const resetGame = () => {
    turnCount = 0;
    gameBoard.newBoard(3, 3);
  };

  const winCheck = () => {
    const winMessage = (winCell) => {
      switch (winCell) {
        case PlayerX.mark:
          console.log("X wins! New game:");
          break;
        case PlayerO.mark:
          console.log("O wins! New game:");
          break;
      }
    };

    const checkOne = () => {
      const cell = gameBoard.getCell(1, 1);
      if (!cell) return false;
      switch (cell) {
        case gameBoard.getCell(0, 0):
          if (cell === gameBoard.getCell(2, 2)) {
            winMessage(cell);
            return true;
          }
        case gameBoard.getCell(0, 1):
          if (cell === gameBoard.getCell(2, 1)) {
            winMessage(cell);
            return true;
          }
        case gameBoard.getCell(0, 2):
          if (cell === gameBoard.getCell(2, 0)) {
            winMessage(cell);
            return true;
          }
        case gameBoard.getCell(1, 0):
          if (cell === gameBoard.getCell(1, 2)) {
            winMessage(cell);
            return true;
          }
        default:
          return false;
      }
    };

    const checkTwo = () => {
      const cell = gameBoard.getCell(0, 0);
      if (!cell) return false;
      switch (cell) {
        case gameBoard.getCell(0, 1):
          if (cell === gameBoard.getCell(0, 2)) {
            winMessage(cell);
            return true;
          }
        case gameBoard.getCell(1, 0):
          if (cell === gameBoard.getCell(2, 0)) {
            winMessage(cell);
            return true;
          }
        default:
          return false;
      }
    };

    const checkThree = () => {
      const cell = gameBoard.getCell(2, 2);
      if (!cell) return false;
      switch (cell) {
        case gameBoard.getCell(0, 2):
          if (cell === gameBoard.getCell(1, 2)) {
            winMessage(cell);
            return true;
          }
        case gameBoard.getCell(2, 0):
          if (cell === gameBoard.getCell(2, 1)) {
            winMessage(cell);
            return true;
          }
        default:
          return false;
      }
    };

    if (!checkOne()) {
      if (!checkTwo()) {
        if (!checkThree()) {
          console.log("no winner");
          return false;
        }
      }
    }
  };

  const tieCheck = () => {
    const noMoves = board.some((row) => row.some((cell) => cell === ""));
    const isTie = !noMoves;
    return isTie;
  };

  const turn = (i, j) => {
    const board = gameBoard.getBoard();

    turnCount % 2 == 0 ? PlayerX.play(i, j) : PlayerO.play(i, j);
    ++turnCount;

    if (turnCount > 4) {
      winCheck();
    }

    if (turnCount === board.length ** 2) {
      if (tieCheck()) console.log("tie");
    }
  };

  const checkTest = () => {
    board = gameBoard.newBoard(3, 3);
    turn(0, 0);
    turn(0, 2);
    turn(0, 1);
    turn(1, 1);
    turn(1, 2);
    turn(1, 0);
    turn(2, 0);
    turn(2, 2);
    turn(2, 1);
    return board;
  };

  return { turn, checkTest, resetGame, getTurn };
})();

const DOMController = (() => {
  const board = gameBoard.getBoard();

  const render = () => {
    const boardSpace = document.querySelector(".board");
    boardSpace.innerHTML = "";
    board.forEach((row, i) => {
      row.forEach((column, j) => {
        const square = document.createElement("div");
        const cell = board[i][j];
        square.textContent = cell;
        square.classList.add("square");
        boardSpace.appendChild(square);
      });
    });
  };

  return { render };
})();

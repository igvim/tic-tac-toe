const gameBoard = (() => {
  const board = [];

  const newBoard = (row, column) => {
    for (i = 0; i < row; i++) {
      board[i] = [];
      for (j = 0; j < column; j++) {
        board[i].push("");
      };
    };
    return board;
  };

  const getBoard = () => board;

  const winCheck = () => {
    const getCell = (row, column) => {
      const cell = board[row][column];
      return cell;
    };

    const winMessage = (winCell) => {
      switch (winCell) {
        case PlayerX.mark:
          console.log("X wins! New game:");
          break;
        case PlayerO.mark:
          console.log("O wins! New game:");
          break;
      };
      GameController.resetGame();
    };

    const checkOne = () => {
      const cell = getCell(1, 1);

      switch (cell) {
        case getCell(0, 0):
          if (cell === getCell(2, 2)) {
            winMessage(cell);
            return true;
          };
        case getCell(0, 1):
          if (cell === getCell(2, 1)) {
            winMessage(cell);
            return true;
          };
        case getCell(0, 2):
          if (cell === getCell(2, 0)) {
            winMessage(cell);
            return true;
          };
        case getCell(1, 0):
          if (cell === getCell(1, 2)) {
            winMessage(cell);
            return true;
          };
        default:
          return false;
      };
    };

    const checkTwo = () => {
      const cell = getCell(0, 0);

      switch (cell) {
        case getCell(0, 1):
          if (cell === getCell(0, 2)) {
            winMessage(cell);
            return true;
          };
        case getCell(1, 0):
          if (cell === getCell(2, 0)) {
            winMessage(cell);
            return true;
          };
        default:
          return false;
      };
    };

    const checkThree = () => {
      const cell = getCell(2, 2);

      switch (cell) {
        case getCell(0, 2):
          if (cell === getCell(1, 2)) {
            winMessage(cell);
            return true;
          };
        case getCell(2, 0):
          if (cell === getCell(2, 1)) {
            winMessage(cell);
            return true;
          };
        default:
          return false;
      };
    };

    if (!checkOne()) {
      if (!checkTwo()) {
        if (!checkThree()) {
          console.log('no winner')
        };
      };
    };
  };

  const tieCheck = () => {
    const noMoves = board.some((row) => row.some((cell) => cell === ""));
    const isTie = !noMoves;
    return isTie;
  };

  return { getBoard, newBoard, winCheck, tieCheck };
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
    return gameBoard.newBoard(3,3);
  };

  const turn = (i, j) => {
    const board = gameBoard.getBoard();

    turnCount % 2 == 0 ? PlayerX.play(i, j) : PlayerO.play(i, j);
    ++turnCount;

    if (turnCount > 4) {
      const isWin = gameBoard.winCheck();
      if (isWin) resetGame();
    }

    if ((turnCount === board.length) ^ 2) gameBoard.tieCheck();
    return board;
  };

  const checkTest = () => {
    board = gameBoard.newBoard(3,3);
    turn(0,0);
    turn(1,0);
    turn(1,1);
    turn(0,1);
    turn(2,2);
    return board;
  }

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

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
  let players = [];

  const Player = (name, mark) => {
    const play = (row, column) => {
      const board = gameBoard.getBoard();
      if (board[row][column] === "") {
        board[row][column] = mark;
        ++turnCount;
      }
    };

    return { name, mark, play };
  };

  const createPlayers = (name1, name2) => {
    const PlayerX = Player(name1, "X");
    const PlayerO = Player(name2, "O");
    players.push(PlayerX, PlayerO);
  };

  const getPlayers = () => players;

  const reset = () => {
    turnCount = 0;
    message = "";
    players = [];
    gameBoard.newBoard(3, 3);
  };

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
    const players = getPlayers();
    const PlayerX = players[0];
    const PlayerO = players[1];

    turnCount % 2 == 0 ? PlayerX.play(i, j) : PlayerO.play(i, j);

    const lastCell = board[i][j];

    if (turnCount > 4) {
      if (winCheck()) {
        lastCell === PlayerX.mark
          ? (message = `${PlayerX.name} wins!`)
          : (message = `${PlayerO.name} wins!`);
      }
    }

    if (turnCount === board.length ** 2 && !winCheck()) {
      if (tieCheck()) message = "Tie!";
    }

    const statusObj = { lastCell, message };
    return statusObj;
  };

  return { turn, reset, createPlayers };
})();

const DOMController = (() => {
  const board = gameBoard.getBoard();
  const boardSpace = document.querySelector(".board");
  boardSpace.innerHTML = "";

  const gameStatus = (msg) => {
    const statusMsg = document.querySelector(".messages");
    statusMsg.textContent = msg;
  };

  const toggleCellStates = () => {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((sq) => {
      sq.disabled = !sq.disabled;
    });
  };

  const renderBoard = () => {
    board.forEach((row, i) => {
      row.forEach((column, j) => {
        const square = document.createElement("button");
        square.classList.add("square");
        square.addEventListener("click", (e) => {
          let status = GameController.turn(i, j);
          square.textContent = status.lastCell;
          gameStatus(status.message);
          if (status.message) {
            toggleCellStates();
          }
        });
        boardSpace.appendChild(square);
      });
    });
  };

  const newGame = () => {
    const newBtn = document.querySelector(".new");
    newBtn.addEventListener("click", () => {
      const newPlayerForm = document.querySelector("form");
      newPlayerForm.hidden = false;
      newPlayerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const p1Name = document.querySelector("#p1name");
        const p2Name = document.querySelector("#p2name");
        boardSpace.innerHTML = "";
        gameStatus("");
        GameController.reset();
        GameController.createPlayers(p1Name.value, p2Name.value);
        e.currentTarget.hidden = true;
        renderBoard();
      });
    });
  };

  return { renderBoard, newGame };
})();

DOMController.newGame();

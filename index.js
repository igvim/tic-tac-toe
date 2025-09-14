const gameBoard = (() => {

  const board = [];

  const newBoard = (row, column) => {
    for (i = 0; i < row; i++){
      board[i] = [];
      for (j = 0; j < column; j++){
        board[i].push('');
      };
    };
  };
  
  const getBoard = () => {
    if (board.length == 0) {
      newBoard(3,3);
    };
    return board;
  }

  const winCheck = () => {

    const getCell = (row, column) => {
      const board = gameBoard.getBoard();
      const cell = board[row][column];
      return cell;
    };

    let cell = getCell(1,1);

    const winMessage = (winCell) => { 
      winCell == PlayerX.mark ? console.log('X wins!') : console.log('O wins!');
    };

    switch (cell) {
      case getCell(0,0):
        if (cell == getCell(2,2)) winMessage(cell);
        break;
      case getCell(0,1):
        if (cell == getCell(2,1)) winMessage(cell);
        break;
      case getCell(0,2):
        if (cell == getCell(2,0)) winMessage(cell);
        break;
      case getCell(1,0):
        if (cell == getCell(1,2)) winMessage(cell);
        break;
      default:
        cell = getCell(0,0);
    };

    switch (cell) {
      case getCell(0,1):
        if (cell == getCell(0,2)) winMessage(cell);
        break;
      case getCell(1,0):
        if (cell == getCell(2,0)) winMessage(cell);
        break;
      default:
        cell = getCell(2,2);
    };

    switch (cell) {
      case getCell(0,2):
        if (cell == getCell(1,2)) winMessage(cell);
        break;
      case getCell(2,0):
        if (cell == getCell(2,1)) winMessage(cell);
        break;
      default:
        console.log('no winner');
    }
  };

  const tieCheck = () => {
    const board = gameBoard.getBoard();
    const noMoves = board.some((row) => row.some((cell) => cell === ''));
    const isTie = !noMoves;
    return isTie;
  }

  return { getBoard, newBoard, winCheck, tieCheck }
})();

const Player = (mark) => {

  const play = (row, column) => {
    const board = gameBoard.getBoard();
    board[row][column] == '' ? 
    board[row][column] = mark : 
    console.log('Square already played, choose another');
  };

  return { mark, play };
};

const PlayerX = Player('X');
const PlayerO = Player('O');

const DOMController = (() => {
  const board = gameBoard.getBoard();

  const render = () => {
    const boardSpace = document.querySelector('.board');
    boardSpace.innerHTML = '';
    board.forEach((row, i) => {
      row.forEach((column, j) => {
        const square = document.createElement('div');
        const cell = board[i][j];
        square.textContent = cell;
        square.classList.add('square');
        boardSpace.appendChild(square);
      })
    })
  };

  return { render }
})();
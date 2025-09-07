const gameBoard = (() => {

  const board = [];

  const newBoard = (row, column) => { 
    for (i = 0; i < row; i++){
      board[i] = [];
      for (j = 0; j < column; j++){
        board[i].push([]);
      };
    };
  };
  
  const getBoard = () => board;

  const winCheck = () => {

    const getCell = (row, column) => {
      const board = gameBoard.getBoard();
      const cell = board[row][column];
      return cell;
    };

    let cell = getCell(1,1);

    const winMessage = () => { console.log('winner') };
    switch (cell) {
      case getCell(0,0):
        if (cell == getCell(2,2)) winMessage();
        break;
      case getCell(0,1):
        if (cell == getCell(2,1)) winMessage();
        break;
      case getCell(0,2):
        if (cell == getCell(2,0)) winMessage();
        break;
      case getCell(1,0):
        if (cell == getCell(1,2)) winMessage();
        break;
      default:
        cell = getCell(0,0);
    };

    switch (cell) {
      case getCell(0,1):
        if (cell == getCell(0,2)) winMessage();
        break;
      case getCell(1,0):
        if (cell == getCell(2,0)) winMessage();
        break;
      default:
        cell = getCell(2,2);
    };

    switch (cell) {
      case getCell(0,2):
        if (cell == getCell(1,2)) winMessage();
        break;
      case getCell(2,0):
        if (cell == getCell(2,1)) winMessage();
        break;
      default:
        console.log('no winner');
    }
    /*
    for (i = 0; i < board.length; i++){
      for (j = 0; j < board.length; j++){
        console.log('hi');
      };
    };
    */
  };

  return { getBoard, newBoard, winCheck }
})();

const Player = (mark) => {

  const play = (row, column) => {
    const board = gameBoard.getBoard();
    board[row][column] == '' ? 
    board[row][column] = mark : 
    console.log('Square already played, choose another');
  };

  const winArray = [mark, mark, mark];

  return { winArray, play };
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
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

  const getCell = (row, column) => {
    const board = gameBoard.getBoard();
    const cell = board[row][column];
    return cell;
  };

  const winCheck = () => {
    const board = gameBoard.getBoard();
    for (i = 0; i < board.length; i++){
      for (j = 0; j < board.length; j++){
        console.log('hi');
      };
    };
  }

  return { getBoard, newBoard, getCell, winCheck }
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
const gameBoard = (() => {

  const board = [];

  const newBoard = () => {
    const row = 3;
    const column = 3;
    
    for (i = 0; i < row; i++){
      board[i] = [];
      for (j = 0; j < column; j++){
        board[i].push([]);
      }
    }
  }
  
  const getBoard = () => board;

  return { getBoard, newBoard }
})();

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

const markBoard = (row, column, playerMark) => {
  const board = gameBoard.getBoard();
  board[row][column] == '' ? 
  board[row][column] = playerMark : 
  console.log('Square already played, choose another');
};

const Player = (mark) => {
  return { mark };
}

const PlayerX = Player('X');
const PlayerO = Player('O');
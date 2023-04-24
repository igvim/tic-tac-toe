function gameBoard() {
  const board = [];
  const row = 3;
  const column = 3;

  for (i = 0; i < row; i++){
    board[i] = [];
    for (j = 0; j < column; j++){
      board[i].push('O');
    }
  }

  const getBoard = () => board;

  return { getBoard }
};

const render = () => {
  const board = gameBoard().getBoard();
  board.forEach((row, i) => {
    row.forEach((column, j) => {
      const space = document.querySelector('.board');
      const square = document.createElement('div');
      const cell = board[i][j];
      square.textContent = cell;
      square.classList.add('square');
      space.appendChild(square);
    })
  })
}

render()
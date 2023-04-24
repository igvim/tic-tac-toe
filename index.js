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

  const render = () => {
    board.forEach((row) => {
      row.forEach((column) => {
        const space = document.querySelector('.board');
        const square = document.createElement('div');
        // square.textContent = board[row][column];
        square.classList.add('square');
        space.appendChild(square);
      })
    })
  }

  return { getBoard, render }
};

gameBoard().render();
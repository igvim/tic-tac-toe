function gameBoard() {
  const board = [];

  for (i = 0; i < 3; i++){
    board[i] = [];
    for (j = 0; j < 3; j++){
      board[i].push([]);
    }
  }

  const getBoard = () => board;

  const render = () => {
    board.forEach((row) => {
      row.forEach(() => {
        const board = document.querySelector('.board');
        const square = document.createElement('div');
        square.classList.add('square');
        board.appendChild(square);
      })
    })
  }

  return { getBoard, render }
};

gameBoard().render();
function gameBoard() {
  const board = [];

  for (i = 0; i < 3; i++){
    board[i] = [];
    for (j = 0; j < 3; j++){
      board[i].push([]);
    }
  }

  return { board }
};
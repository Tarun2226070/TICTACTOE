const board = document.getElementById("game-board");
const resetBtn = document.getElementById("reset-btn");
const statusDiv = document.getElementById("status");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

board.addEventListener("click", (e) => {
  if (gameOver) return;
  const cell = e.target;
  const index = cell.getAttribute("data-index");

  if (!gameBoard[index]) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    
    if (checkWin()) {
      statusDiv.textContent = `${currentPlayer} wins!`;
      gameOver = true;
    } else if (gameBoard.every(cell => cell !== "")) {
      statusDiv.textContent = "It's a draw!";
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusDiv.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
});

resetBtn.addEventListener("click", resetGame);

function checkWin() {
  return winConditions.some((condition) => {
    const [a, b, c] = condition;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  currentPlayer = "X";
  statusDiv.textContent = `Player ${currentPlayer}'s turn`;
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
}

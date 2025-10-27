const cells = document.querySelectorAll("[data-cell]");
const gameBoard = document.getElementById("game");
const winnerText = document.getElementById("winnerText");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";
let gameActive = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach(cell => {
  cell.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  if (!gameActive) return;

  const cell = e.target;
  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function swapTurns() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin(player) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => cells[index].textContent === player);
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}

function endGame(draw) {
  gameActive = false;
  if (draw) {
    winnerText.textContent = "It's a Draw!";
  } else {
    winnerText.textContent = `Player ${currentPlayer} Wins!`;
  }
}

restartButton.addEventListener("click", () => {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.addEventListener("click", handleClick, { once: true });
  });
  currentPlayer = "X";
  gameActive = true;
  winnerText.textContent = "";
});

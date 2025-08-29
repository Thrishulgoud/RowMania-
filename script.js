let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let scoreX = 0, scoreO = 0, draws = 0;

const statusDisplay = document.getElementById("status");
const boardContainer = document.getElementById("board");
const scoreXDisplay = document.getElementById("scoreX");
const scoreODisplay = document.getElementById("scoreO");
const drawsDisplay = document.getElementById("draws");

// Winning conditions
const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

// Create cells dynamically
function createBoard() {
  boardContainer.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.setAttribute("data-index", index);
    cellElement.innerText = cell;
    cellElement.addEventListener("click", handleCellClick);
    boardContainer.appendChild(cellElement);
  });
}

function handleCellClick(e) {
  const index = e.target.getAttribute("data-index");

  if (board[index] !== "" || !isGameActive) return;

  board[index] = currentPlayer;
  e.target.innerText = currentPlayer;

  checkResult();
}

function checkResult() {
  let roundWon = false;

  for (let condition of winningConditions) {
    let [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerText = `Player ${currentPlayer} Wins! 🎉`;
    isGameActive = false;

    if (currentPlayer === "X") {
      scoreX++;
      scoreXDisplay.innerText = scoreX;
    } else {
      scoreO++;
      scoreODisplay.innerText = scoreO;
    }
    return;
  }

  if (!board.includes("")) {
    statusDisplay.innerText = "It's a Draw! 🤝";
    isGameActive = false;
    draws++;
    drawsDisplay.innerText = draws;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerText = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  statusDisplay.innerText = "Player X's Turn";
  createBoard();
}

function newGame() {
  restartGame();
  scoreX = 0;
  scoreO = 0;
  draws = 0;
  scoreXDisplay.innerText = scoreX;
  scoreODisplay.innerText = scoreO;
  drawsDisplay.innerText = draws;
}

// Initialize
createBoard();

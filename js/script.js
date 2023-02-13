const X_CLASS = "x",
  CIRCLE_CLASS = "circle",
  WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  cellElements = document.querySelectorAll("[data-cell]"),
  board = document.getElementById("board"),
  winningMessageElement = document.getElementById("winningMessage"),
  restartButton = document.getElementById("restartButton"),
  winningMessageTextElement = document.querySelector(
    "[data-winning-message-text]"
  );
let circleTurn;
function startGame() {
  (circleTurn = !1),
    cellElements.forEach((e) => {
      e.classList.remove(X_CLASS),
        e.classList.remove(CIRCLE_CLASS),
        e.removeEventListener("click", handleClick),
        e.addEventListener("click", handleClick, { once: !0 });
    }),
    setBoardHoverClass(),
    winningMessageElement.classList.remove("show");
}
function handleClick(e) {
  const n = e.target,
    s = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(n, s),
    checkWin(s)
      ? endGame(!1)
      : isDraw()
      ? endGame(!0)
      : (swapTurns(), setBoardHoverClass());
}
function endGame(e) {
  (winningMessageTextElement.innerText = e
    ? "Draw!"
    : (circleTurn ? "O's" : "X's") + " Wins!"),
    winningMessageElement.classList.add("show");
}
function isDraw() {
  return [...cellElements].every(
    (e) => e.classList.contains(X_CLASS) || e.classList.contains(CIRCLE_CLASS)
  );
}
function placeMark(e, n) {
  e.classList.add(n);
}
function swapTurns() {
  circleTurn = !circleTurn;
}
function setBoardHoverClass() {
  board.classList.remove(X_CLASS),
    board.classList.remove(CIRCLE_CLASS),
    circleTurn
      ? board.classList.add(CIRCLE_CLASS)
      : board.classList.add(X_CLASS);
}
function checkWin(e) {
  return WINNING_COMBINATIONS.some((n) =>
    n.every((n) => cellElements[n].classList.contains(e))
  );
}
startGame(), restartButton.addEventListener("click", startGame);

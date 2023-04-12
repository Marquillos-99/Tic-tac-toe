import { WinnerCombos } from "../constants.js";
import { Square } from "../components/Square.jsx";
export const checkWinner = (boardCheck) => {
  for (const combo of WinnerCombos) {
    const [a, b, c] = combo;
    if (
      boardCheck[a] &&
      boardCheck[a] === boardCheck[b] &&
      boardCheck[a] === boardCheck[c]
    ) {
      return boardCheck[a]; // x u o
    }
  }
  // no Winner
  return null;
};

export const checkEndGame = (newBoard) => {
  return newBoard.every((Square) => Square != null);
};

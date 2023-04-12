import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square.jsx";
import { turns } from "./constants.js";
import { checkWinner, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(turns.X);

  // null = no hay ganador false = draw
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(turns.X);
    setWinner(null);
  };

  const updateBoard = (index) => {
    // no se actualiza si tiene algo
    if (board[index] || winner) return;

    // re-render with simbols
    //important props unmutable
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // change turn
    const newTurn = turn === turns.X ? turns.O : turns.X;
    setTurn(newTurn);
    //check if there is a winner
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(() => {
        return newWinner;
      });
      // check if game is over
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tic-tac-toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === turns.X}>{turns.X}</Square>
        <Square isSelected={turn === turns.O}>{turns.O}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;

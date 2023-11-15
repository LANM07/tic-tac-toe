// Game.js
import React, { useState } from 'react';
import Board from '../Board/Board';
import ResetButton from '../ResetButton/ResetButton';
import './Game.css';
import Square from '../Square/Square';

const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Returns 'X' or 'O' depending on the winner
      }
    }
  
    return null; // Returns null if there is no winner
  };

  const Game = () => {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [stepNumber, setStepNumber] = useState(0);
    const xIsNext = stepNumber % 2 === 0;
  
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;
  
    const handleClick = (i) => {
      const newHistory = history.slice(0, stepNumber + 1);
      const currentSquares = current.squares.slice();
  
      if (calculateWinner(currentSquares) || currentSquares[i]) {
        return; // If there is a winner or the square is already filled, do nothing
      }
  
      currentSquares[i] = xIsNext ? 'X' : 'O';
  
      setHistory([...newHistory, { squares: currentSquares }]);
      setStepNumber(newHistory.length);
    };
  
    const jumpTo = (step) => {
      setStepNumber(step);
    };
  
    const resetGame = () => {
      setHistory([{ squares: Array(9).fill(null) }]);
      setStepNumber(0);
    };

    return (
        <div className="game">
          <div className="game-board">
            {/* Pass the state and functions to the Board component */}
            <Board squares={current.squares} onClick={handleClick} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            {/* Display game history */}
            <ol>
              {history.map((step, move) => (
                <li key={move}>
                  <button onClick={() => jumpTo(move)}>
                    {move === 0 ? 'Go to game start' : `Go to move #${move}`}
                  </button>
                </li>
              ))}
            </ol>
          </div>
          {/* Pass the reset function to the ResetButton component */}
          <ResetButton onClick={resetGame} />
        </div>
      );
    };
    
    export default Game;
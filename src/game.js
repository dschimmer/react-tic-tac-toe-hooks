import React, { useState } from 'react';
import { Board } from './board';
  
export function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNet] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const handleClick = (i) => {
    const history1 = history.slice(0, stepNumber + 1);
    const current = history1[history1.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(history1.concat([{ squares: squares }]));
    setStepNumber(history1.length);
    setXIsNet(prev => !prev);
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNet((step % 2) === 0);
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ?
      `Go to move # ${move}` :
      'Go to game start';

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>{moves}</div>
      </div>
    </div>
  );
}
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])  {
        return squares[a];
      }
    }
  
    return null;
  }
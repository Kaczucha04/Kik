import React, { useState } from 'react';
import './App.css';

function calculateWinner(squares) {
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
      return squares[a];
    }
  }

  if (!squares.includes(null)) {
    return null;
  }

  return false;
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');

  function handleClick(i) {
    const squares = [...board];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = player;
    setBoard(squares);
    setPlayer(player === 'X' ? 'O' : 'X');
  }

  const winner = calculateWinner(board);
  let status;

  if (winner) {
    status = 'Winner: ' + winner;
  } else if (board.includes(null)) {
    status = 'Next player: ' + player;
  } else {
    status = 'Draw!';
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setPlayer('X');
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="board-row">
          <Square value={board[0]} onClick={() => handleClick(0)} />
          <Square value={board[1]} onClick={() => handleClick(1)} />
          <Square value={board[2]} onClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={board[3]} onClick={() => handleClick(3)} />
          <Square value={board[4]} onClick={() => handleClick(4)} />
          <Square value={board[5]} onClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={board[6]} onClick={() => handleClick(6)} />
          <Square value={board[7]} onClick={() => handleClick(7)} />
          <Square value={board[8]} onClick={() => handleClick(8)} />
        </div>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default App;

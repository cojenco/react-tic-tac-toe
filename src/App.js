import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

// src/App.js
const App = () => {
  const [squares, setSquares] = useState(generateSquares());
  const [currentPlayer, setPlayer] = useState(PLAYER_1);
  const [winner, setWinner] = useState(null);
  
 
  const handleClickMove = (squareID) => {
    const row = Math.floor(squareID / 3);  //row# = id / total#columns
    const col = squareID % 3;              //col# = id % total#colimns

    if (!winner && !squares[row][col].value) {   //if winner === null && sqaure_value === ''
      const newSquaresState = [...squares];      //make shallow copy with spread operator
      newSquaresState[row][col].value = currentPlayer;

      if (currentPlayer === PLAYER_1) {
        setPlayer(PLAYER_2);
      } else {
        setPlayer(PLAYER_1);
      }

      setSquares(newSquaresState);
      checkForWinner(squares);
    }
  }

  
  const checkForWinner = (squares) => {
    if (squares[1][1].value && squares[0][0].value === squares[1][1].value && squares[1][1].value === squares[2][2].value) {
      return setWinner(squares[1][1].value);  //winning by diagonal right
    } else if (squares[1][1].value && squares[0][2].value === squares[1][1].value && squares[1][1].value === squares[2][0].value) {
      return setWinner(squares[1][1].value);  //winning by diagonal left
    } 

    let emptySquares = 0;                       //to use for handling Ties

    for(let i = 0; i < 3; i++) {
      if(squares[i][0].value && squares[i][0].value === squares[i][1].value && squares[i][1].value === squares[i][2].value) {
        return setWinner(squares[i][0].value);  //winning by a row       //here i is row
      }
      if(squares[0][i].value && squares[0][i].value === squares[1][i].value && squares[1][i].value === squares[2][i].value) {
        return setWinner(squares[0][i].value);  //winning by a column    //here i is column
      }

      // Handling in case of Ties // Using i as row, j as column
      for(let j = 0; j < 3; j++) {
        if (!squares[i][j].value) {
          emptySquares += 1
        }
      }
    }
    
    // Handling in case of Ties
    if(!emptySquares) {                         
      return setWinner('X and Y. It\'s a TIE!');
    }
  }


  const resetGame = () => {
    setSquares(generateSquares());
    setPlayer(PLAYER_1);
    setWinner(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2> {winner ? `The winner is Player ${winner}` : `Your turn, Player ${currentPlayer}`}</h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={handleClickMove}/>
      </main>
    </div>
  );
}

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';

const generateSquares = () => {
  const squares = [];
  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }

  return squares;
}

export default App;

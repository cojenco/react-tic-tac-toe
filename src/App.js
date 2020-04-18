import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

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

const App = () => {
  const [squares, setSquares] = useState(generateSquares());
  const [currentPlayer, setPlayer] = useState(PLAYER_1);
  const [winner, setWinner] = useState(null);
  
  // Wave 2 
  const handleClickMove = (squareID) => {
    const row = Math.floor(squareID / 3);  //row# = id / total#columns
    const col = squareID % 3;              //col# = id % total#colimns

    if (!winner && squares[row][col].value === '') {
      const newSquaresState = [...squares];  //make shallow copy with spread operator
      newSquaresState[row][col].value = currentPlayer;

      if (currentPlayer === PLAYER_1) {
        setPlayer(PLAYER_2);
      } else {
        setPlayer(PLAYER_1);
      }
      setSquares(newSquaresState);
    }

    checkForWinner(squares);
  }


  const checkForWinner = (squares) => {
    // Complete in Wave 3
    if (squares[1][1].value !== '' && squares[0][0].value === squares[1][1].value && squares[1][1].value === squares[2][2].value) {
      setWinner(squares[1][1].value);  //winning by diagonal right
    } else if (squares[1][1].value !== '' && squares[0][2].value === squares[1][1].value && squares[1][1].value === squares[2][0].value) {
      setWinner(squares[1][1].value);  //winning by diagonal left
    } 

    for(let i = 0; i < 3; i++) {
      if(squares[i][0].value !== '' && squares[i][0].value === squares[i][1].value && squares[i][1].value === squares[i][2].value) {
        setWinner(squares[i][0].value);  //winning by a row       //here i is row
      }
      if(squares[0][i].value !== '' && squares[0][i].value === squares[1][i].value && squares[1][i].value === squares[2][i].value) {
        setWinner(squares[0][i].value);  //winning by a column    //here i is column
      }
    }
    // for(let row = 0; row < 3; row++) {
    //   if(squares[row][0].value === squares[row][1].value && squares[row][1].value === squares[row][2].value) {
    //     setWinner(squares[row][0].value);
    //   }
    // }

    // for(let col = 0; col < 3; col++) {
    //   if(squares[0][col].value === squares[1][col].value && squares[row][1].value === squares[row][2].value) {
    //     setWinner(squares[row][0].value);
    //   }
    // }
  }

  const resetGame = () => {
    // Complete in Wave 4
    setSquares(generateSquares());
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

export default App;

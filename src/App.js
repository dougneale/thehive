import React, { useEffect } from 'react';
import useGame from './useGame'
import './App.css';

function App() {

  const { gameState, setUpGame, playMyNumber, setAi, checkGame} = useGame()

  useEffect(() => {
    if (gameState.status === 'in_progress') {
      checkGame()
      return setAi()
    }
  }, [gameState])

  return (
    <div className="App">
      <header className="App-header">
        <p>AI number: {gameState.aiNumbers[0]} </p>
        <p>Table: {gameState.tableNumber}</p>
        <p>My Number: {gameState.myNumbers[0]}</p>
      <button onClick={playMyNumber} disabled={!gameState.myNumbers.length || gameState.status != 'in_progress'}> Play number</button>
      <button onClick={setUpGame}>Reset</button>
      <p>{gameState.status}</p>
      </header>
    </div>
  );
}

export default App;

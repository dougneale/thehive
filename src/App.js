import React, { useReducer, useEffect } from 'react';
import './App.css';

const getNumber = () => {
  const number = Math.ceil(Math.random() * 100)
  console.log(number)
  return number
}

const defaultState = {
  status: 'setting_up',
  tableNumber: 0,
  myNumbers: [getNumber()],
  aiNumbers: [getNumber()]
}

const gameReducer = (gameState, action) => {
  if(action.type === 'set_game') {
    return defaultState
  }
  if(action.type === 'start_game') {
    return {
      ...gameState,
      status: 'in_progress'
    }
  }
  if (action.type === 'play_my_number') {
    return {
      ...gameState,
      tableNumber: gameState.myNumbers[0],
      myNumbers: gameState.myNumbers.slice(1),
    }
  }
  if (action.type === 'play_ai_number') {
    return {
      ...gameState,
      tableNumber: gameState.aiNumbers[0],
      aiNumbers: gameState.aiNumbers.slice(1),
    }
  }
  if (action.type === 'game_won') {
    return {
      ...gameState,
      status: 'game_won'
    }
  }
  if (action.type === 'game_lost') {
    return {
      ...gameState,
      status: 'game_lost'
    }
  }
  return gameState
}

function App() {
  const [ gameState, dispatch ] = useReducer(gameReducer, defaultState)

  useEffect(() => {
    if (gameState.status === 'setting_up') {
      initAi()
      dispatch({type: 'start_game'})
    } else if (gameState.status === 'in_progress') {
      checkGame()
    }
  }, [gameState])


  const initAi = () => {
    window.setTimeout(playAiNumber, 2000)
  }

  const checkGame = () => {
    console.log(gameState)
    if (
      (gameState.myNumbers.length && (gameState.tableNumber > gameState.myNumbers[0])) || 
      (gameState.aiNumbers.length && (gameState.tableNumber > gameState.aiNumbers[0]))) {
      dispatch({type: 'game_lost'})
    } else if (!gameState.myNumbers.length && !gameState.aiNumbers.length) {
      dispatch({type: 'game_won'})
    }
  }

  const setUpGame = () => {
    dispatch({type: 'set_game'})
  }

  const playMyNumber = () => {
    dispatch({type: 'play_my_number'})
  }

  const playAiNumber = () => {
    console.log('playing ai')
    dispatch({type: 'play_ai_number'})
  }

  return (
    <div className="App">
      <header className="App-header">
        <p> AI number: {gameState.aiNumbers[0]} </p>
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

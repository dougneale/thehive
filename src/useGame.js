import { useReducer } from 'react'
import { setTimer, resetTimer} from './timer'
import gameReducer, { initGame } from './gameReducer'

const useGame = () => {
  const [ gameState, dispatch ] = useReducer(gameReducer, undefined, initGame)


  const setAi = () => {
    if (gameState.aiNumbers.length) {
      const timer = setTimer(playAiNumber, 2000)
      return () => resetTimer(timer)
    }
  }

  const checkGame = () => {
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
    dispatch({type: 'play_ai_number'})
  }

  return {
    gameState,
    setAi,
    checkGame,
    setUpGame,
    playMyNumber,
    playAiNumber,
  }

}

export default useGame
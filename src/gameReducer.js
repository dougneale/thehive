import { getNumber } from './numbers' 

export const initGame = () => {
  return {
    status: 'in_progress',
    tableNumber: 0,
    myNumbers: [getNumber()],
    aiNumbers: [getNumber()]
  }
}

const gameReducer = (gameState, action) => {
  if(action.type === 'set_game') {
    return initGame()
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

export default gameReducer
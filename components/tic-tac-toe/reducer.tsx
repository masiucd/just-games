import {Action, State} from "./types"

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_SQUARE":
      return {
        ...state,
        isX: !state.isX,
        squares: action.newSquares,
      }

    case "SET_WINNING_SYMBOL":
      return {
        ...state,
        winner: action.winningSymbol,
        gameState: action.newGameState,
        score: {
          ...state.score,
          oScore:
            action.winningSymbol === "O"
              ? state.score.oScore + 1
              : state.score.oScore,
          xScore:
            action.winningSymbol === "X"
              ? state.score.xScore + 1
              : state.score.xScore,
        },
      }

    case "NEW_ROUND":
      return {
        ...state,
        squares: Array(9).fill(null),
        isX: false,
        winner: null,
        gameState: action.newGameState,
        gameSet: action.newGameSet,
      }

    case "SET_FINAL_WINNER":
      return {
        ...state,
        finalWinner: action.winningSymbol,
        gameState: action.newGameState,
      }

    case "RESET_GAME":
      return {
        ...state,
        squares: Array(9).fill(null),
        isX: false,
        winner: null,
        gameState: action.newGameState,
        gameSet: 0,
        amountOfGameSets: 5,
        finalWinner: null,
        score: {
          oScore: 0,
          xScore: 0,
        },
      }
    default:
      throw new Error(`action.type does not exists`)
  }
}

import {
  Action,
  CLOSE_OPTIONS_DIALOG,
  NEW_ROUND,
  OPEN_OPTIONS_DIALOG,
  RESET_GAME,
  SET_AMOUNT_OF_GAME_SET,
  SET_DRAW,
  SET_FINAL_WINNER,
  SET_SQUARE,
  SET_WINNING_SYMBOL,
  State,
} from "./types"

export const setAmountOfGameSets = (amount = 3) => amount
export const AMOUNT_OF_SQUARES = 9

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case SET_SQUARE:
      return {
        ...state,
        isX: !state.isX,
        squares: action.newSquares,
      }

    case SET_WINNING_SYMBOL:
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

    case NEW_ROUND:
      return {
        ...state,
        squares: Array(AMOUNT_OF_SQUARES).fill(null),
        isX: false,
        winner: null,
        isDraw: false,
        gameState: action.newGameState,
        gameSet: action.newGameSet,
      }

    case SET_FINAL_WINNER:
      return {
        ...state,
        finalWinner: action.winningSymbol,
        gameState: action.newGameState,
      }

    case OPEN_OPTIONS_DIALOG:
      return {
        ...state,
        isOptionsDialogOpen: true,
      }
    case CLOSE_OPTIONS_DIALOG:
      return {
        ...state,
        isOptionsDialogOpen: false,
      }

    case SET_AMOUNT_OF_GAME_SET:
      return {
        ...state,
        amountOfGameSets: action.gameSet,
      }
    case SET_DRAW:
      return {
        ...state,
        isDraw: true,
        gameState: action.gameState,
      }
    case RESET_GAME:
      return {
        ...state,
        squares: Array(AMOUNT_OF_SQUARES).fill(null),
        isX: false,
        winner: null,
        gameState: action.newGameState,
        gameSet: 0,
        amountOfGameSets: setAmountOfGameSets(action.gameSets),
        finalWinner: null,
        isDraw: false,
        score: {
          oScore: 0,
          xScore: 0,
        },
      }
    default:
      throw new Error(`action.type does not exists`)
  }
}

export type GameState = "idle" | "game-over" | "final"

export const SET_SQUARE = "SET_SQUARE"
export const SET_WINNING_SYMBOL = "SET_WINNING_SYMBOL"
export const NEW_ROUND = "NEW_ROUND"
export const RESET_GAME = "RESET_GAME"
export const SET_FINAL_WINNER = "SET_FINAL_WINNER"
export const OPEN_OPTIONS_DIALOG = "OPEN_OPTIONS_DIALOG"
export const CLOSE_OPTIONS_DIALOG = "CLOSE_OPTIONS_DIALOG"

export interface State {
  squares: Array<null | string>
  isX: boolean
  winner: null | string
  gameState: GameState
  gameSet: number
  amountOfGameSets: number
  finalWinner: null | string
  isOptionsDialogOpen: boolean
  score: {
    oScore: number
    xScore: number
  }
}

export type Action =
  | {type: "SET_SQUARE"; newSquares: Array<string | null>}
  | {type: "SET_WINNING_SYMBOL"; winningSymbol: string; newGameState: GameState}
  | {type: "NEW_ROUND"; newGameState: GameState; newGameSet: number}
  | {type: "RESET_GAME"; newGameState: GameState; gameSets?: number}
  | {type: "SET_FINAL_WINNER"; newGameState: GameState; winningSymbol: string}
  | {type: "OPEN_OPTIONS_DIALOG"}
  | {type: "CLOSE_OPTIONS_DIALOG"}

export type Dispatch = (action: Action) => void

export type GameState = "idle" | "game-over" | "final"

export interface State {
  squares: Array<null | string>
  isX: boolean
  winner: null | string
  gameState: GameState
  gameSet: number
  amountOfGameSets: number
  finalWinner: null | string
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

import {createContext, FC, useContext, useReducer} from "react"

import {reducer} from "./reducer"
import {Dispatch, State} from "./types"

const TicTacToeState = createContext<State | undefined>(undefined)
const TicTacToeDispatch = createContext<Dispatch | undefined>(undefined)

const TicToeProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, {
    squares: Array(9).fill(null),
    isX: false,
    winner: null,
    gameState: "idle",
    gameSet: 0,
    amountOfGameSets: 3,
    finalWinner: null,
    isOptionsDialogOpen: false,
    score: {
      oScore: 0,
      xScore: 0,
    },
  })
  return (
    <TicTacToeState.Provider value={state}>
      <TicTacToeDispatch.Provider value={dispatch}>
        {children}
      </TicTacToeDispatch.Provider>
    </TicTacToeState.Provider>
  )
}

export default TicToeProvider

export const useTicTacToeState = () => {
  const context = useContext(TicTacToeState)
  if (!context) {
    throw new Error(`Please use useTicTacToeState inside TicToeProvider `)
  }
  return context
}

export const useTicTacToeDispatch = () => {
  const context = useContext(TicTacToeDispatch)
  if (!context) {
    throw new Error(`Please use TicTacToeDispatch inside TicToeProvider `)
  }
  return context
}

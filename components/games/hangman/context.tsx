import {makeList} from "@utils/helpers"
import {createContext, FC, useContext, useReducer} from "react"

export type GameState = "idle" | "win" | "lose" | "final"

export const SELECT_LETTER_UPDATE_LISTS = "SELECT_LETTER_UPDATE_LISTS"
export const SET_INITIAL_STATE = "SET_INITIAL_STATE"
export const NEW_ROUND = "NEW_ROUND"
export const NEW_GAME = "NEW_GAME"

export interface State {
  selectedLetters: Array<string>
  wrongLetters: Array<string>
  playingWord: Array<string>
  initialWord: Readonly<Array<string>> // will stay same all the time
  tries: number
  score: number
  gameSets: number
  gameState: GameState
}

export type Action =
  | {
      type: "SELECT_LETTER_UPDATE_LISTS"
      newSelectedLetters: Array<string>
      newWrongLetters: Array<string>
      newPlayingWord: Array<string>
      hasMatch: boolean
    }
  | {type: "SET_INITIAL_STATE"; word: Array<string>}
  | {type: "NEW_ROUND"; newState: GameState}
  | {type: "SET_WINNER"; newState: GameState}
  | {type: "NEW_GAME"; newState: GameState}
  | {type: "GAME_OVER"; newState: GameState}

type Dispatch = (action: Action) => void

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SELECT_LETTER_UPDATE_LISTS":
      return {
        ...state,
        selectedLetters: action.newSelectedLetters,
        wrongLetters: action.newWrongLetters,
        playingWord: action.newPlayingWord,
        tries: action.hasMatch ? state.tries : state.tries + 1,
      }
    case "SET_INITIAL_STATE":
      return {
        ...state,
        initialWord: action.word,
        playingWord: action.word,
        selectedLetters: makeList<string>(action.word.length, "_"),
      }
    case "GAME_OVER":
      return {
        ...state,
        gameState: action.newState,
      }
    case "SET_WINNER":
      return {
        ...state,
        gameState: action.newState,
      }
    default:
      throw new Error(`action type could not be found!`)
  }
}

const HangmanStateContext = createContext<State | undefined>(undefined)
const HangmanDispatchContext = createContext<Dispatch | undefined>(undefined)

const HangmanProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, {
    selectedLetters: [],
    wrongLetters: [],
    playingWord: [],
    tries: 0,
    score: 0,
    gameSets: 3,
    gameState: "idle",
    initialWord: [],
  })
  return (
    <HangmanStateContext.Provider value={state}>
      <HangmanDispatchContext.Provider value={dispatch}>
        {children}
      </HangmanDispatchContext.Provider>
    </HangmanStateContext.Provider>
  )
}

export default HangmanProvider

export const useHangmanState = () => {
  const context = useContext(HangmanStateContext)
  if (!context) {
    throw new Error("useHangmanState must be within HangmanProvider")
  }
  return context
}
export const useHangmanDispatch = () => {
  const context = useContext(HangmanDispatchContext)
  if (!context) {
    throw new Error("useHangmanDispatch must be within HangmanProvider")
  }
  return context
}

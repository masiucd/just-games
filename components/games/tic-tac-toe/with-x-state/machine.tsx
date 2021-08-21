import {checkWinner} from "@utils/check-winner"
import {makeList} from "@utils/helpers"
import {assign, createMachine} from "xstate"

import {AMOUNT_OF_SQUARES} from "../reducer"

const START_GAME = "START_GAME"
const OPEN_SETTINGS_MODAL = "OPEN_SETTINGS_MODAL"
const SELECT_AMOUNT_OF_SETS = "SELECT_AMOUNT_OF_SETS"
const CLOSE_SETTINGS_MODAL = "CLOSE_SETTINGS_MODAL"
const SELECT_SQUARE = "SELECT_SQUARE"
const SET_WINNER = "SET_WINNER"
const SET_DRAW = "SET_DRAW"
const NEW_GAME = "NEW_GAME"
const NEW_ROUND = "NEW_ROUND"

export type Player = "X" | "O"

interface TicTacToeCtx {
  squares: Array<Player | null>
  isX: boolean
  winner: Player | null
  lastWinner: Player | null
  currentGameSet: number
  amountOfGameSets: number
  hasSelectedSets: boolean
  finalWinner: null | Player
  isSettingsDialogOpen: boolean
  isDraw: boolean
  score: {
    oScore: number
    xScore: number
  }
}

type TicTacToeEvents =
  | {type: "START_GAME"}
  | {type: "SELECT_SQUARE"; index: number}
  | {type: "SET_WINNER"; winner: Player}
  | {type: "SET_DRAW"}
  | {type: "NEW_ROUND"}
  | {type: "NEW_GAME"}
  | {type: "OPEN_SETTINGS_MODAL"}
  | {type: "CLOSE_SETTINGS_MODAL"}
  | {type: "SELECT_AMOUNT_OF_SETS"; sets: number}

export const ticTacToeMachine = createMachine<TicTacToeCtx, TicTacToeEvents>(
  {
    id: "idle",
    initial: "idle",
    context: {
      squares: makeList(AMOUNT_OF_SQUARES, null),
      isX: false,
      winner: null,
      lastWinner: null,
      currentGameSet: 0,
      amountOfGameSets: 3,
      hasSelectedSets: false,
      finalWinner: null,
      isSettingsDialogOpen: false,
      isDraw: false,
      score: {
        oScore: 0,
        xScore: 0,
      },
    },
    states: {
      idle: {
        entry: ["resetContext"],
        on: {
          [START_GAME]: {
            target: "start",
          },
          [OPEN_SETTINGS_MODAL]: {
            actions: assign({
              isSettingsDialogOpen: (_) => true,
              hasSelectedSets: (_) => false,
            }),
          },
          [CLOSE_SETTINGS_MODAL]: {
            actions: assign({
              isSettingsDialogOpen: (_) => false,
            }),
          },
          [SELECT_AMOUNT_OF_SETS]: {
            actions: assign({
              amountOfGameSets: (_, {sets}) => sets,
              hasSelectedSets: (_) => true,
            }),
          },
        },
      },
      start: {
        id: "starting",
        initial: "playing",
        states: {
          playing: {
            always: [{target: "finalWinner", cond: "checkForFinalWinner"}],
            on: {
              [SELECT_SQUARE]: {
                actions: assign({
                  squares: ({squares, isX}, {index}) => {
                    if (squares[index] || checkWinner(squares)) return squares
                    const newSquaresList = [...squares]
                    newSquaresList[index] = isX ? "X" : "O"
                    return newSquaresList
                  },
                  isX: ({isX}) => {
                    return !isX
                  },
                }),
              },
              [SET_DRAW]: {
                target: "draw",
              },
              [SET_WINNER]: {
                target: "#starting.winning",
                actions: assign({
                  winner: (_, {winner}) => winner,
                  lastWinner: (_, {winner}) => winner,
                  score: ({score}, {winner}) => ({
                    oScore: winner === "O" ? score.oScore + 1 : score.oScore,
                    xScore: winner === "X" ? score.xScore + 1 : score.xScore,
                  }),
                }),
              },
            },
          },
          winning: {
            on: {
              [NEW_ROUND]: {
                actions: ["incrementGameSet", "setNewSet"],
                target: "playing",
              },
              [NEW_GAME]: {
                target: "#idle",
              },
            },
          },
          draw: {
            on: {
              [NEW_ROUND]: {
                actions: ["incrementGameSet", "setNewSet"],
                target: "playing",
              },
            },
          },
          finalWinner: {
            on: {
              [NEW_GAME]: {
                target: "#idle",
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {
      resetContext: assign((_) => ({
        squares: makeList(AMOUNT_OF_SQUARES, null),
        isX: false,
        winner: null,
        currentGameSet: 0,
        amountOfGameSets: 3,
        finalWinner: null,
        lastWinner: null,
        isSettingsDialogOpen: false,
        isDraw: false,
        score: {
          oScore: 0,
          xScore: 0,
        },
      })),
      setNewSet: assign(({...rest}) => ({
        ...rest,
        squares: makeList(AMOUNT_OF_SQUARES, null),
        isX: false,
        winner: null,
        finalWinner: null,
        isSettingsDialogOpen: false,
        isDraw: false,
      })),
      incrementGameSet: assign({
        currentGameSet: ({currentGameSet}) => currentGameSet + 1,
      }),
    },
    guards: {
      checkForFinalWinner: ({currentGameSet, amountOfGameSets}) =>
        currentGameSet === amountOfGameSets,
    },
  },
)

import AnimatedWrapper from "@components/common/animated-wrapper"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {resetButtonStyles} from "@styles/common"
import {colors} from "@styles/styled-record"
import {checkWinner} from "@utils/check-winner"
import {makeList} from "@utils/helpers"
import {useMachine} from "@xstate/react"
import cuid from "cuid"
import {motion} from "framer-motion"
import {useEffect} from "react"
import {assign, createMachine} from "xstate"

const AMOUNT_OF_SQUARES = 9

const START_GAME = "START_GAME"
const SELECT_SQUARE = "SELECT_SQUARE"
const SET_WINNER = "SET_WINNER"

type Player = "X" | "O"

interface TicTacToeCtx {
  squares: Array<Player | null>
  isX: boolean
  winner: Player | null
  currentGameSet: number
  amountOfGameSets: number
  finalWinner: null | Player
  isOptionsDialogOpen: boolean
  isDraw: boolean
  score: {
    oScore: number
    xScore: number
  }
}

type TicTacToeEvents =
  | {type: "START_GAME"}
  | {type: "SELECT_SQUARE"; index: number}
  | {type: "SET_WINNER"}

const ticTacToeMachine = createMachine<TicTacToeCtx, TicTacToeEvents>({
  id: "idle",
  initial: "idle",
  context: {
    squares: makeList(AMOUNT_OF_SQUARES, null),
    isX: false,
    winner: null,
    currentGameSet: 1,
    amountOfGameSets: 3,
    finalWinner: null,
    isOptionsDialogOpen: false,
    isDraw: false,
    score: {
      oScore: 0,
      xScore: 0,
    },
  },
  states: {
    idle: {
      on: {
        [START_GAME]: {
          target: "start",
        },
      },
    },
    start: {
      id: "starting",
      initial: "playing",
      states: {
        playing: {
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
            [SET_WINNER]: {
              target: "#starting.winning",
            },
          },
        },
        winning: {},
        loosing: {},
        draw: {},
        gameOver: {},
      },
    },
  },
})

const GameWrapper = styled.div``

const squareStyles = css`
  ${resetButtonStyles};
  min-width: 10rem;
  min-height: 10rem;
  background-color: ${colors.colorHighlight};
  font-size: 2em;
`
const Grid = styled(motion.section)`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.125rem;
  max-width: 35rem;
  button {
    ${squareStyles};
  }
`

const TicTacToeWithXState = () => {
  const [state, send] = useMachine(ticTacToeMachine)
  const {squares} = state.context
  const isIdle = state.matches("idle")
  const hasStart = state.matches("start")

  useEffect(() => {
    if (hasStart && checkWinner(squares)) {
      send({type: "SET_WINNER"})
      console.log("WINNER")
    }
  }, [hasStart, send, squares])

  console.log(state.value)
  return (
    <GameWrapper>
      {isIdle && (
        <button onClick={() => send({type: "START_GAME"})}>start</button>
      )}

      <AnimatedWrapper isOn={hasStart}>
        <Grid
          initial={{opacity: 0, scale: 0.65}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.7}}
          transition={{
            delay: 0.15,
            damping: 6,
          }}
        >
          {squares.map((square, index) => (
            <button
              key={cuid()}
              onClick={() => send({type: "SELECT_SQUARE", index})}
            >
              {square}
            </button>
          ))}
        </Grid>
      </AnimatedWrapper>
    </GameWrapper>
  )
}

export default TicTacToeWithXState

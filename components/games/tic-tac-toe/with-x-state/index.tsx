import AnimatedWrapper from "@components/common/animated-wrapper"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {flexColumn, flexRow, resetButtonStyles} from "@styles/common"
import {colors, elevations} from "@styles/styled-record"
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
const SET_DRAW = "SET_DRAW"
const NEW_GAME = "NEW_GAME"
const NEW_ROUND = "NEW_ROUND"

type Player = "X" | "O"

const checkIfDraw = (squares: Array<Player | null>) =>
  squares.filter(Boolean).length === AMOUNT_OF_SQUARES

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
  | {type: "SET_WINNER"; winner: Player}
  | {type: "SET_DRAW"}
  | {type: "NEW_ROUND"}
  | {type: "NEW_GAME"}

const ticTacToeMachine = createMachine<TicTacToeCtx, TicTacToeEvents>(
  {
    id: "idle",
    initial: "idle",
    context: {
      squares: makeList(AMOUNT_OF_SQUARES, null),
      isX: false,
      winner: null,
      currentGameSet: 0,
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
        entry: ["resetContext"],
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
              [SET_DRAW]: {
                target: "draw",
              },
              [SET_WINNER]: {
                target: "#starting.winning",
                actions: assign({
                  winner: (_, {winner}) => winner,
                  score: ({score}, {winner}) => ({
                    oScore: winner === "O" ? score.oScore + 1 : score.oScore,
                    xScore: winner === "X" ? score.xScore + 1 : score.xScore,
                  }),
                }),
              },
            },
          },
          winning: {
            // entry: assign((context) => ({
            //   some: ""
            // })),
            // always: [{target: "gameOver", cond: "isOnFinalAnswer"}],
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
          loosing: {},
          draw: {},
          gameOver: {},
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
        isOptionsDialogOpen: false,
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
        amountOfGameSets: 3,
        finalWinner: null,
        isOptionsDialogOpen: false,
        isDraw: false,
      })),
      incrementGameSet: assign({
        currentGameSet: ({currentGameSet}) => currentGameSet + 1,
      }),
    },
  },
)

const GameWrapper = styled.div`
  max-width: 35rem;
  margin: 0 auto;
  button {
    ${resetButtonStyles};
  }
`

const squareStyles = css`
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

  button {
    ${squareStyles};
  }
`

const ScoreWrapper = styled(motion.div)`
  ${flexRow({justifyContent: "space-evenly"})}
  border-radius: 3px 3px 0 0;
  padding: 1rem 0;
  box-shadow: ${elevations.shadowInner};
  background-color: ${colors.colorGray300};
  p {
    span {
      color: ${colors.colorTextPrimary};
    }
  }
`

const GameSetWrapper = styled.aside`
  ${flexColumn()};
  padding-bottom: 2rem;
  span {
    color: ${colors.colorTextPrimary};
  }
  .buttons {
    ${flexRow({justifyContent: "space-evenly"})};
    width: 100%;
  }
  padding: 1rem 0; ;
`

const TicTacToeWithXState = () => {
  const [state, send] = useMachine(ticTacToeMachine)
  const {
    squares,
    score: {xScore, oScore},
    winner,
    currentGameSet,
    amountOfGameSets,
  } = state.context
  const isIdle = state.matches("idle")
  const hasStart = state.matches("start")
  const hasAnWinner = state.matches("start.winning")

  useEffect(() => {
    const winnerPlayer = checkWinner(squares) as Player | null
    if (hasStart && winnerPlayer) {
      send({type: "SET_WINNER", winner: winnerPlayer})
    }
  }, [hasStart, send, squares])

  useEffect(() => {
    if (checkIfDraw(squares)) {
      send({type: "SET_DRAW"})
    }
  }, [send, squares])

  console.log("value", state.value)
  console.log(state)
  return (
    <GameWrapper>
      {isIdle && (
        <button onClick={() => send({type: "START_GAME"})}>start</button>
      )}

      <AnimatedWrapper isOn={hasStart}>
        <ScoreWrapper
          initial={{opacity: 0, scale: 0.65}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.7}}
          transition={{
            delay: 0.25,
            damping: 4,
          }}
        >
          <p>
            <span>X</span> score: {xScore}{" "}
          </p>
          <p>
            Set {currentGameSet}/{amountOfGameSets}
          </p>
          <p>
            <span>O</span> score: {oScore}{" "}
          </p>
        </ScoreWrapper>
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
      <AnimatedWrapper isOn={hasAnWinner}>
        <GameSetWrapper>
          <h4>
            Winner is <span>{winner}</span>{" "}
          </h4>
          <div className="buttons">
            <button onClick={() => send({type: "NEW_ROUND"})}>New round</button>
            <button>New game</button>
          </div>
        </GameSetWrapper>
      </AnimatedWrapper>
    </GameWrapper>
  )
}

export default TicTacToeWithXState

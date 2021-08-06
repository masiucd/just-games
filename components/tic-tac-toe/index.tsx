import AnimatedWrapper from "@components/common/animated-wrapper"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {flexColumn, resetButtonStyles} from "@styles/common"
import {colors, elevations, sizes} from "@styles/styled-record"
import {checkWinner} from "@utils/check-winner"
import cuid from "cuid"
import {motion} from "framer-motion"
import {Dispatch, Fragment, useEffect, useReducer} from "react"

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.2em;
  max-width: 700px;
  margin: 2rem auto;
  .square {
    border: 2px solid red;
    min-height: 8rem;
    ${resetButtonStyles};
    font-size: 2rem;
    background-color: ${colors.colorTextPrimary};
    color: ${colors.colorHighlight};
    border: 2px solid ${colors.colorTextText};
    box-shadow: ${elevations.shadowLg};
    &:active {
      position: relative;
      top: 6px;
      box-shadow: ${elevations.shadow3Xl};
    }
  }
`
type GameState = "idle" | "game-over"
interface State {
  squares: Array<null | string>
  isX: boolean
  winner: null | string
  gameState: GameState
  gameSet: number
  score: {
    oScore: number
    xScore: number
  }
}

type Action =
  | {type: "SET_SQUARE"; newSquares: Array<string | null>}
  | {type: "SET_WINNING_SYMBOL"; winningSymbol: string; newGameState: GameState}
  | {type: "NEW_ROUND"; newGameState: GameState; newGameSet: number}
  | {type: "RESET_GAME"}

function reducer(state: State, action: Action) {
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

    default:
      throw new Error(`action.type does not exists`)
  }
}

const initialState: State = {
  squares: Array(9).fill(null),
  isX: false,
  winner: null,
  gameState: "idle",
  gameSet: 0,
  score: {
    oScore: 0,
    xScore: 0,
  },
}

const ScoreDisplay = styled.div`
  ${flexColumn()};
  p {
    font-size: ${sizes.h5};
    mark {
      color: ${colors.colorTextPrimary};
      background: none;
    }
  }
`

export const TicTacToe = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const winningSymbol = checkWinner(state.squares)
  console.log("state", state)

  const handleClick = (index: number): void => {
    if (state.squares[index] || state.winner) {
      return
    }
    const newSquares = [...state.squares]
    newSquares[index] = state.isX ? "X" : "O"
    dispatch({type: "SET_SQUARE", newSquares})
  }

  useEffect(() => {
    if (winningSymbol !== null && state.gameState === "idle") {
      dispatch({
        type: "SET_WINNING_SYMBOL",
        winningSymbol,
        newGameState: "game-over",
      })
    }
  }, [state.gameState, winningSymbol])

  return (
    <Fragment>
      <ScoreDisplay>
        <p>
          O Score: <mark>{state.score.oScore}</mark>
        </p>
        <p>
          X Score: <mark>{state.score.xScore}</mark>
        </p>
      </ScoreDisplay>

      <WinningMessage
        winner={state.winner}
        dispatch={dispatch}
        gameSet={state.gameSet}
      />
      <Grid>
        {state.squares.map((square, index) => (
          <button
            onClick={() => {
              handleClick(index)
            }}
            key={cuid()}
            className={`square square${index}`}
          >
            {square}
          </button>
        ))}
      </Grid>
    </Fragment>
  )
}

const ButtonWrapper = styled.div`
  min-width: 12rem;
  display: flex;
  justify-content: space-between;
  gap: 1.45em;
  margin: 0.5rem auto;
  button {
    ${resetButtonStyles};
  }
`

interface Props {
  winner: string | null
  dispatch: Dispatch<Action>
  gameSet: number
}
const WinningMessage = ({winner, dispatch, gameSet}: Props) => (
  <AnimatedWrapper isOn={winner !== null}>
    <motion.section
      layout
      initial={{opacity: 0.75}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      css={css`
        min-height: 5rem;
        display: flex;
        flex-flow: column wrap;
        align-items: center;
        justify-content: center;
        margin: 1.3rem auto;
      `}
    >
      <strong
        css={css`
          font-size: 2rem;
          span {
            color: ${colors.colorTextPrimary};
            border-bottom: 2px solid ${colors.colorHighlight};
          }
        `}
      >
        winner is <span>{winner}</span>
      </strong>
      <ButtonWrapper>
        <button
          onClick={() => {
            const prevGameSet = gameSet
            dispatch({
              type: "NEW_ROUND",
              newGameState: "idle",
              newGameSet: prevGameSet + 1,
            })
          }}
        >
          New round
        </button>
        <button>New game</button>
      </ButtonWrapper>
    </motion.section>
  </AnimatedWrapper>
)

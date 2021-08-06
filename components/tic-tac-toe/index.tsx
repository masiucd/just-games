import styled from "@emotion/styled"
import {resetButtonStyles} from "@styles/common"
import {colors, elevations} from "@styles/styled-record"
import {checkWinner} from "@utils/check-winner"
import cuid from "cuid"
import {Fragment, useEffect, useReducer} from "react"

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

interface State {
  squares: Array<null | string>
  isX: boolean
  winner: null | string
  score: {
    oScore: number
    xScore: number
  }
}

type Action =
  | {type: "SET_SQUARE"; newSquares: Array<string | null>}
  | {type: "SET_WINNING_SYMBOL"; winningSymbol: string}
  | {type: "NEW_ROUND"}
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
      }

    default:
      throw new Error(`action.type does not exists`)
  }
}

const initialState: State = {
  squares: Array(9).fill(null),
  isX: false,
  winner: null,
  score: {
    oScore: 0,
    xScore: 0,
  },
}

export const TicTacToe = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const winningSymbol = checkWinner(state.squares)

  const handleClick = (index: number): void => {
    if (state.squares[index] || state.winner) {
      return
    }
    const newSquares = [...state.squares]
    newSquares[index] = state.isX ? "X" : "O"
    dispatch({type: "SET_SQUARE", newSquares})
  }

  useEffect(() => {
    if (winningSymbol !== null) {
      dispatch({type: "SET_WINNING_SYMBOL", winningSymbol})
    }
  }, [winningSymbol])

  return (
    <Fragment>
      <h3>
        O Score :{state.score.oScore} <br /> X Score: {state.score.xScore}
      </h3>
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

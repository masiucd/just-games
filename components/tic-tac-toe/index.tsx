import styled from "@emotion/styled"
import {flexColumn, resetButtonStyles} from "@styles/common"
import {colors, elevations, sizes} from "@styles/styled-record"
import {checkWinner} from "@utils/check-winner"
import cuid from "cuid"
import {Fragment, useEffect, useReducer} from "react"

import {reducer} from "./reducer"
import Square from "./square"
import WinningMessage from "./winning-message"

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.2em;
  max-width: 700px;
  margin: 0 auto 3rem;
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
  const [state, dispatch] = useReducer(reducer, {
    squares: Array(9).fill(null),
    isX: false,
    winner: null,
    gameState: "idle",
    gameSet: 0,
    amountOfGameSets: 3,
    finalWinner: null,
    score: {
      oScore: 0,
      xScore: 0,
    },
  })
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

  useEffect(() => {
    const isWinner = winningSymbol !== null
    const isOTheWinner = state.score.oScore === state.amountOfGameSets
    const isXTheWinner = state.score.xScore === state.amountOfGameSets
    if ((isOTheWinner || isXTheWinner) && isWinner) {
      dispatch({type: "SET_FINAL_WINNER", newGameState: "final", winningSymbol})
    }
  }, [
    state.amountOfGameSets,
    state.score.oScore,
    state.score.xScore,
    winningSymbol,
  ])

  return (
    <Fragment>
      <WinningMessage
        winner={state.winner}
        dispatch={dispatch}
        gameSet={state.gameSet}
      />
      <ScoreDisplay>
        <p>
          O Score: <mark>{state.score.oScore}</mark>
        </p>
        <p>
          Set: {state.gameSet}/{state.amountOfGameSets}{" "}
        </p>
        <p>
          X Score: <mark>{state.score.xScore}</mark>
        </p>
      </ScoreDisplay>

      <Grid>
        {state.squares.map((square: string | null, index: number) => (
          <Square
            key={cuid()}
            handleClick={handleClick}
            square={square}
            index={index}
          />
        ))}
      </Grid>
    </Fragment>
  )
}

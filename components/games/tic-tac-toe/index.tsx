import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {flexRow, resetButtonStyles} from "@styles/common"
import {colors, elevations, sizes} from "@styles/styled-record"
import {checkWinner} from "@utils/check-winner"
import cuid from "cuid"
import Dynamic from "next/dynamic"
import {Fragment, useEffect} from "react"

import {useTicTacToeDispatch, useTicTacToeState} from "./context"
import {AMOUNT_OF_SQUARES} from "./reducer"
import Square from "./square"
import WinningMessage from "./winning-message"

const OptionsDialog = Dynamic(() => import("./options-dialog"))

const isDraw = (squares: Array<string | null>): boolean =>
  squares.filter(Boolean).length === AMOUNT_OF_SQUARES

const GRID_WIDTH = 45
const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.2em;
  max-width: ${GRID_WIDTH}rem;
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
  ${flexRow({
    incomingStyles: css`
      margin-bottom: 1rem;
      max-width: ${GRID_WIDTH - 20}rem;
      margin: 0 auto 0.5rem;
      justify-content: space-between;
      padding: 0.3em;
    `,
  })};
  p {
    font-size: ${sizes.h5};
    mark {
      color: ${colors.colorTextPrimary};
      background: none;
    }
  }
`

export const TicTacToe = (): JSX.Element => {
  const {squares, winner, isX, gameState, score, amountOfGameSets, gameSet} =
    useTicTacToeState()
  const dispatch = useTicTacToeDispatch()

  const winningSymbol = checkWinner(squares)
  const handleClick = (index: number): void => {
    if (squares[index] || winner) {
      return
    }
    const newSquares = [...squares]
    newSquares[index] = isX ? "X" : "O"
    dispatch({type: "SET_SQUARE", newSquares})
  }

  useEffect(() => {
    if (winningSymbol !== null && gameState === "idle") {
      dispatch({
        type: "SET_WINNING_SYMBOL",
        winningSymbol,
        newGameState: "game-over",
      })
    }
  }, [dispatch, gameState, winningSymbol])

  useEffect(() => {
    const isWinner = winningSymbol !== null
    const isOTheWinner = score.oScore === amountOfGameSets
    const isXTheWinner = score.xScore === amountOfGameSets
    if ((isOTheWinner || isXTheWinner) && isWinner) {
      dispatch({type: "SET_FINAL_WINNER", newGameState: "final", winningSymbol})
    }
  }, [amountOfGameSets, dispatch, score.oScore, score.xScore, winningSymbol])

  useEffect(() => {
    if (isDraw(squares)) {
      dispatch({type: "SET_DRAW", gameState: "draw"})
    }
  }, [dispatch, squares])

  return (
    <Fragment>
      <div id="options" />
      <OptionsDialog />
      <WinningMessage />
      <ScoreDisplay>
        <p>
          O Score: <mark>{score.oScore}</mark>
        </p>
        <p>
          Set: {gameSet}/{amountOfGameSets}{" "}
        </p>
        <p>
          X Score: <mark>{score.xScore}</mark>
        </p>
      </ScoreDisplay>
      <Grid>
        {squares.map((square: string | null, index: number) => (
          <Square
            key={cuid()}
            handleClick={handleClick}
            square={square}
            index={index}
          />
        ))}
      </Grid>

      <button
        css={css`
          ${resetButtonStyles};
          position: absolute;
          left: 2rem;
          bottom: 8rem;
        `}
        disabled={gameState === "final"}
        onClick={() => {
          dispatch({
            type: "OPEN_OPTIONS_DIALOG",
          })
        }}
      >
        Options
      </button>
    </Fragment>
  )
}

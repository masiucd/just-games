import styled from "@emotion/styled"
import {resetButtonStyles} from "@styles/common"
import {colors, elevations} from "@styles/styled-record"
import {checkWinner} from "@utils/check-winner"
import cuid from "cuid"
import {Fragment, useEffect, useState} from "react"

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

export const TicTacToe = (): JSX.Element => {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [isX, setIsX] = useState(false)
  const [winner, setWinner] = useState<null | string>(null)

  const winnerSymbol = checkWinner(squares)

  const handleClick = (index: number): void => {
    if (squares[index] || winner) {
      return
    }
    setSquares((prev) => {
      const xs = [...prev]
      xs[index] = isX ? "X" : "O"
      return xs
    })
    setIsX((prev) => !prev)
  }

  useEffect(() => {
    if (winnerSymbol !== null) {
      setWinner(winnerSymbol)
    }
  }, [winnerSymbol])

  return (
    <Fragment>
      <Grid>
        {squares.map((square, index) => (
          <button
            onClick={(): void => handleClick(index)}
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

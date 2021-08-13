import AnimatedWrapper from "@components/common/animated-wrapper"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {flexColumn, resetButtonStyles} from "@styles/common"
import {colors} from "@styles/styled-record"
import {motion} from "framer-motion"
import {FC} from "react"

import {useTicTacToeDispatch, useTicTacToeState} from "./context"
import {GameState} from "./types"

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

const displayMessage = (gameState: GameState, winner: string | null) => {
  switch (gameState) {
    case "game-over":
      return (
        <p>
          Winner is <span>{winner}</span>{" "}
        </p>
      )
    case "final":
      return (
        <p>
          Final winner is <span>{winner}</span> <br />
          congratulations 🎉
        </p>
      )
    case "draw":
      return (
        <p>
          We got a <span>draw</span>, no point gets delivered
        </p>
      )
    default:
      return ""
  }
}

const WinningMessage: FC = () => {
  const {winner, amountOfGameSets, gameSet, gameState} = useTicTacToeState()
  const dispatch = useTicTacToeDispatch()
  const isFinalState = gameState === "final"
  const isDraw = gameState === "draw"

  return (
    <AnimatedWrapper isOn={winner !== null || isDraw}>
      <motion.section
        layout
        initial={{opacity: 0.75}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        css={css`
          background-color: ${colors.colorBgOverlay};
          ${flexColumn()};
          min-height: 4rem;
          margin: 1.3rem auto;
        `}
      >
        <strong
          css={css`
            font-size: 1.2rem;
            span {
              color: ${colors.colorTextPrimary};
              border-bottom: 2px solid ${colors.colorHighlight};
            }
          `}
        >
          {displayMessage(gameState, winner)}
        </strong>
        <ButtonWrapper>
          <button
            disabled={isFinalState}
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
          <button
            onClick={() => {
              dispatch({
                type: "RESET_GAME",
                newGameState: "idle",
                gameSets: amountOfGameSets,
              })
            }}
          >
            New game
          </button>
        </ButtonWrapper>
      </motion.section>
    </AnimatedWrapper>
  )
}

export default WinningMessage

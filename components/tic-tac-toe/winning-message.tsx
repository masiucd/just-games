import AnimatedWrapper from "@components/common/animated-wrapper"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {flexColumn, resetButtonStyles} from "@styles/common"
import {colors} from "@styles/styled-record"
import {motion} from "framer-motion"
import React, {Dispatch} from "react"

import {Action} from "./types"

interface Props {
  winner: string | null
  dispatch: Dispatch<Action>
  gameSet: number
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

const WinningMessage: React.FC<Props> = ({winner, dispatch, gameSet}) => {
  return (
    <AnimatedWrapper isOn={winner !== null}>
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
          <button
            onClick={() => {
              dispatch({
                type: "RESET_GAME",
                newGameState: "idle",
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

import AnimatedWrapper from "@components/common/animated-wrapper"
import {css} from "@emotion/react"
import {flexColumn, resetButtonStyles} from "@styles/common"
import {borderRadius, colors} from "@styles/styled-record"
import {motion} from "framer-motion"
import React from "react"

interface Props {
  isGameOver: boolean
  newGame: () => void
}

const GameOverDialog: React.FC<Props> = ({isGameOver, newGame}) => (
  <AnimatedWrapper isOn={isGameOver}>
    <motion.div
      initial={{opacity: 0.3, x: -1000}}
      animate={{opacity: 1, x: "-50%", y: "-30%"}}
      exit={{opacity: 0.15, x: 10000}}
      css={css`
        position: absolute;
        top: 50%;
        z-index: 10;
        left: 50%;

        background-color: ${colors.colorBgOverlay2};
        color: ${colors.colorBgBackground};
        min-width: 12em;
        padding: 0.5em;
        border-radius: ${borderRadius.borderRadiusM};
        ${flexColumn()};
        button {
          ${resetButtonStyles};
          font-size: 1em;
        }
      `}
    >
      <h4>Game over 😢</h4>
      <button type="button" onClick={newGame}>
        New game
      </button>
    </motion.div>
  </AnimatedWrapper>
)
export default GameOverDialog

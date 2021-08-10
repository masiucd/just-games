import AnimatedWrapper from "@components/common/animated-wrapper"
import {css} from "@emotion/react"
import {flexColumn, resetButtonStyles} from "@styles/common"
import {sizes} from "@styles/styled-record"
import {motion} from "framer-motion"

import {useHangmanDispatch, useHangmanState} from "./context"

const WinLoseButton = () => {
  const {gameState} = useHangmanState()
  const dispatch = useHangmanDispatch()
  const newGame = () => {
    dispatch({type: "NEW_GAME", newState: "idle"})
  }
  return (
    <AnimatedWrapper isOn={gameState === "lose" || gameState === "win"}>
      <motion.div
        layout
        initial={{opacity: 0.45}}
        animate={{opacity: 1}}
        exit={{opacity: 0.65, x: 1000}}
        transition={{damping: 6}}
        css={css`
          padding: 1rem;
          width: 100%;
          ${flexColumn()};
          p {
            font-size: ${sizes.h4};
            margin-bottom: 1.5rem;
          }
          button {
            ${resetButtonStyles};
          }
        `}
      >
        {gameState === "lose" && <p>Sorry better luck next time</p>}
        {gameState === "win" && <p>Great job! 💪🏻🎉🍾 </p>}
        <button onClick={newGame}>New game</button>
      </motion.div>
    </AnimatedWrapper>
  )
}
export default WinLoseButton

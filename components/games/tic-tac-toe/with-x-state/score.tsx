import styled from "@emotion/styled"
import {flexRow} from "@styles/common"
import {colors, elevations} from "@styles/styled-record"
import {motion} from "framer-motion"
import React from "react"

interface Props {
  xScore: number
  oScore: number
  currentGameSet: number
  amountOfGameSets: number
}

const ScoreWrapper = styled(motion.div)`
  ${flexRow({justifyContent: "space-evenly"})}
  border-radius: 3px 3px 0 0;
  padding: 1rem 0;
  box-shadow: ${elevations.shadowInner};
  background-color: ${colors.colorGray100};
  p {
    span {
      color: ${colors.colorTextPrimary};
    }
  }
`

const Score: React.FC<Props> = ({
  xScore,
  currentGameSet,
  amountOfGameSets,
  oScore,
}) => {
  return (
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
  )
}
export default Score

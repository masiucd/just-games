import AnimatedWrapper from "@components/common/animated-wrapper"
import styled from "@emotion/styled"
import {flexColumn} from "@styles/common"
import {colors} from "@styles/styled-record"
import {motion} from "framer-motion"
import {FC} from "react"

import {Player} from "./machine"

const FinalWinnerWrapper = styled(motion.div)`
  ${flexColumn()};
  padding-bottom: 1rem;
  p {
    span {
      color: ${colors.colorTextPrimary};
      font-weight: bold;
    }
  }
`
interface Props {
  hasFinalWinner: boolean
  lastWinner: Player | null
}
const FinalWinner: FC<Props> = ({hasFinalWinner, lastWinner}) => (
  <AnimatedWrapper isOn={hasFinalWinner}>
    <FinalWinnerWrapper
      initial={{opacity: 0, scale: 0.65}}
      animate={{opacity: 1, scale: 1}}
      exit={{opacity: 0, scale: 0.7}}
      transition={{
        delay: 0.25,
        damping: 4,
      }}
    >
      <h3>Congratulations! 🎉🍾😍 </h3>
      <p>
        Final winner is player <span>{lastWinner}</span>{" "}
      </p>
    </FinalWinnerWrapper>
  </AnimatedWrapper>
)

export default FinalWinner

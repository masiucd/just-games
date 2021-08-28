import AnimatedWrapper from "@components/common/animated-wrapper"
import styled from "@emotion/styled"
import {resetButtonStyles} from "@styles/common"
import {motion} from "framer-motion"
import {FC} from "react"

interface Props {
  isIdle: boolean
  onStart: () => void
}

const Wrapper = styled(motion.div)`
  button {
    ${resetButtonStyles};
  }
`

const IdleActions: FC<Props> = ({isIdle, onStart}) => {
  return (
    <AnimatedWrapper isOn={isIdle}>
      <Wrapper
        initial={{opacity: 0.65}}
        animate={{opacity: 1}}
        exit={{opacity: 0.45}}
      >
        <button onClick={onStart}>Start</button>
      </Wrapper>
    </AnimatedWrapper>
  )
}
export default IdleActions

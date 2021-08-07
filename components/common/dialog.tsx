import {css, SerializedStyles} from "@emotion/react"
import styled from "@emotion/styled"
import {colors} from "@styles/styled-record"
import {motion} from "framer-motion"
import React from "react"

import AnimatedWrapper from "./animated-wrapper"

interface Props {
  isOpen: boolean
  incomingStyles?: SerializedStyles
}

const DialogWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  background-color: ${colors.colorBgOverlay2};
`

const variants = {
  initial: {opacity: 0.5},
  animate: {opacity: 1},
  exit: {opacity: 0.5},
}

const Dialog: React.FC<Props> = ({children, isOpen, incomingStyles}) => {
  return (
    <AnimatedWrapper isOn={isOpen}>
      <DialogWrapper
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        css={css`
          ${incomingStyles};
        `}
      >
        {children}
      </DialogWrapper>
    </AnimatedWrapper>
  )
}
export default Dialog

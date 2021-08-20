import {css, SerializedStyles} from "@emotion/react"
import styled from "@emotion/styled"
import {useHasMounted} from "@hooks/useHasMounted"
import {colors} from "@styles/styled-record"
import {motion} from "framer-motion"
import React from "react"
import {createPortal} from "react-dom"

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
  initial: {opacity: 0.5, scale: 0.65, y: -1000},
  animate: {opacity: 1, scale: 1, y: 0},
  exit: {opacity: 0.35, scale: 0.85, y: -1000},
}

const Dialog: React.FC<Props> = ({children, isOpen, incomingStyles}) => {
  const hasMounted = useHasMounted()
  return hasMounted
    ? createPortal(
        <AnimatedWrapper isOn={isOpen}>
          <DialogWrapper
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            role="dialog"
            transition={{
              delay: 0.15,
              type: "tween",
            }}
            css={css`
              ${incomingStyles};
            `}
          >
            {children}
          </DialogWrapper>
        </AnimatedWrapper>,
        document.body,
      )
    : null
}
export default Dialog

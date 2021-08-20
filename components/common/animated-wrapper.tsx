import {AnimatePresence} from "framer-motion"
import React from "react"

interface Props {
  isOn: boolean
}

const AnimatedWrapper: React.FC<Props> = ({isOn, children}) => (
  <AnimatePresence>{isOn ? children : null}</AnimatePresence>
)
export default AnimatedWrapper

import Dialog from "@components/common/dialog"
import {css, SerializedStyles} from "@emotion/react"
import {motion} from "framer-motion"
import React from "react"

interface Props {
  isOpen: boolean
  incomingStyles?: SerializedStyles
}

const OptionsDialog: React.FC<Props> = ({isOpen, incomingStyles}) => {
  return (
    <Dialog isOpen={isOpen} incomingStyles={incomingStyles}>
      <form></form>
    </Dialog>
  )
}
export default OptionsDialog

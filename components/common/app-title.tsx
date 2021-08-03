import {css, SerializedStyles} from "@emotion/react"
import cuid from "cuid"
import {motion} from "framer-motion"

export const toSpans = (input: string) =>
  input.split("").map((letter) => (
    <motion.span
      whileHover={{scale: 1.1, rotateX: 20, rotateY: 30, y: -2}}
      key={cuid()}
      css={css`
        display: inline-block;
      `}
    >
      {letter}
    </motion.span>
  ))

interface Props {
  incomingStyles?: SerializedStyles
}

const appTitleStyles = css``
const AppTitle = ({incomingStyles}: Props) => {
  return (
    <aside
      css={css`
        ${appTitleStyles};
        ${incomingStyles};
      `}
    >
      <strong>{toSpans("Just Games")}</strong>
    </aside>
  )
}

export default AppTitle

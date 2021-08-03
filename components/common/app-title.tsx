import {css, SerializedStyles} from "@emotion/react"
import {colors} from "@styles/styled-record"
import cuid from "cuid"
import {motion} from "framer-motion"
import Link from "next/link"

export const toSpans = (input: string) =>
  [...input].map((letter) => (
    <motion.span
      className={letter === " " ? "with-white-space" : ""}
      whileHover={{scale: 2, rotateX: 10, rotateY: 10, zIndex: 2}}
      transition={{damping: 6}}
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

const appTitleStyles = css`
  cursor: pointer;
`
const AppTitle = ({incomingStyles}: Props) => {
  return (
    <aside
      css={css`
        ${appTitleStyles};
        ${incomingStyles};
        .with-white-space {
          margin: 0 0.1rem;
        }
        span {
          color: ${colors.colorTextText};
        }
      `}
    >
      <Link href="/">
        <strong>{toSpans("Just Games")}</strong>
      </Link>
    </aside>
  )
}

export default AppTitle

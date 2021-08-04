import {css, SerializedStyles} from "@emotion/react"
import React from "react"

interface Props {
  title?: string
  incomingStyles?: SerializedStyles
}

const styles = css`
  padding: 0.5rem;
  margin-bottom: 1.5rem;
`

const Title: React.FC<Props> = ({children, title, incomingStyles}) => (
  <section
    css={css`
      ${styles};
      ${incomingStyles};
    `}
  >
    {title ? <h1>{title}</h1> : children}
  </section>
)
export default Title

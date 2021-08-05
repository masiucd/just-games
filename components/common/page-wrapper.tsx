import {css, SerializedStyles} from "@emotion/react"
import {sizes} from "@styles/styled-record"
import React from "react"

interface Props {
  incomingStyles?: SerializedStyles
}

const styles = css`
  margin: 1rem 0;
`

const PageWrapper: React.FC<Props> = ({incomingStyles, children}) => {
  return (
    <section
      css={css`
        ${styles};
        ${incomingStyles};
      `}
    >
      {children}
    </section>
  )
}
export default PageWrapper

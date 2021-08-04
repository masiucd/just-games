import {css, SerializedStyles} from "@emotion/react"
import React from "react"

interface Props {
  incomingStyles?: SerializedStyles
}

const styles = css``

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

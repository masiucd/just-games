import {css} from "@emotion/react"
import {colors, sizes} from "@styles/styled-record"

const footerStyles = css`
  height: ${sizes.footerHeight};
  background-color: ${colors.colorGray900};
  color: ${colors.colorBgBackground};
`

const Footer = () => {
  return (
    <footer css={footerStyles}>
      <h1>footer</h1>
    </footer>
  )
}

export default Footer

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
      <p></p>
    </footer>
  )
}

export default Footer

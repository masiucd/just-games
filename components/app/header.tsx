import {css} from '@emotion/react'
import {sizes} from '@styles/styled-record'
import Navbar from './navbar'

const Header = () => {
  return (
    <header
      css={css`
        height: ${sizes.headerHeight};
      `}
    >
      <h1>Header</h1>
      <Navbar />
    </header>
  )
}

export default Header

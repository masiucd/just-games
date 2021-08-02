import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {sizes} from '@styles/styled-record'
import Navbar from './navbar'
import cuid from 'cuid'
import {motion} from 'framer-motion'

const toSpans = (input: string) =>
  input.split('').map((letter) => (
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

const HeaderTitle = styled.div``

const Header = () => {
  return (
    <header
      css={css`
        height: ${sizes.headerHeight};
      `}
    >
      <HeaderTitle>
        <strong>{toSpans('Just Games')}</strong>
      </HeaderTitle>

      <Navbar />
    </header>
  )
}

export default Header

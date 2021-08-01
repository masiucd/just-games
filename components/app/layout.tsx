import {css} from '@emotion/react'
import Head from 'next/head'

import React from 'react'
import {Fragment} from 'react'

interface Props {
  fluid?: boolean
}

const mainStyles = (fluid = false) => css`
  width: ${fluid ? '100%' : sizes.maxWidth};
`

const Layout: React.FC<Props> = ({children, fluid}) => {
  return (
    <Fragment>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&family=Padauk:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main css={mainStyles(fluid)}>{children}</main>
    </Fragment>
  )
}
export default Layout

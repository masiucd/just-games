import {css} from "@emotion/react"
import Head from "next/head"
import React from "react"
import {Fragment} from "react"
import {sizes} from "@styles/styled-record"
import {FOOTER_HEIGHT, GlobalStyles, HEADER_HEIGHT} from "@styles/global-styles"
import Footer from "./footer"
import Header from "./header"

interface Props {
  fluid?: boolean
}

const mainStyles = (fluid = false) => {
  const headerAndFooterHeight = HEADER_HEIGHT + FOOTER_HEIGHT
  return css`
    width: ${fluid ? "100%" : sizes.maxWidth};
    margin: 0 auto;
    min-height: calc(100vh - ${headerAndFooterHeight}rem);
  `
}

const Layout: React.FC<Props> = ({children, fluid}) => (
  <Fragment>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&family=Padauk:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <GlobalStyles />
    <Header />
    <main css={mainStyles(fluid)}>{children}</main>
    <Footer />
  </Fragment>
)
export default Layout

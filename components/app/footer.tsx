import AppTitle from "@components/common/app-title"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {flexColumn, flexRow} from "@styles/common"
import {colors, sizes} from "@styles/styled-record"
import Link from "next/link"

import routes from "../../data/routes.json"

const footerStyles = css`
  min-height: ${sizes.footerHeight};
  background-color: ${colors.colorGray900};
  color: ${colors.colorBgBackground};
  padding: 0.5rem;
  ${flexRow()}
`

const Wrapper = styled.section`
  ${flexColumn()};

  width: 100%;
`

const RoutesList = styled.ul`
  margin-bottom: 1rem;
  width: 35em;
  padding: 1rem 0;
  ${flexRow({justifyContent: "space-evenly"})};
  li {
    a {
      color: ${colors.colorBgBackground};
    }
  }
`

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer css={footerStyles}>
      <Wrapper>
        <AppTitle
          incomingStyles={css`
            border-bottom: 2px solid ${colors.colorHighlight};
            font-size: 2em;
            span {
              &:nth-of-type(3n) {
                color: ${colors.colorTextPrimary};
                opacity: 0.6;
                &:hover {
                  opacity: 1;
                }
              }
            }
          `}
        />
        <RoutesList>
          {routes.map(({name, route}) => (
            <li key={name}>
              <Link href={route}>
                <a>{name}</a>
              </Link>
            </li>
          ))}
        </RoutesList>
        <small>
          &copy;{year}{" "}
          <span
            css={css`
              color: ${colors.colorTextPrimary};
            `}
          >
            Marcell Ciszek
          </span>
          . All Rights Reserved. Built with NextJS.
        </small>
      </Wrapper>
    </footer>
  )
}

export default Footer

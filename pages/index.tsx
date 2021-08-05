import PageWrapper from "@components/common/page-wrapper"
import Title from "@components/common/title"
import styled from "@emotion/styled"
import {resetButtonStyles} from "@styles/common"
import {colors} from "@styles/styled-record"
import Link from "next/link"
import {Fragment} from "react"
const CtaList = styled.ul`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  a {
    ${resetButtonStyles};
    display: inline-block;
    min-width: 5em;
    font-size: 1em;
    text-align: center;
    transition: 200ms ease-out background-color;
    &:hover {
      background-color: ${colors.colorTextPrimary};
      color: ${colors.colorBgBackground};
    }
  }
`

export default function Home(): JSX.Element {
  return (
    <Fragment>
      <PageWrapper>
        <Title>
          <h1>Just games</h1>
          <p>
            Here where we collect different game written in React/Typescript and
            using SQL-lite as a database to collect data and to keep the
            application alive, where you can create a own profile.
          </p>
          <p>Create a profile and keep track of your score</p>
          <p>
            Take some inspiration, make some Pull request if you want to improve
            the implementation.
          </p>
          <p>This is just for fun, and there is only just games</p>
        </Title>
      </PageWrapper>
      <CtaList>
        <Link href="/games">
          <a>Games</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/contact">
          <a>Contact</a>
        </Link>
      </CtaList>
    </Fragment>
  )
}

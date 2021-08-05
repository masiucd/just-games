import PageWrapper from "@components/common/page-wrapper"
import Title from "@components/common/title"
import styled from "@emotion/styled"
import {Fragment} from "react"

const CtaList = styled.ul``

export default function Home() {
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
      <CtaList></CtaList>
    </Fragment>
  )
}

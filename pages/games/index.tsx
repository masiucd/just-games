import {Field, GameSlug} from "@app-types/blog"
import PageWrapper from "@components/common/page-wrapper"
import Title from "@components/common/title"
import GameItem from "@components/game-elements/game-item"
import styled from "@emotion/styled"
import {above} from "@styles/media-query"
import {getAllPosts} from "lib/api"
import {GetStaticProps} from "next"
import {Fragment} from "react"

const GamesList = styled.ul`
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 1fr;
  @media ${above.tablet} {
    grid-template-columns: 1fr 1fr;
  }

  padding: 0.5em;
`

interface Props {
  posts: Record<Field, string | string[]>[]
}

const GamesPage = ({posts}: Props): JSX.Element => {
  return (
    <Fragment>
      <PageWrapper>
        <Title>
          <h1>Games</h1>
        </Title>
        <GamesList>
          {posts.map((post) => (
            <GameItem key={post.slug as GameSlug} post={post} />
          ))}
        </GamesList>
      </PageWrapper>
    </Fragment>
  )
}

export default GamesPage

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(["slug", "title"], "DESC")
  return {
    props: {
      posts,
    },
  }
}

import {FrontMatter} from "@app-types/blog"
import PageWrapper from "@components/common/page-wrapper"
import Title from "@components/common/title"
import GameItem from "@components/game-elements/game-item"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {above} from "@styles/media-query"
import fs from "fs"
import matter from "gray-matter"
import {getAllPosts} from "lib/api"
import {GetStaticProps} from "next"
import path from "path"
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
  frontMatters: FrontMatter[]
}

const GamesPage = ({frontMatters}: Props): JSX.Element => {
  return (
    <Fragment>
      <PageWrapper>
        <Title>
          <h1>Games</h1>
        </Title>
        <GamesList>
          {frontMatters.map((item) => (
            <GameItem key={item.slug} frontMatter={item} />
          ))}
        </GamesList>
      </PageWrapper>
    </Fragment>
  )
}

export default GamesPage

export const getStaticProps: GetStaticProps = async () => {
  const postsPath = path.join(process.cwd(), "posts")
  const posts = fs.readdirSync(postsPath)

  const postContentWithFrontMatter = posts.map((x) => {
    const fileContent = fs.readFileSync(path.join(postsPath, x), "utf-8")
    const {data: frontMatter, content} = matter(fileContent)

    return {
      frontMatter,
      content,
    }
  })

  console.log("getAllPosts()", getAllPosts(["spoiler"], "DESC"))

  return {
    props: {
      frontMatters: postContentWithFrontMatter.map(
        ({frontMatter}) => frontMatter,
      ),
    },
  }
}
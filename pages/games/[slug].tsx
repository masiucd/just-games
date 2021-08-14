import {Field, GameSlug} from "@app-types/blog"
import Title from "@components/common/title"
import BlackJackGame from "@components/games/black-jack"
import Hangman from "@components/games/hangman"
import HangmanProvider from "@components/games/hangman/context"
// import {TicTacToe} from "@components/games/tic-tac-toe"
// import TicToeProvider from "@components/games/tic-tac-toe/context"
import TicTacToeWithXState from "@components/games/tic-tac-toe/with-x-state"
import {css} from "@emotion/react"
import fs from "fs"
import {getPostBySlug} from "lib/api"
import {GetStaticPaths, GetStaticProps} from "next"
import {join} from "path"
import {ParsedUrlQuery} from "querystring"
import {FC, Fragment} from "react"

const renderGame = (slug: GameSlug): JSX.Element => {
  switch (slug) {
    case "quiz":
      return <h1>Quiz</h1>
    case "black-jack":
      return <BlackJackGame />
    case "hangman":
      return (
        <HangmanProvider>
          <Hangman />
        </HangmanProvider>
      )
    case "tic-tac-toe":
      return (
        <TicTacToeWithXState />
        // <TicToeProvider>
        //   <TicTacToe />
        // </TicToeProvider>
      )

    default:
      throw new Error(`No game found with ${slug}`)
  }
}

interface Result {
  postItem: Record<Field, string | string[]>
}

const GameSlugPage: FC<Result> = ({postItem}): JSX.Element => {
  return (
    <Fragment>
      <Title
        incomingStyles={css`
          text-align: center;
          margin-bottom: 1.5rem;
        `}
      >
        <h1>{postItem.title}</h1>
      </Title>
      {renderGame(postItem.slug as GameSlug)}
    </Fragment>
  )
}

export default GameSlugPage

export const getStaticPaths: GetStaticPaths = async () => {
  const postsPath = join(process.cwd(), "posts")
  const postsSlugs = fs
    .readdirSync(postsPath, "utf-8")
    .map((path) => path.replace(/\.mdx$/, ""))
  return {
    paths: postsSlugs.map((slug) => ({params: {slug}})),
    fallback: false,
  }
}

interface QueryParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps<Result, QueryParams> = async ({
  params,
}) => {
  const postSlug = params?.slug + ".mdx"
  const postItem = getPostBySlug(postSlug, ["slug", "content", "tags", "title"])

  return {
    props: {
      postItem,
    },
  }
}

import {TicTacToe} from "@components/tic-tac-toe"
import fs from "fs"
import {GetStaticPaths, GetStaticProps} from "next"
import {useRouter} from "next/dist/client/router"
import {join} from "path"
import {ParsedUrlQuery} from "querystring"

type GameSlug = "quiz" | "hangman" | "black-jack" | "tic-tac-toe"

const renderGame = (slug: GameSlug): JSX.Element => {
  switch (slug) {
    case "quiz":
      return <h1>Quiz</h1>
    case "black-jack":
      return <h1>Black jack</h1>
    case "hangman":
      return <h1>Hangman</h1>
    case "tic-tac-toe":
      return <TicTacToe />
    default:
      throw new Error(`No game found with ${slug}`)
  }
}

const GameSlugPage = (): JSX.Element => {
  const {query} = useRouter()
  return (
    <div>
      <h1>{query.slug}</h1>
      {renderGame(query.slug as GameSlug)}
    </div>
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
interface Result {
  data: any
}

export const getStaticProps: GetStaticProps<Result, QueryParams> = async ({
  params,
}) => {
  const postSlug = params?.slug + ".mdx"

  return {
    props: {
      data: [],
    },
  }
}

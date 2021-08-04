import {useRouter} from "next/dist/client/router"
// import games from "../../data/games.json"
// type GameSlug<T extends keyof typeof games> = typeof games

type GameSlug = "quiz" | "hangman" | "black-jack" | "tic-tac-toe"

const renderGame = (slug: GameSlug) => {
  switch (slug) {
    case "quiz":
      return <h1>Quiz</h1>
    case "black-jack":
      return <h1>Black jack</h1>
    case "hangman":
      return <h1>Hangman</h1>
    case "tic-tac-toe":
      return <h1>TicTacToe</h1>

    default:
      throw new Error(`No game found with ${slug}`)
  }
}

const GameSlugPage = () => {
  const {query} = useRouter()
  console.log("query.slug", query.slug)
  return (
    <div>
      <h1>{query.slug}</h1>
      {renderGame(query.slug as GameSlug)}
    </div>
  )
}

export default GameSlugPage

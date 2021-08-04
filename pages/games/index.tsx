import PageWrapper from "@components/common/page-wrapper"
import Title from "@components/common/title"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import Link from "next/link"
import {Fragment} from "react"
// TODO: Just for now. this will be fetched through mdx files
import games from "../../data/games.json"

const GamesList = styled.ul`
  border: 2px solid red;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const GamesPage = () => {
  return (
    <Fragment>
      <PageWrapper>
        <Title>
          <h1>Games</h1>
        </Title>
        <GamesList>
          {games.map((game) => (
            <GameItem key={game.route} game={game} />
          ))}
        </GamesList>
      </PageWrapper>
    </Fragment>
  )
}

interface Props {
  game: {
    name: string
    route: string
  }
}
function GameItem({game: {name, route}}: Props) {
  return (
    <li
      css={css`
        margin-bottom: 0.5rem;
        border: 2px solid red;
        min-width: 12rem;
        text-align: center;
      `}
    >
      <h4>{name}</h4>
      <Link href={`/games/${route}`}>
        <a>→ {name}</a>
      </Link>
    </li>
  )
}

export default GamesPage

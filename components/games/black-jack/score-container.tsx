import {FC} from "react"

import {ActionsButtons, ScoreActionsContainer, ScoreWrapper} from "./styles"

interface Props {
  hasAnWinner: boolean
  hasStand: boolean
  isGameOver: boolean
  dealerScore: number
  playerScore: number
  hit: () => void
  stand: () => void
}

const ScoreContainer: FC<Props> = ({
  hasAnWinner,
  isGameOver,
  dealerScore,
  playerScore,
  hasStand,
  hit,
  stand,
}) => (
  <ScoreActionsContainer>
    <ScoreWrapper>
      <p>
        Dealer score:{" "}
        {hasAnWinner || isGameOver ? dealerScore : "Shh it's secret"}
      </p>
      <p>Player score: {playerScore}</p>
    </ScoreWrapper>
    <ActionsButtons>
      <button type="button" disabled={isGameOver || hasStand} onClick={hit}>
        Hit
      </button>
      <button type="button" disabled={isGameOver || hasStand} onClick={stand}>
        Stand
      </button>
    </ActionsButtons>
  </ScoreActionsContainer>
)
export default ScoreContainer

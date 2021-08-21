import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {flexColumn, flexRow, resetButtonStyles} from "@styles/common"
import {borderRadius, colors, elevations} from "@styles/styled-record"
import {getRandomItemInList} from "@utils/helpers"
import {Fragment, useEffect, useState} from "react"

const GameWrapper = styled.section`
  ${flexColumn()};
  margin-bottom: 1rem; ;
`

const Card = styled.div`
  min-height: 15rem;
  min-width: 15rem;
  border: 2px solid ${colors.colorTextText};
  border-radius: ${borderRadius.borderRadiusM};
  box-shadow: ${elevations.shadowMd};
`

const ScoreActionsContainer = styled.div`
  background-color: ${colors.colorGray200};
  box-shadow: ${elevations.shadowLg};
  width: 100%; ;
`

const ActionsButtons = styled.div`
  ${flexRow()};
  width: 100%;
  button {
    ${resetButtonStyles};
    flex: 1;
    font-size: 1rem;
    border: none;
    transition: 200ms ease-in-out background-color, 200ms ease-out color;
    &:nth-of-type(1) {
      background-color: ${colors.colorTextPrimary};
      color: ${colors.colorBgBackground};
      border-radius: 2px 2px 0 0;
    }
    &:nth-of-type(2) {
      background-color: ${colors.colorHighlight};
      color: ${colors.colorBgBackground};
      border-radius: 0;
    }
    &:nth-of-type(3) {
      background-color: ${colors.colorTextText};
      color: ${colors.colorBgBackground};
      border-radius: 0 0 2px 2px;
    }
    &:hover {
      background-color: ${colors.colorGray400};
      color: ${colors.colorHighlight};
    }
  }
`

const wrapperStyles = css`
  ${flexRow({justifyContent: "flex-start"})};
  width: 100%;
  position: relative;
  border: 2px solid red;
  padding: 3rem 0;
  h4 {
    position: absolute;
    top: 0;
  }
`

const ScoreWrapper = styled.div`
  ${flexRow({justifyContent: "space-between"})};
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 1rem 0;
  p {
    flex: 1;
    ${flexRow()};
  }
`

const DealerWrapper = styled.div`
  ${wrapperStyles};
`

const PlayerWrapper = styled.div`
  ${wrapperStyles};
`

interface Card {
  suit: string
  rank: string
}
const getCard = (): Card => {
  const suits = ["♠", "♣", "❤", "♦"]
  const ranks = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ]

  const suit = getRandomItemInList(suits)
  const rank = getRandomItemInList(ranks)

  return {suit, rank}
}

const convertRank = (rank: string) => {
  switch (rank) {
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      return Number(rank)
    case "10":
    case "J":
    case "Q":
    case "K":
      return 10
    case "A":
      return 11
    default:
      return 0
  }
}

const calculatePoints = (hand: Array<Card>): number => {
  let res = 0
  const handCopy = [...hand]

  if (handCopy.length > 0) {
    const value = convertRank(handCopy[handCopy.length - 1].rank)
    res += value
  }
  return res
}

const BlackJackGame = () => {
  const [playersHand, setPlayersHand] = useState<Array<Card>>([])
  const [dealersHand, setDealersHand] = useState<Array<Card>>([])
  const [playersPoints, setPlayersPoints] = useState(0)
  const [dealersPoints, setDealersPoints] = useState(0)

  useEffect(() => {
    setPlayersPoints((p) => calculatePoints(playersHand) + p)
  }, [playersHand])

  console.log("playerHand", playersHand)
  console.log("playersPoints", playersPoints)

  return (
    <Fragment>
      <GameWrapper>
        <DealerWrapper>
          <h4>Dealers hand</h4>
          <Card>
            <p>back</p>
          </Card>
          <Card
            css={css`
              margin-left: 0.5em;
            `}
          >
            <p>card 1</p>
          </Card>
        </DealerWrapper>
        <ScoreActionsContainer>
          <ScoreWrapper>
            <p>Dealer score: {dealersPoints}</p>
            <p>Player score: {playersPoints}</p>
          </ScoreWrapper>
          <ActionsButtons>
            <button>Deal</button>
            <button
              disabled={playersPoints > 21}
              onClick={() => {
                setPlayersHand((p) => [...p, getCard()])
                setDealersHand((p) => [...p, getCard()])

                // setPlayersPoints((p) => calculatePoints(playersHand) + p)
                // setDealersPoints(calculatePoints(dealersHand))
              }}
            >
              Hit
            </button>
            <button>Stand</button>
          </ActionsButtons>
        </ScoreActionsContainer>
        <PlayerWrapper>
          <h4>Player hand</h4>
          <Card
            css={css`
              margin-left: 0.5em;
            `}
          >
            <p>card 1</p>
          </Card>
        </PlayerWrapper>
      </GameWrapper>
    </Fragment>
  )
}

export default BlackJackGame

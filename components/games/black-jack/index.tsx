import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {flexColumn, flexRow, resetButtonStyles} from "@styles/common"
import {borderRadius, colors, elevations} from "@styles/styled-record"
import {getRandomInt, getRandomItemInList, getTail, len} from "@utils/helpers"
import cuid from "cuid"
import {motion} from "framer-motion"
import {Fragment, useEffect, useState} from "react"

const GameWrapper = styled.section`
  ${flexColumn()};
  margin-bottom: 1rem; ;
`

const Card = styled(motion.div)`
  position: relative;
  min-height: 15rem;
  min-width: 15rem;
  border: 2px solid ${colors.colorTextText};
  border-radius: ${borderRadius.borderRadiusM};
  box-shadow: ${elevations.shadowMd};
  background-color: ${colors.colorTextWhite};
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
  ${flexRow({justifyContent: "center"})};
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
  position: relative;
  min-height: 21rem;
`

interface CardType {
  suit: string
  rank: string
}
const getCard = (): CardType => {
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

const calculatePoints = (hand: Array<CardType>): number => {
  let res = 0
  const handCopy = [...hand]
  if (len(handCopy) > 0) {
    const value = convertRank(getTail(handCopy).rank)
    res += value
  }
  return res
}

const renderCard = (hand: Array<CardType>) =>
  hand.map(({suit, rank}) => (
    <Card
      key={cuid()}
      initial={{opacity: 0.5, scale: 0.65}}
      animate={{rotate: getRandomInt(30), opacity: 1, scale: 1}}
      css={css`
        /* margin-left: 0.5em; */
        position: absolute;
      `}
    >
      <span
        css={css`
          position: absolute;
          top: -0.5rem;
          left: 0.3rem;
          font-size: 1.5em;
        `}
      >
        {suit}
      </span>
      <span
        css={css`
          position: absolute;
          bottom: 0;
          right: 0.5rem;
          font-size: 1.5em;
        `}
      >
        {rank}
      </span>
    </Card>
  ))
// const renderCard = (hand: Array<Card>) => {
//   const lastCard = getTail(hand)
//   return (
//     <Card
//       css={css`
//         margin-left: 0.5em;
//       `}
//     >
//       <span
//         css={css`
//           position: absolute;
//           top: -0.5rem;
//           left: 0.3rem;
//           font-size: 1.5em;
//         `}
//       >
//         {lastCard.suit}
//       </span>
//       <span
//         css={css`
//           position: absolute;
//           bottom: 0;
//           right: 0.5rem;
//           font-size: 1.5em;
//         `}
//       >
//         {lastCard.rank}
//       </span>
//     </Card>
//   )
// }

const BlackJackGame = () => {
  const [playersHand, setPlayersHand] = useState<Array<CardType>>([])
  const [dealersHand, setDealersHand] = useState<Array<CardType>>([])
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
          {playersHand.length > 0 && renderCard(playersHand)}
        </PlayerWrapper>
      </GameWrapper>
    </Fragment>
  )
}

export default BlackJackGame

import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {borderRadius, colors, elevations} from "@styles/styled-record"
import {getRandomInt, getRandomItemInList} from "@utils/helpers"
import cuid from "cuid"
import {motion} from "framer-motion"

export interface CardType {
  suit: string
  rank: string
}

export const calculateScore = (hand: Array<CardType>): number => {
  let res = 0
  const handCopy = [...hand]
  for (const {rank} of handCopy) {
    res += convertRank(rank)
  }

  return res
}

export const getCard = (): CardType => {
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

const Card = styled(motion.div)`
  position: relative;
  min-height: 15rem;
  min-width: 15rem;
  border: 2px solid ${colors.colorBgBlack};
  border-radius: ${borderRadius.borderRadiusM};
  box-shadow: ${elevations.shadowMd};
  background-color: ${colors.colorTextWhite};
  color: ${colors.colorBgBlack};
`

const CardElement = styled.span`
  position: absolute;
  font-size: 1.5em;
`

export const renderCard = (hand: Array<CardType>, rotate = true) =>
  hand.map(({suit, rank}) => (
    <Card
      key={cuid()}
      initial={{opacity: 0.5, scale: 0.65}}
      animate={{rotate: rotate ? getRandomInt(20) : 0, opacity: 1, scale: 1}}
      css={css`
        position: absolute;
      `}
    >
      <CardElement
        css={css`
          top: -0.2rem;
          left: 0.3rem;
        `}
      >
        {suit}
      </CardElement>
      <CardElement
        css={css`
          bottom: 0;
          right: 0.5rem;
        `}
      >
        {rank}
      </CardElement>
    </Card>
  ))

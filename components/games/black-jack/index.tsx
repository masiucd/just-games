import AnimatedWrapper from "@components/common/animated-wrapper"
import Dialog from "@components/common/dialog"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {flexColumn, flexRow, resetButtonStyles} from "@styles/common"
import {borderRadius, colors, elevations} from "@styles/styled-record"
import {getRandomInt, getRandomItemInList, getTail} from "@utils/helpers"
import {useMachine} from "@xstate/react"
import cuid from "cuid"
import {motion} from "framer-motion"
import React, {Fragment} from "react"
import {assign, createMachine} from "xstate"

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

const calculateScore = (hand: Array<CardType>): number => {
  let res = 0
  const handCopy = [...hand]
  for (const {rank} of handCopy) {
    res += convertRank(rank)
  }

  return res
}

const START = "START"
const HIT = "HIT"
const SET_STAND = "SET_STAND"
const NEW_GAME = "NEW_GAME"
const CHANGE_A_CARD_VALUE = "CHANGE_A_CARD_VALUE"
const CLOSE_CHANGE_CARD_VALUE_DIALOG = "CLOSE_CHANGE_CARD_VALUE_DIALOG"
interface Context {
  playersHand: Array<CardType>
  dealersHand: Array<CardType>
  playerScore: number
  dealerScore: number
  hitCount: number
  canChangeCardValue: boolean
  wantToChangeCardValue: boolean
}
type BlackJackEvents =
  | {type: typeof START}
  | {type: typeof HIT}
  | {type: typeof SET_STAND}
  | {type: typeof NEW_GAME}
  | {type: typeof CHANGE_A_CARD_VALUE}
  | {type: typeof CLOSE_CHANGE_CARD_VALUE_DIALOG}

const blackJackMachine = createMachine<Context, BlackJackEvents>(
  {
    id: "idle",
    initial: "idle",
    context: {
      playersHand: [],
      dealersHand: [],
      playerScore: 0,
      dealerScore: 0,
      hitCount: 0,
      canChangeCardValue: false,
      wantToChangeCardValue: false,
    },
    states: {
      idle: {
        entry: "resetContext",
        on: {
          [START]: {
            target: "start",
          },
        },
      },
      start: {
        id: "start",
        initial: "playing",
        states: {
          playing: {
            always: [{target: "gameOver", cond: "hasOverTwentyOne"}],
            entry: [
              "hit",
              "calculatePlayerScore",
              "setDealersHand",
              "calculateDealersScore",
              "checkIfA",
            ],
            on: {
              [HIT]: {
                actions: ["hit", "calculatePlayerScore", "checkIfA"],
              },
              [SET_STAND]: {
                target: "stand",
              },
              [CLOSE_CHANGE_CARD_VALUE_DIALOG]: {
                actions: assign({
                  canChangeCardValue: (_) => false,
                }),
              },
              [CHANGE_A_CARD_VALUE]: {
                actions: "changeACardValue",
              },
            },
          },
          stand: {
            entry: ["hitDealersHand", "calculateDealersScore"],
          },
          win: {},
          gameOver: {
            on: {
              [NEW_GAME]: {
                target: "#idle",
              },
            },
          },
        },
      },
    },
  },
  {
    guards: {
      hasOverTwentyOne: ({playerScore}) => playerScore > 21,
    },
    actions: {
      resetContext: assign({
        playersHand: (_) => [],
        dealersHand: (_) => [],
        playerScore: (_) => 0,
        dealerScore: (_) => 0,
        hitCount: (_) => 0,
        canChangeCardValue: (_) => false,
        wantToChangeCardValue: (_) => false,
      }),
      hit: assign({
        playersHand: ({playersHand}) => [...playersHand, getCard()],
        hitCount: ({hitCount}) => hitCount + 1,
      }),

      checkIfA: assign({
        canChangeCardValue: ({playersHand}) => {
          const tail = getTail(playersHand)
          return tail.rank === "A"
        },
      }),

      setDealersHand: assign({
        dealersHand: ({dealersHand}) => [...dealersHand, getCard(), getCard()],
      }),
      calculatePlayerScore: assign({
        playerScore: ({playersHand}) => calculateScore(playersHand),
      }),
      calculateDealersScore: assign({
        dealerScore: ({dealersHand}) => calculateScore(dealersHand),
      }),

      changeACardValue: assign({
        playerScore: ({playerScore}) => playerScore - 10,
        canChangeCardValue: (_) => false,
      }),
      hitDealersHand: assign({
        dealersHand: ({dealersHand, hitCount}) => {
          const amountOfNewCard = getRandomInt(hitCount + 1)
          const newCards = Array(amountOfNewCard).fill(getCard())
          return [...dealersHand, ...newCards]
        },
      }),
    },
  },
)

const GameWrapper = styled(motion.section)`
  ${flexColumn()};
  margin-bottom: 1rem;
`

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

const IdleActions = styled(motion.div)`
  button {
    ${resetButtonStyles};
  }
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
      background-color: ${colors.colorTextText};
      color: ${colors.colorBgBackground};
      border-radius: 0;
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
  padding: 3rem 0;
  position: relative;
  min-height: 23rem;
  background-color: ${colors.colorHighlight};
  color: ${colors.colorBgBackground};
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

interface CardType {
  suit: string
  rank: string
}

const CardElement = styled.span`
  position: absolute;
  font-size: 1.5em;
`

const renderCard = (hand: Array<CardType>, rotate = true) =>
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

const BlackJackGame = () => {
  const [state, send] = useMachine(blackJackMachine)
  const {
    dealerScore,
    dealersHand,
    playersHand,
    playerScore,
    canChangeCardValue,
  } = state.context

  const isIdle = state.matches("idle")
  // const isPlaying = state.matches("start.playing")
  const isGameOver = state.matches("start.gameOver")
  const hasStand = state.matches("start.stand")
  console.log(state.value)
  // console.log(state.context)
  console.log({playersHand, playerScore, dealersHand, canChangeCardValue})
  return (
    <Fragment>
      <Dialog
        isOpen={canChangeCardValue && !isGameOver}
        incomingStyles={css`
          ${flexRow()};
        `}
      >
        <section
          css={css`
            background-color: ${colors.colorBgBackground};
            padding: 1rem;
            ${flexColumn()};
            span {
              color: ${colors.colorTextPrimary};
              font-weight: bold;
            }

            button {
              ${resetButtonStyles};
              background-color: ${colors.colorHighlight};
              color: ${colors.colorBgBackground};
            }
          `}
        >
          <p>
            You got an <span>A</span> you can keep the value 11 or change it to
            1{" "}
          </p>
          <p>it us your choice.</p>
          <div
            className="buttons"
            css={css`
              padding: 0.65rem 0;
              width: 100%;
              ${flexRow({justifyContent: "space-evenly"})};
              span {
                color: ${colors.colorGray400};
              }
            `}
          >
            <button
              onClick={() => {
                send({type: CHANGE_A_CARD_VALUE})
              }}
            >
              Change to <span>1</span>
            </button>
            <button
              onClick={() => {
                send({type: CLOSE_CHANGE_CARD_VALUE_DIALOG})
              }}
            >
              Keep value <span>11</span>
            </button>
          </div>
        </section>
      </Dialog>

      <AnimatedWrapper isOn={isGameOver}>
        <motion.div
          initial={{opacity: 0.3, x: -1000}}
          animate={{opacity: 1, x: "-50%", y: "-30%"}}
          exit={{opacity: 0.15, x: 10000}}
          css={css`
            position: absolute;
            top: 50%;
            z-index: 10;
            left: 50%;
            /* transform: translate(-50%, -50%);

            transform: translate(-50%, 0); */

            background-color: ${colors.colorBgOverlay2};
            color: ${colors.colorBgBackground};
            min-width: 12em;
            padding: 0.5em;
            border-radius: ${borderRadius.borderRadiusM};
            ${flexColumn()};
            button {
              ${resetButtonStyles};
              font-size: 1em;
            }
          `}
        >
          <h4>Game over 😢</h4>
          <button
            type="button"
            onClick={() => {
              send({type: "NEW_GAME"})
            }}
          >
            New game
          </button>
        </motion.div>
      </AnimatedWrapper>
      <AnimatedWrapper isOn={isIdle}>
        <IdleActions
          initial={{opacity: 0.65}}
          animate={{opacity: 1}}
          exit={{opacity: 0.45}}
        >
          <button
            onClick={() => {
              send({type: START})
            }}
          >
            Start
          </button>
        </IdleActions>
      </AnimatedWrapper>

      <AnimatedWrapper isOn={!isIdle}>
        <GameWrapper
          initial={{opacity: 0.45}}
          animate={{opacity: 1}}
          exit={{opacity: 0.65}}
        >
          <DealerWrapper>
            <h4>Dealers hand</h4>
            {renderCard(dealersHand, false)}
          </DealerWrapper>
          <ScoreActionsContainer>
            <ScoreWrapper>
              {/* TODO: hide dealers score when playing */}
              <p>Dealer score: {dealerScore}</p>
              <p>Player score: {playerScore}</p>
            </ScoreWrapper>
            <ActionsButtons>
              <button
                type="button"
                disabled={isGameOver || hasStand}
                onClick={() => {
                  send({type: HIT})
                }}
              >
                Hit
              </button>
              <button
                type="button"
                disabled={isGameOver || hasStand}
                onClick={() => {
                  send({type: SET_STAND})
                }}
              >
                Stand
              </button>
            </ActionsButtons>
          </ScoreActionsContainer>
          <PlayerWrapper>
            <h4>Player hand</h4>
            {renderCard(playersHand)}
          </PlayerWrapper>
        </GameWrapper>
      </AnimatedWrapper>
    </Fragment>
  )
}

export default BlackJackGame

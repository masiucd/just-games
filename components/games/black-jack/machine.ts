import {getRandomInt, getTail} from "@utils/helpers"
import {assign, createMachine} from "xstate"

import {calculateScore, CardType, getCard} from "./utils"

export const START = "START"
export const HIT = "HIT"
export const SET_STAND = "SET_STAND"
export const NEW_GAME = "NEW_GAME"
export const CHANGE_A_CARD_VALUE = "CHANGE_A_CARD_VALUE"
export const CLOSE_CHANGE_CARD_VALUE_DIALOG = "CLOSE_CHANGE_CARD_VALUE_DIALOG"

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

export const blackJackMachine = createMachine<Context, BlackJackEvents>(
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
              "checkIfA",
              "calculatePlayerScore",
              "setDealersHand",
              "calculateDealersScore",
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
            always: [
              {target: "win", cond: "hasWonTheGame"},
              {target: "gameOver", cond: "hasLostTheGame"},
              {target: "draw", cond: "isItDraw"},
            ],
          },
          win: {},
          draw: {},
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
      isItDraw: ({playerScore, dealerScore}) =>
        playerScore === dealerScore || (playerScore > 21 && dealerScore > 21),
      hasWonTheGame: ({dealerScore, playerScore}) => {
        switch (true) {
          case dealerScore > 21 && playerScore <= 21:
            return true
          case playerScore > dealerScore:
            return true
          default:
            return false
        }
      },
      hasLostTheGame: ({dealerScore, playerScore}) => dealerScore > playerScore,
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
        dealersHand: ({dealersHand, hitCount, dealerScore}) => {
          // Just to make it a little bit harder for the player to win
          if (dealerScore <= 15) {
            const amountOfNewCard = getRandomInt(hitCount + 1)
            const newCards = Array(amountOfNewCard).fill(getCard())
            return [...dealersHand, ...newCards]
          }
          return dealersHand
        },
      }),
    },
  },
)

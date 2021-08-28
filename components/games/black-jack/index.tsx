import AnimatedWrapper from "@components/common/animated-wrapper"
import {useMachine} from "@xstate/react"
import {Fragment} from "react"

import CheckForADialog from "./check-for-a-dialog"
import GameOverDialog from "./game-over-dialog"
import IdleActions from "./idle-actions"
import {
  blackJackMachine,
  CHANGE_A_CARD_VALUE,
  CLOSE_CHANGE_CARD_VALUE_DIALOG,
  HIT,
  NEW_GAME,
  SET_STAND,
  START,
} from "./machine"
import ScoreContainer from "./score-container"
import {DealerWrapper, GameWrapper, PlayerWrapper} from "./styles"
import {renderCard} from "./utils"
import WinOrDrawDialog from "./win-or-draw-dialog"

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
  const hasAnWinner = state.matches("start.win")
  const isDraw = state.matches("start.draw")

  const isGameOver = state.matches("start.gameOver")
  const hasStand = state.matches("start.stand")

  return (
    <Fragment>
      <WinOrDrawDialog
        hasAnWinner={hasAnWinner}
        isDraw={isDraw}
        newGame={() => {
          send({type: NEW_GAME})
        }}
        playerScore={playerScore}
        dealerScore={dealerScore}
      />

      <CheckForADialog
        canChangeCardValue={canChangeCardValue}
        isGameOver={isGameOver}
        changeCardValue={() => {
          send({type: CHANGE_A_CARD_VALUE})
        }}
        closeChangeCardValueDialog={() => {
          send({type: CLOSE_CHANGE_CARD_VALUE_DIALOG})
        }}
      />

      <GameOverDialog
        isGameOver={isGameOver}
        newGame={() => {
          send({type: NEW_GAME})
        }}
      />

      <IdleActions
        isIdle={isIdle}
        onStart={() => {
          send({type: START})
        }}
      />

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

          <ScoreContainer
            hasAnWinner={hasAnWinner}
            hasStand={hasStand}
            isGameOver={isGameOver}
            dealerScore={dealerScore}
            playerScore={playerScore}
            hit={() => {
              send({type: HIT})
            }}
            stand={() => {
              send({type: SET_STAND})
            }}
          />
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

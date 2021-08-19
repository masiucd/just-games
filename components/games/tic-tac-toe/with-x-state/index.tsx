import AnimatedWrapper from "@components/common/animated-wrapper"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {flexRow, resetButtonStyles} from "@styles/common"
import {colors, elevations} from "@styles/styled-record"
import {checkWinner} from "@utils/check-winner"
import {useMachine} from "@xstate/react"
import cuid from "cuid"
import {motion} from "framer-motion"
import {useEffect} from "react"

import FinalWinner from "./final-winner"
import GameButtons from "./game-buttons"
import {Player, ticTacToeMachine} from "./machine"
import SettingsDialog from "./settings-dialog"
import StartButtons from "./start-buttons"
import {checkIfDraw} from "./utils"

const GameWrapper = styled.div`
  max-width: 35rem;
  margin: 0 auto;
  position: relative;
  button {
    ${resetButtonStyles};
  }
`

const squareStyles = css`
  min-width: 10rem;
  min-height: 10rem;
  background-color: ${colors.colorHighlight};
  font-size: 2em;
`
const Grid = styled(motion.section)`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.125rem;

  button {
    ${squareStyles};
  }
`

const ScoreWrapper = styled(motion.div)`
  ${flexRow({justifyContent: "space-evenly"})}
  border-radius: 3px 3px 0 0;
  padding: 1rem 0;
  box-shadow: ${elevations.shadowInner};
  background-color: ${colors.colorGray100};
  p {
    span {
      color: ${colors.colorTextPrimary};
    }
  }
`

const TicTacToeWithXState = () => {
  const [state, send] = useMachine(ticTacToeMachine)
  const {
    squares,
    score: {xScore, oScore},
    winner,
    lastWinner,
    currentGameSet,
    amountOfGameSets,
    isSettingsDialogOpen,
  } = state.context
  const isIdle = state.matches("idle")
  const hasStart = state.matches("start")
  const hasAnWinner = state.matches("start.winning")
  const isDraw = state.matches("start.draw")
  const hasFinalWinner = state.matches("start.finalWinner")

  useEffect(() => {
    const winnerPlayer = checkWinner(squares) as Player | null
    if (hasStart && winnerPlayer) {
      send({type: "SET_WINNER", winner: winnerPlayer})
    }
  }, [hasStart, send, squares])

  useEffect(() => {
    if (checkIfDraw(squares)) {
      send({type: "SET_DRAW"})
    }
  }, [send, squares])

  console.log("value", state.value)

  return (
    <GameWrapper>
      <SettingsDialog
        isSettingsDialogOpen={isSettingsDialogOpen}
        closeSettingsDialog={() => send({type: "CLOSE_SETTINGS_MODAL"})}
      />
      <AnimatedWrapper isOn={isIdle}>
        <StartButtons
          openSettingsDialog={() => send({type: "OPEN_SETTINGS_MODAL"})}
          startGame={() => send({type: "START_GAME"})}
        />
      </AnimatedWrapper>

      <FinalWinner
        hasFinalWinner={state.matches("start.finalWinner")}
        lastWinner={lastWinner}
      />

      <AnimatedWrapper isOn={hasStart}>
        <ScoreWrapper
          initial={{opacity: 0, scale: 0.65}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.7}}
          transition={{
            delay: 0.25,
            damping: 4,
          }}
        >
          <p>
            <span>X</span> score: {xScore}{" "}
          </p>
          <p>
            Set {currentGameSet}/{amountOfGameSets}
          </p>
          <p>
            <span>O</span> score: {oScore}{" "}
          </p>
        </ScoreWrapper>
        <Grid
          initial={{opacity: 0, scale: 0.65}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.7}}
          transition={{
            delay: 0.15,
            damping: 6,
          }}
        >
          {squares.map((square, index) => (
            <button
              key={cuid()}
              onClick={() => send({type: "SELECT_SQUARE", index})}
            >
              {square}
            </button>
          ))}
        </Grid>
      </AnimatedWrapper>
      <GameButtons
        hasAnWinner={hasAnWinner}
        isDraw={isDraw}
        hasFinalWinner={hasFinalWinner}
        winner={winner}
        newRound={() => send({type: "NEW_ROUND"})}
        newGame={() => send({type: "NEW_GAME"})}
      />
    </GameWrapper>
  )
}

export default TicTacToeWithXState

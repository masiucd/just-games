import AnimatedWrapper from "@components/common/animated-wrapper"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {resetButtonStyles} from "@styles/common"
import {colors} from "@styles/styled-record"
import {checkWinner} from "@utils/check-winner"
import {useMachine} from "@xstate/react"
import cuid from "cuid"
import {motion} from "framer-motion"
import {useEffect} from "react"

import FinalWinner from "./final-winner"
import GameButtons from "./game-buttons"
import {Player, ticTacToeMachine} from "./machine"
import Score from "./score"
import SettingsDialog from "./settings-dialog"
import Square from "./square"
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
        <Score
          xScore={xScore}
          oScore={oScore}
          currentGameSet={currentGameSet}
          amountOfGameSets={amountOfGameSets}
        />
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
            <Square
              key={cuid()}
              square={square}
              index={index}
              selectSquare={(index: number) => {
                send({type: "SELECT_SQUARE", index})
              }}
            />
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

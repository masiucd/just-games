import AnimatedWrapper from "@components/common/animated-wrapper"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {resetButtonStyles} from "@styles/common"
import {colors} from "@styles/styled-record"
import {makeList} from "@utils/helpers"
import {useMachine} from "@xstate/react"
import cuid from "cuid"
import {motion} from "framer-motion"
import {createMachine} from "xstate"

const AMOUNT_OF_SQUARES = 9

const START_GAME = "START_GAME"
const SELECT_SQUARE = "SELECT_SQUARE"

const ticTacToeMachine = createMachine({
  id: "idle",
  initial: "idle",
  context: {
    squares: makeList(AMOUNT_OF_SQUARES, null),
    isX: false,
    winner: null,
    currentGameSet: 1,
    amountOfGameSets: 3,
    finalWinner: null,
    isOptionsDialogOpen: false,
    isDraw: false,
    score: {
      oScore: 0,
      xScore: 0,
    },
  },
  states: {
    idle: {
      on: {
        [START_GAME]: {
          target: "playing",
        },
      },
    },
    playing: {
      id: "play",
      on: {
        [SELECT_SQUARE]: {
          // actions: () => {}
          actions: "selectSquare",
        },
      },
      states: {
        winning: {},
        loosing: {},
        draw: {},
        gameOver: {},
      },
    },
  },
})

const GameWrapper = styled.div``

const squareStyles = css`
  ${resetButtonStyles};
  min-width: 10rem;
  min-height: 10rem;
  background-color: ${colors.colorHighlight};
`
const Grid = styled(motion.section)`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.125rem;
  max-width: 35rem;
  button {
    ${squareStyles};
  }
`

const TicTacToeWithXState = () => {
  const [value, send] = useMachine(ticTacToeMachine)

  const {squares} = value.context
  const isIdle = value.matches("idle")
  const isPlaying = value.matches("playing")
  return (
    <GameWrapper>
      {isIdle && (
        <button onClick={() => send({type: "START_GAME"})}>start</button>
      )}

      <AnimatedWrapper isOn={isPlaying}>
        <Grid
          initial={{opacity: 0, scale: 0.65}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.7}}
          transition={{
            delay: 0.15,
            damping: 6,
          }}
        >
          {squares.map((square) => (
            <button key={cuid()}>{square}</button>
          ))}
        </Grid>
      </AnimatedWrapper>
    </GameWrapper>
  )
}

export default TicTacToeWithXState

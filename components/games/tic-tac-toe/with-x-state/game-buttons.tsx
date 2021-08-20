import AnimatedWrapper from "@components/common/animated-wrapper"
import styled from "@emotion/styled"
import {flexColumn, flexRow} from "@styles/common"
import {colors} from "@styles/styled-record"
import React from "react"

import {Player} from "./machine"

interface Props {
  hasAnWinner: boolean
  isDraw: boolean
  hasFinalWinner: boolean
  winner: Player | null
  newGame: () => void
  newRound: () => void
}

const GameSetWrapper = styled.aside`
  ${flexColumn()};
  padding-bottom: 2rem;
  span {
    color: ${colors.colorTextPrimary};
  }
  .buttons {
    ${flexRow({justifyContent: "space-evenly"})};
    width: 100%;
  }
  padding: 1rem 0; ;
`

const renderStatus = (isDraw: boolean, winner: Player | null) => {
  if (isDraw) {
    return <h4>We got a draw</h4>
  }
  return (
    <h4>
      Winner is <span>{winner}</span>{" "}
    </h4>
  )
}

const GameButtons: React.FC<Props> = ({
  hasAnWinner,
  isDraw,
  hasFinalWinner,
  winner,
  newGame,
  newRound,
}) => {
  return (
    <AnimatedWrapper isOn={hasAnWinner || isDraw || hasFinalWinner}>
      <GameSetWrapper>
        {renderStatus(isDraw, winner)}
        <div className="buttons">
          <button disabled={hasFinalWinner} onClick={newRound}>
            New round
          </button>
          <button disabled={isDraw} onClick={newGame}>
            New game
          </button>
        </div>
      </GameSetWrapper>
    </AnimatedWrapper>
  )
}
export default GameButtons

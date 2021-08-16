import styled from "@emotion/styled"
import {flexRow} from "@styles/common"
import React from "react"

interface Props {
  startGame: () => void
  openSettingsDialog: () => void
}

const Wrapper = styled.div`
  ${flexRow({justifyContent: "space-evenly"})}
`

const StartButtons: React.FC<Props> = ({startGame, openSettingsDialog}) => {
  return (
    <Wrapper>
      <button onClick={startGame}>Start game</button>
      <button onClick={openSettingsDialog}>Settings</button>
    </Wrapper>
  )
}
export default StartButtons

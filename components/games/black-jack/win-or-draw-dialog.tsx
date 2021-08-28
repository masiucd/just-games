import Dialog from "@components/common/dialog"
import {motion} from "framer-motion"
import {FC} from "react"

interface Props {
  hasAnWinner: boolean
  isDraw: boolean
  playerScore: number
  dealerScore: number
  newGame: () => void
}

const WinOrDrawDialog: FC<Props> = ({
  hasAnWinner,
  isDraw,
  playerScore,
  dealerScore,
  newGame,
}) => (
  <Dialog isOpen={hasAnWinner || isDraw}>
    <motion.section>
      {renderContent(hasAnWinner, playerScore, dealerScore)}
      <div>
        <button onClick={newGame}>New game</button>
      </div>
    </motion.section>
  </Dialog>
)

export default WinOrDrawDialog

const renderContent = (
  hasAnWinner: boolean,
  playerScore: number,
  dealerScore: number,
) => {
  if (hasAnWinner) {
    return <p>congratulations you win with score of {playerScore}</p>
  }
  return (
    <div>
      <p>We got and draw </p>
      <p>You got {playerScore} </p>
      <p>Dealer got {dealerScore} </p>
    </div>
  )
}

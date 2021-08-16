import Dialog from "@components/common/dialog"
import {FC} from "react"

interface Props {
  isSettingsDialogOpen: boolean
  closeSettingsDialog: () => void
}

const SettingsDialog: FC<Props> = ({
  isSettingsDialogOpen,
  closeSettingsDialog,
}) => {
  return (
    <Dialog isOpen={isSettingsDialogOpen}>
      <h1>Hello</h1>
      <button onClick={closeSettingsDialog}>Close</button>
    </Dialog>
  )
}
export default SettingsDialog

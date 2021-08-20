import Dialog from "@components/common/dialog"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {useClickOutside} from "@hooks/click-outside"
import {flexColumn, flexRow, resetButtonStyles} from "@styles/common"
import {borderRadius, colors} from "@styles/styled-record"
import {motion} from "framer-motion"
import {FC, useRef} from "react"

interface Props {
  isSettingsDialogOpen: boolean
  closeSettingsDialog: () => void
}

const Body = styled.div`
  ${flexColumn()};
  position: relative;
  background-color: ${colors.colorBgBackground};
  align-self: center;
  min-width: 40vw;
  min-height: 40vh;
  border-radius: ${borderRadius.borderRadiusM};
  border: 2px solid ${colors.colorTextText};
`

const SettingsDialog: FC<Props> = ({
  isSettingsDialogOpen,
  closeSettingsDialog,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, closeSettingsDialog)
  return (
    <Dialog
      key="settings"
      isOpen={isSettingsDialogOpen}
      incomingStyles={css`
        ${flexRow()};
      `}
    >
      <Body ref={ref}>
        <form>
          <p>Select sets</p>
          <label>
            <span>Sets</span>
          </label>
        </form>

        <motion.button
          whileHover={{scale: 1.065}}
          css={css`
            ${resetButtonStyles};
            position: absolute;
            top: -1.5rem;
            right: -1rem;
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 50%;
            background-color: ${colors.colorTextText};
            color: ${colors.colorBgBackground};
            font-size: 2rem;
          `}
          onClick={closeSettingsDialog}
        >
          X
        </motion.button>
      </Body>
    </Dialog>
  )
}
export default SettingsDialog

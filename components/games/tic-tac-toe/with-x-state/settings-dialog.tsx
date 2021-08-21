import Dialog from "@components/common/dialog"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {useClickOutside} from "@hooks/click-outside"
import {flexColumn, flexRow, resetButtonStyles} from "@styles/common"
import {borderRadius, colors, elevations} from "@styles/styled-record"
import {makeList} from "@utils/helpers"
import {motion} from "framer-motion"
import {ChangeEvent, FC, useRef} from "react"

interface Props {
  isSettingsDialogOpen: boolean
  closeSettingsDialog: () => void
  setAmountOfSets: (e: ChangeEvent<HTMLSelectElement>) => void
  hasSelectedSets: boolean
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

const Form = styled.form`
  width: 100%;
  ${flexColumn()}
`

const FormGroup = styled.div`
  ${flexColumn()}
  margin-bottom: 1.2rem;
  padding: 0.5rem 1rem;
  width: 17rem;
  label {
    margin-right: auto;
  }
`

const Select = styled.select`
  width: 100%;
  outline: none;
  height: 2rem;
  border-radius: ${borderRadius.borderRadiusS};
  border: 2px solid ${colors.colorHighlight};
  &:focus {
    border-color: ${colors.colorTextPrimary};
  }
`

const ConfirmButton = styled.button`
  ${resetButtonStyles};
  background-color: ${colors.colorHighlight};
  color: ${colors.colorBgBackground};
  box-shadow: ${elevations.shadowMd};
  width: 6em;
  transition: background-color 200ms ease-in-out;
  &:hover {
    background-color: ${colors.colorTextPrimary};
    box-shadow: ${elevations.shadowXl};
    color: ${colors.colorTextText};
  }
`

const SettingsDialog: FC<Props> = ({
  isSettingsDialogOpen,
  closeSettingsDialog,
  setAmountOfSets,
  hasSelectedSets,
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
        <p>Choose amount of sets</p>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            closeSettingsDialog()
          }}
        >
          <FormGroup>
            <label>
              <span>Sets</span>
            </label>
            <Select onChange={setAmountOfSets}>
              {makeList(10, 2)
                .map((x, i) => x + i - 1)
                .map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
            </Select>
          </FormGroup>
          <ConfirmButton disabled={!hasSelectedSets} type="submit">
            Confirm
          </ConfirmButton>
        </Form>

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

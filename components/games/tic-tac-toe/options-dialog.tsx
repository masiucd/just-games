import Dialog from "@components/common/dialog"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {useClickOutside} from "@hooks/click-outside"
import {flexColumn, resetButtonStyles} from "@styles/common"
import {borderRadius, colors, elevations} from "@styles/styled-record"
import {makeIntArray, toInt} from "@utils/helpers"
import {motion} from "framer-motion"
import {useRef, useState} from "react"

import {useTicTacToeDispatch, useTicTacToeState} from "./context"

const FormGroup = styled.div`
  ${flexColumn()}
  margin-bottom: 1.2rem;
  padding: 0.5rem 1rem;
  width: 15rem;
  label {
    margin-right: auto;
  }
`

const Select = styled.select`
  width: 100%;
  outline: none;
  height: 2rem;
  border-radius: ${borderRadius.borderRadiusS};
  border: 2px solid ${colors.colorTextText};
  &:focus {
    border-color: ${colors.colorTextPrimary};
  }
`

const ConfirmButton = styled.button`
  ${resetButtonStyles};
  background-color: ${colors.colorTextPrimary};
  color: ${colors.colorBgBackground};
  box-shadow: ${elevations.shadowMd};
  width: 6em;
  transition: background-color 200ms ease-in-out;
  &:hover {
    background-color: ${colors.colorHighlight};
    box-shadow: ${elevations.shadowXl};
  }
`

const OptionsDialog = () => {
  const {isOptionsDialogOpen} = useTicTacToeState()
  const dispatch = useTicTacToeDispatch()
  const [gameSet, setGameSet] = useState(0)
  const ref = useRef(null)
  useClickOutside(ref, () => dispatch({type: "CLOSE_OPTIONS_DIALOG"}))
  return (
    <Dialog
      isOpen={isOptionsDialogOpen}
      incomingStyles={css`
        ${flexColumn()}
      `}
    >
      <motion.form
        ref={ref}
        onSubmit={(e) => {
          e.preventDefault()
          dispatch({type: "SET_AMOUNT_OF_GAME_SET", gameSet})
        }}
        css={css`
          ${flexColumn()};
          position: relative;
          background-color: ${colors.colorBgBackground};
          min-height: 20rem;
          min-width: 20rem;
          border-radius: ${borderRadius.borderRadiusM};
        `}
      >
        <FormGroup>
          <label htmlFor="amountOfGameSets">
            <span>Game sets</span>
          </label>
          <Select
            name="sets"
            id="amountOfGameSets"
            onChange={(e) => {
              setGameSet(toInt(e.target.value))
            }}
          >
            {makeIntArray(9).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
        </FormGroup>

        <ConfirmButton type="submit">Confirm</ConfirmButton>
        <button
          type="button"
          onClick={() => {
            dispatch({type: "CLOSE_OPTIONS_DIALOG"})
          }}
          css={css`
            ${resetButtonStyles};
            position: absolute;
            top: -0.8rem;
            right: -0.7rem;
            font-size: 1rem;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            border: 2px solid ${colors.colorTextPrimary};
            color: ${colors.colorBgBackground};
            background-color: ${colors.colorHighlight};
          `}
        >
          X
        </button>
      </motion.form>
    </Dialog>
  )
}
export default OptionsDialog

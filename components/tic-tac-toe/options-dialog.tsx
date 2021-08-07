import Dialog from "@components/common/dialog"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {flexColumn, resetButtonStyles} from "@styles/common"
import {borderRadius, colors} from "@styles/styled-record"
import {motion} from "framer-motion"
import React from "react"

import {useTicTacToeDispatch, useTicTacToeState} from "./context"

const FormGroup = styled.div``

const OptionsDialog = () => {
  const {isOptionsDialogOpen} = useTicTacToeState()
  const dispatch = useTicTacToeDispatch()
  return (
    <Dialog
      isOpen={isOptionsDialogOpen}
      incomingStyles={css`
        ${flexColumn()}
      `}
    >
      <motion.form
        css={css`
          position: relative;
          background-color: ${colors.colorBgBackground};
          min-height: 20rem;
          min-width: 20rem;
          ${flexColumn()};
          border-radius: ${borderRadius.borderRadiusM};
        `}
      >
        <FormGroup>
          <label htmlFor="amountOfGameSets">
            <span>amount of game sets</span>
          </label>
        </FormGroup>

        <button type="submit">Confirm</button>
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

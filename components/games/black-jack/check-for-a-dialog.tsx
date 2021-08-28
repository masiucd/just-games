import Dialog from "@components/common/dialog"
import {css} from "@emotion/react"
import {flexColumn, flexRow, resetButtonStyles} from "@styles/common"
import {colors} from "@styles/styled-record"
import React from "react"

interface Props {
  canChangeCardValue: boolean
  isGameOver: boolean
  changeCardValue: () => void
  closeChangeCardValueDialog: () => void
}

const CheckForADialog: React.FC<Props> = ({
  canChangeCardValue,
  isGameOver,
  changeCardValue,
  closeChangeCardValueDialog,
}) => (
  <Dialog
    isOpen={canChangeCardValue && !isGameOver}
    incomingStyles={css`
      ${flexRow()};
    `}
  >
    <section
      css={css`
        background-color: ${colors.colorBgBackground};
        padding: 1rem;
        ${flexColumn()};
        span {
          color: ${colors.colorTextPrimary};
          font-weight: bold;
        }

        button {
          ${resetButtonStyles};
          background-color: ${colors.colorHighlight};
          color: ${colors.colorBgBackground};
        }
      `}
    >
      <p>
        You got an <span>A</span> you can keep the value 11 or change it to 1{" "}
      </p>
      <p>it us your choice.</p>
      <div
        className="buttons"
        css={css`
          padding: 0.65rem 0;
          width: 100%;
          ${flexRow({justifyContent: "space-evenly"})};
          span {
            color: ${colors.colorGray400};
          }
        `}
      >
        <button
          // onClick={() => {
          //   send({ type: CHANGE_A_CARD_VALUE });
          // } }
          onClick={changeCardValue}
        >
          Change to <span>1</span>
        </button>
        <button
          onClick={closeChangeCardValueDialog}
          // onClick={() => {
          //   send({ type: CLOSE_CHANGE_CARD_VALUE_DIALOG });
          // } }
        >
          Keep value <span>11</span>
        </button>
      </div>
    </section>
  </Dialog>
)
export default CheckForADialog

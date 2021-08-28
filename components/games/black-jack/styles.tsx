import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {flexColumn, flexRow, resetButtonStyles} from "@styles/common"
import {colors, elevations} from "@styles/styled-record"
import {motion} from "framer-motion"

export const GameWrapper = styled(motion.section)`
  ${flexColumn()};
  margin-bottom: 1rem;
`

export const ScoreActionsContainer = styled.div`
  background-color: ${colors.colorGray200};
  box-shadow: ${elevations.shadowLg};
  width: 100%; ;
`

export const ActionsButtons = styled.div`
  ${flexRow()};
  width: 100%;
  button {
    ${resetButtonStyles};
    flex: 1;
    font-size: 1rem;
    border: none;
    transition: 200ms ease-in-out background-color, 200ms ease-out color;
    &:nth-of-type(1) {
      background-color: ${colors.colorTextPrimary};
      color: ${colors.colorBgBackground};
      border-radius: 2px 2px 0 0;
    }
    &:nth-of-type(2) {
      background-color: ${colors.colorTextText};
      color: ${colors.colorBgBackground};
      border-radius: 0;
    }

    &:hover {
      background-color: ${colors.colorGray400};
      color: ${colors.colorHighlight};
    }
  }
`

export const wrapperStyles = css`
  ${flexRow({justifyContent: "center"})};
  width: 100%;
  padding: 3rem 0;
  position: relative;
  min-height: 23rem;
  background-color: ${colors.colorHighlight};
  color: ${colors.colorBgBackground};
  h4 {
    position: absolute;
    top: 0;
  }
`

export const ScoreWrapper = styled.div`
  ${flexRow({justifyContent: "space-between"})};
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 1rem 0;
  p {
    flex: 1;
    ${flexRow()};
  }
`

export const DealerWrapper = styled.div`
  ${wrapperStyles};
`

export const PlayerWrapper = styled.div`
  ${wrapperStyles};
`

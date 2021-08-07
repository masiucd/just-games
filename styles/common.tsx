import {css, SerializedStyles} from "@emotion/react"

import {borderRadius, colors, elevations} from "./styled-record"

export const resetButtonStyles = css`
  cursor: pointer;
  background-color: ${colors.colorBgBackground};
  color: ${colors.colorTextText};
  padding: 0.3rem;
  border: 2px solid ${colors.colorTextPrimary};
  box-shadow: ${elevations.shadow};
  outline: none;
  font-size: 1.1rem;
  border-radius: ${borderRadius.borderRadiusM};
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

interface FlexProps {
  alignItems?: string
  justifyContent?: string
  incomingStyles?: SerializedStyles
}

export const flexColumn = ({
  alignItems = "center",
  justifyContent = "center",
  incomingStyles = undefined,
}: FlexProps = {}) => css`
  display: flex;
  flex-flow: column wrap;
  align-items: ${alignItems};
  justify-content: ${justifyContent};
  ${incomingStyles};
`
export const flexRow = ({
  alignItems = "center",
  justifyContent = "center",
  incomingStyles = undefined,
}: FlexProps = {}) => css`
  display: flex;
  flex-flow: row wrap;
  align-items: ${alignItems};
  justify-content: ${justifyContent};
  ${incomingStyles};
`

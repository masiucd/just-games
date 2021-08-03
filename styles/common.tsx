import {css} from "@emotion/react"
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
`

import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {flexColumn, flexRow, resetButtonStyles} from "@styles/common"
import {above} from "@styles/media-query"
import {borderRadius, colors, elevations} from "@styles/styled-record"
import {Fragment} from "react"

const GameWrapper = styled.section`
  ${flexColumn()};
  margin-bottom: 1rem; ;
`

const Card = styled.div`
  min-height: 15rem;
  min-width: 15rem;
  border: 2px solid ${colors.colorTextText};
  border-radius: ${borderRadius.borderRadiusM};
  box-shadow: ${elevations.shadowMd};
`

const ScoreActionsContainer = styled.div`
  background-color: ${colors.colorGray200};
  box-shadow: ${elevations.shadowLg};
  width: 100%; ;
`

const ActionsButtons = styled.div`
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
      background-color: ${colors.colorHighlight};
      color: ${colors.colorBgBackground};
      border-radius: 0;
    }
    &:nth-of-type(3) {
      background-color: ${colors.colorTextText};
      color: ${colors.colorBgBackground};
      border-radius: 0 0 2px 2px;
    }
    &:hover {
      background-color: ${colors.colorGray400};
      color: ${colors.colorHighlight};
    }
  }
`

const wrapperStyles = css`
  ${flexRow({justifyContent: "flex-start"})};
  width: 100%;
  position: relative;
  border: 2px solid red;
  padding: 3rem 0;
  h4 {
    position: absolute;
    top: 0;
  }
`

const ScoreWrapper = styled.div`
  ${flexRow({justifyContent: "space-between"})};
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 1rem 0;
  p {
    flex: 1;
    ${flexRow()};
  }
`

const DealerWrapper = styled.div`
  ${wrapperStyles};
`

const PlayerWrapper = styled.div`
  ${wrapperStyles};
`

const BlackJackGame = () => {
  return (
    <Fragment>
      <GameWrapper>
        <DealerWrapper>
          <h4>Dealers hand</h4>
          <Card>
            <p>back</p>
          </Card>
          <Card
            css={css`
              margin-left: 0.5em;
            `}
          >
            <p>card 1</p>
          </Card>
        </DealerWrapper>
        <ScoreActionsContainer>
          <ScoreWrapper>
            <p>Dealer score: 0</p>
            <p>Player score: 0</p>
          </ScoreWrapper>
          <ActionsButtons>
            <button>Deal</button>
            <button>Hit</button>
            <button>Stand</button>
          </ActionsButtons>
        </ScoreActionsContainer>
        <PlayerWrapper>
          <h4>Player hand</h4>
          <Card>
            <p>card 1</p>
          </Card>
          <Card
            css={css`
              margin-left: 0.5em;
            `}
          >
            <p>card 2</p>
          </Card>
        </PlayerWrapper>
      </GameWrapper>
    </Fragment>
  )
}

export default BlackJackGame

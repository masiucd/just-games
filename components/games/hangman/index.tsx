import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {flexRow, resetButtonStyles} from "@styles/common"
import {colors, elevations} from "@styles/styled-record"
import {alphabet} from "@utils/helpers"
import cuid from "cuid"
import {useState} from "react"

const word = "hello world"
const fn = (s: string) => {
  return [...s].map((x) => x)
}

const LettersWrapper = styled.section`
  ${flexRow()};
  border: 2px solid red;
  max-width: 30rem;
  margin: 2rem auto;
  gap: 0.4rem;
  padding: 0.5rem;
`

const LetterButton = styled.button`
  ${resetButtonStyles};
  ${flexRow()};
  min-width: 3em;
  transition: 120ms ease-out background-color;
  &:hover {
    box-shadow: ${elevations.shadowLg};
    background-color: ${colors.colorTextPrimary};
    color: ${colors.colorBgBackground};
  }
`

const Hangman = () => {
  const [selectedLetter, setSelectedLetter] = useState<string>("")
  let xs = fn(word)
  const list = xs.map((x) => x.replace(x, "_"))
  list[2] = "L"
  list[4] = "L"
  list[4] = selectedLetter
  console.log("list", list)

  return (
    <div>
      <h1>Hangman</h1>

      {list.map((x) => (
        <span
          key={cuid()}
          css={css`
            display: inline-block;
            margin: 0 0.5rem;
          `}
        >
          {x}
        </span>
      ))}

      <LettersWrapper>
        {alphabet.map((letter) => (
          <LetterButton
            type="button"
            key={letter}
            onClick={() => setSelectedLetter(letter)}
          >
            {letter}
          </LetterButton>
        ))}
      </LettersWrapper>
    </div>
  )
}

export default Hangman

import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {flexColumn, flexRow, resetButtonStyles} from "@styles/common"
import {colors, elevations} from "@styles/styled-record"
import {alphabet} from "@utils/helpers"
import cuid from "cuid"
import {useEffect, useState} from "react"

const Wrapper = styled.div`
  ${flexColumn()}
  border: 2px solid red;
  min-height: 50vh;
`

const LettersWrapper = styled.section`
  ${flexRow()};
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

const WordsWrapper = styled.section`
  ${flexRow()}
  margin-bottom: 3rem;
  min-width: 35rem;
  min-height: 5rem;
  border-bottom: 2px solid ${colors.colorTextPrimary};
  padding-bottom: 2rem; ;
`

const wordsStyles = css`
  ${flexColumn()}
  flex: 1;
  min-height: 5rem;
  p {
    margin-bottom: auto;
  }
  span {
    display: inline-block;
    margin: 0 0.5rem;
  }
`
const SelectedWords = styled.div`
  ${wordsStyles};
`
const WrongWords = styled.div`
  ${wordsStyles};
`

const word = ["l", "o", "l"]
const Hangman = () => {
  const [wrongWords, setWrongWords] = useState<Array<string>>([])
  const [playingWord, setPlayingWord] = useState(word)
  const [selectedLetters, setSelectedWords] = useState<Array<string>>(() =>
    Array(word.length).fill("_"),
  )
  const [tries, setTries] = useState<number>(0)

  // console.log("playingWord", playingWord)
  // console.log("selectedLetters", selectedLetters)

  useEffect(() => {
    if (tries === 6) {
      console.log("GAME OVER")
    }
  }, [tries])
  useEffect(() => {
    if (tries < 6 && selectedLetters.every((x) => word.includes(x))) {
      console.log("WINNER")
    }
  }, [selectedLetters, tries])

  return (
    <Wrapper>
      <WordsWrapper>
        <SelectedWords>
          <p>Game Word</p>
          <div>
            {selectedLetters.map((x) => (
              <span key={cuid()}>{x}</span>
            ))}
          </div>
        </SelectedWords>
        <WrongWords>
          <p>Wrong letters</p>
          <div>
            {wrongWords.map((word) => (
              <span key={word}>{word}</span>
            ))}
          </div>
        </WrongWords>
      </WordsWrapper>

      <LettersWrapper>
        {alphabet.map((letter) => (
          <LetterButton
            type="button"
            key={letter}
            onClick={() => {
              if (playingWord.includes(letter)) {
                setSelectedWords((prev) => {
                  const xs = [...prev]
                  const wordIndex = playingWord.indexOf(letter)
                  xs[wordIndex] = letter
                  return xs
                })
              } else {
                if (!wrongWords.includes(letter)) {
                  setWrongWords((prev) => [...prev, letter])
                }
              }

              setPlayingWord((prev) => {
                const xs = [...prev]
                const wordIndex = playingWord.indexOf(letter)
                if (xs[wordIndex]) {
                  xs[wordIndex] = ""
                }
                return xs
              })
              setTries((prev) => prev + 1)
            }}
          >
            {letter}
          </LetterButton>
        ))}
      </LettersWrapper>
    </Wrapper>
  )
}

export default Hangman

import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {flexRow, resetButtonStyles} from "@styles/common"
import {colors, elevations} from "@styles/styled-record"
import {alphabet} from "@utils/helpers"
import cuid from "cuid"
import {Fragment, useEffect, useState} from "react"

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

const WordsWrapper = styled.section`
  ${flexRow()}
  border: 2px solid red;
  margin-bottom: 3rem;
`

const wordsStyles = css`
  ${flexRow()}
  border: 2px solid red;
  flex: 1;
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
  const [selectedWords, setSelectedWords] = useState<Array<string>>(() =>
    Array(word.length).fill("_"),
  )
  const [tries, setTries] = useState<number>(0)

  // console.log("playingWord", playingWord)
  // console.log("selectedWords", selectedWords)

  useEffect(() => {
    if (tries === 6) {
      console.log("GAME OVER")
    }
  }, [tries])
  useEffect(() => {
    if (tries < 6 && selectedWords.every((x) => word.includes(x))) {
      console.log("WINNER")
    }
  }, [tries])

  return (
    <Fragment>
      <WordsWrapper>
        <SelectedWords>
          {selectedWords.map((x) => (
            <span key={cuid()}>{x}</span>
          ))}
        </SelectedWords>
        <WrongWords>
          {wrongWords.map((word) => (
            <span key={word}>{word}</span>
          ))}
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
    </Fragment>
  )
}

export default Hangman

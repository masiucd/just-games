import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {flexColumn, flexRow, resetButtonStyles} from "@styles/common"
import {colors, elevations} from "@styles/styled-record"
import {alphabet} from "@utils/helpers"
import cuid from "cuid"
import {useEffect, useState} from "react"

import {useHangmanDispatch, useHangmanState} from "./context"

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
const SelectedWordsWrapper = styled.div`
  ${wordsStyles};
`
const WrongLettersWrapper = styled.div`
  ${wordsStyles};
`
// const word = ["l", "e", "g", "i", "a"]
const Hangman = () => {
  const [word, setWord] = useState(["l", "e", "g", "i", "a"]) // TODO: From options we could change to whatever word we want to use
  const {selectedLetters, wrongLetters, playingWord, tries, initialWord} =
    useHangmanState()
  const dispatch = useHangmanDispatch()

  // console.log({selectedLetters, wrongLetters, playingWord})

  // useEffect(() => {
  //   if (tries === 6) {
  //     console.log("GAME OVER")
  //   }
  // }, [tries])
  // useEffect(() => {
  //   if (tries < 6 && selectedLetters.every((x) => initialWord.includes(x))) {
  //     console.log("WINNER")
  //   }
  // }, [initialWord, selectedLetters, tries])

  useEffect(() => {
    dispatch({type: "SET_INITIAL_STATE", word})
  }, [dispatch, word])

  return (
    <Wrapper>
      <WordsWrapper>
        <SelectedWordsWrapper>
          <p>Game Word</p>
          <div>
            {selectedLetters.map((x) => (
              <span key={cuid()}>{x}</span>
            ))}
          </div>
        </SelectedWordsWrapper>
        <WrongLettersWrapper>
          <p>Wrong letters</p>
          <div>
            {wrongLetters.map((word) => (
              <span key={word}>{word}</span>
            ))}
          </div>
        </WrongLettersWrapper>
      </WordsWrapper>

      <LettersWrapper>
        {alphabet.map((letter) => (
          <LetterButton
            type="button"
            key={letter}
            onClick={() => {
              const wordIndex = playingWord.indexOf(letter)
              const newSelectedLetters = [...selectedLetters]
              let newWrongLetters = wrongLetters
              const newPlayingWord = [...playingWord]
              let hasMatch = false

              if (playingWord.includes(letter)) {
                newSelectedLetters[wordIndex] = letter
                hasMatch = true
              } else {
                if (!wrongLetters.includes(letter)) {
                  newWrongLetters = [...wrongLetters, letter]
                }
              }
              if (newPlayingWord[wordIndex]) {
                newPlayingWord[wordIndex] = ""
              }
              dispatch({
                type: "SELECT_LETTER_UPDATE_LISTS",
                newSelectedLetters,
                newWrongLetters,
                newPlayingWord,
                hasMatch,
              })
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

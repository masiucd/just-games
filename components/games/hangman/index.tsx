import AnimatedWrapper from "@components/common/animated-wrapper"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {flexColumn, flexRow, resetButtonStyles} from "@styles/common"
import {colors, elevations} from "@styles/styled-record"
import {alphabet, getRandomItemInList, wordToList} from "@utils/helpers"
import cuid from "cuid"
import {motion} from "framer-motion"
import {useEffect, useState} from "react"

import {GameState, useHangmanDispatch, useHangmanState} from "./context"
import WinLoseButton from "./win-lose-button"

const Wrapper = styled.div`
  ${flexColumn()}
  min-height: 50vh;
  position: relative;
`

const LettersWrapper = styled(motion.section)`
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

const WORDS_LIST = ["legia", "cow", "horse", "ifkgbg"] as const
const MAXIMUM_TRIES = 6

const checkLetters = (
  ourSelectedLetters: Array<string>,
  expectedLetters: Readonly<Array<string>>,
) => ourSelectedLetters.every((x) => expectedLetters.includes(x))

const checkWinner = (
  tries: number,
  gameState: GameState,
  selectedLetters: Array<string>,
  initialWord: Readonly<Array<string>>,
): boolean =>
  tries < MAXIMUM_TRIES &&
  gameState === "play" &&
  selectedLetters.length > 0 &&
  checkLetters(selectedLetters, initialWord)

const init = () => wordToList(getRandomItemInList(WORDS_LIST))

const Hangman = () => {
  const [word, setWord] = useState<string[]>(() => init())
  const {
    selectedLetters,
    wrongLetters,
    playingWord,
    tries,
    initialWord,
    gameState,
  } = useHangmanState()
  const dispatch = useHangmanDispatch()

  const newWord = () => {
    setWord(init())
    dispatch({type: "NEW_WORD", word})
  }
  useEffect(() => {
    if (gameState === "play") {
      dispatch({type: "SET_INITIAL_STATE", word})
    }
  }, [dispatch, gameState, word])

  useEffect(() => {
    if (tries > MAXIMUM_TRIES) {
      dispatch({type: "GAME_OVER", newState: "lose"})
    }
  }, [dispatch, tries])

  useEffect(() => {
    if (checkWinner(tries, gameState, selectedLetters, initialWord)) {
      dispatch({type: "SET_WINNER", newState: "win"})
    }
  }, [dispatch, gameState, initialWord, selectedLetters, tries])

  const selectLetter = (letter: string) => {
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
  }

  return (
    <Wrapper>
      {gameState === "idle" && (
        <button
          css={css`
            ${resetButtonStyles};
          `}
          onClick={() => {
            dispatch({type: "START_GAME", newState: "play"})
          }}
        >
          Start
        </button>
      )}
      <button
        disabled={gameState !== "play"}
        onClick={newWord}
        css={css`
          ${resetButtonStyles};
          position: absolute;
          top: 1rem;
          left: 2rem;
          font-size: 0.85rem;
        `}
      >
        New word
      </button>
      {gameState === "play" && (
        <p>
          {" "}
          {tries}/{MAXIMUM_TRIES} Tries
        </p>
      )}
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
            {wrongLetters.map((letter) => (
              <span key={letter}>{letter}</span>
            ))}
          </div>
        </WrongLettersWrapper>
      </WordsWrapper>

      <AnimatedWrapper isOn={gameState !== "idle"}>
        <LettersWrapper
          layout
          initial={{opacity: 0.45}}
          animate={{opacity: 1}}
          exit={{opacity: 0.65, x: 1000}}
          transition={{damping: 6}}
        >
          {alphabet.map((letter) => (
            <LetterButton
              type="button"
              key={letter}
              onClick={() => selectLetter(letter)}
            >
              {letter}
            </LetterButton>
          ))}
        </LettersWrapper>
      </AnimatedWrapper>
      <WinLoseButton />
    </Wrapper>
  )
}

export default Hangman

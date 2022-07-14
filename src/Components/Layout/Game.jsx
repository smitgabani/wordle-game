import React, { useEffect, useState } from 'react'
import { useWord } from '../../Hooks/useWord';

const LENGTH = 5;
const API_URL = 'https://random-word-api.herokuapp.com/all';

function Game() {

  // the work which is correct
  // do not use setSolution in this application.
  const [solution, setSolution] = useWord(API_URL);
  const [isGameOver, setIsGameOver] = useState(false);

  // array of strings with length 6
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currnetGuess, setCurrentGuess] = useState('');

  useEffect(()=> {
    const handleKeydown = (event) => {
      if (isGameOver) {
        return;
      }

      if( /^[A-Za-z]$/.test(event.key) ) {
        setCurrentGuess(oldGuess => oldGuess + event.key);
      }

      if (event.key === 'Enter' ) {
        if (currnetGuess.length !== 5 ) {
          return;
        }
        const isCorrect  = solution === currnetGuess;
        if (isCorrect) {
          setIsGameOver(true);
        }
        const newGuesses = [...guesses];
      }
      if (event.key === "Backspace") {
        setCurrentGuess(currnetGuess=> currnetGuess.slice(0,-1));
      }
      if (currnetGuess.length>= 5) {
        return;

      }


    };
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  },[currnetGuess, isGameOver, solution]);


  return (
    <div className='game'>
      {guesses.map((guess, i) => {
        const isCurrentGuess = i === guesses.findIndex(val => val == null);
        return(
          <Line
          guess={isCurrentGuess ? currnetGuess : guess ?? ''}
          isLast={!isCurrentGuess && guess != null} />

        )
      })}

    </div>
  )
}

function Line({ guess, isLast }) {
  const tiles = [];
  let classname = "tile";


  for (let i = 0; i < LENGTH; i++) {

    const char = guess[i];
    tiles.push(<div key={i} className='tile'>{char}</div>)
  }
  return(
    <div className='line'>
      {tiles}
    </div>
  )
}

export default Game

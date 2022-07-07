import React, { useEffect, useState } from 'react'
import { useWord } from '../../Hooks/useWord';
import Footer from './Footer';

const LENGTH = 5;
const API_URL = 'https://random-word-api.herokuapp.com/all';

function Game() {

  // the work which is correct
  const [solution, setSolution] = useWord(API_URL);
  console.log("Solution: " + solution);
  // array of strings with length 6
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currnetGuess, setCurrentGuess] = useState('');

  useEffect(()=> {
    const handleKeydown = (event) => {
      setCurrentGuess(oldGuess => oldGuess + event.key);
    };
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  },[]);


  return (
    <div className='game'>
      {guesses.map((guess, i) => {
        const isCurrentGuess = i === guesses.findIndex(val => val == null);
        return(
          <Line guess={isCurrentGuess ? currnetGuess : guess ?? ''} />

        )
      })}
    </div>
  )
}

function Line({ guess }) {
  const tiles = [];

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

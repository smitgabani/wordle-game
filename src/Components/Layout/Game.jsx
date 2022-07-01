import React, { useEffect, useState } from 'react'
import Footer from './Footer';

const API_URL = 'https://api.frontendexpert.io/api/fe/wordle-words';
const LENGTH = 5;

function Game() {

  const [solution, setSolution] = useState('Not working');
  const [guesses, setGuesses] = useState(Array(6).fill(null));

  useEffect(()=>{
    const fetchWord = async () => {
      const response = await fetch(API_URL);
      const words = await response.json();
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setSolution(randomWord);
      console.log("Random Word: "+ randomWord + "Solution: " + solution);
    }
    fetchWord();
    setSolution("MATCH");

  }, []);



  return (
    <div className='game'>
      {guesses.map(guess => {
        return(
          <Line guess={guess ?? ''} />
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

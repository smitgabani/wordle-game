import { useState, useEffect} from "react";


export const useWord = (url) => {

    const [solution, setSolution] = useState('Not working');
    useEffect(()=>{
        const fetchWord = async () => {
          try {
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                accept: 'application/json',
              },
            });
            // response error
            if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }
            // words - array with all words
            // fiveLetterWords - words with 5 letters
            const words = await response.json();
            var fiveLetterWords=[];

            // loop the words array and add all 5 letter words in the fiveLetterWords array
            words.forEach((word) => {
              if(word.length === 5) {
                fiveLetterWords.push(word);
              }
            })

            // randomwords = floor(int greater than the double) of math.random(1-0) * lenght of the array
            const randomWord = fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];
            // use this word as the solution
            setSolution(randomWord);

          } catch (err) {
            console.log(err);
          }

        }
        fetchWord();
      }, [url]);
      // the dependency will never change as we do not have a new game option.
      // even if we have we would only run the random word array again.

    return [solution, setSolution];
}
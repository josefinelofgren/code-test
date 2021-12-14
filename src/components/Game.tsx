import React, { useState, useEffect } from 'react';

interface Props {
    card: any,
    nextCard: any,
    redrawCardFromDeck: () => void,
}

function Game(props: Props) {

  const { card, nextCard, redrawCardFromDeck } = props;
  const[gameStatus, setGameStatus] = useState('');
  const[score, setScore] = useState(0);
  const[guess, setGuess] = useState('');


  // translate card values to real values
  let cardValues: any = {
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'JACK': 11,
    'QUEEN': 12,
    'KING': 13,
    'ACE': 14
  }

  useEffect(() => {
    // check if right answer
    if(guess === 'higher'){
        if(cardValues[card.cards[0].value] < cardValues[nextCard.cards[0].value]) {
            setGameStatus('You won!')
            setScore(score+1)
        } else if (cardValues[card.cards[0].value] === cardValues[nextCard.cards[0].value]){
            setGameStatus('Draw')
        } else {
            setGameStatus('You lost..')
        }
    }  else if(guess === 'lower'){
        if(cardValues[card.cards[0].value] > cardValues[nextCard.cards[0].value]) {
            setGameStatus('You won!')
            setScore(score+1)
        } else if (cardValues[card.cards[0].value] === cardValues[nextCard.cards[0].value]){
            setGameStatus('Draw')
        } else {
            setGameStatus('You lost!')
        }
    }   

  }, [nextCard, setGuess])

  // handle click for higher button
  const handleClickHigher = () => {
      redrawCardFromDeck();
      setGuess('higher')
  }

  // handle click for lower button
  const handleClickLower = () => {
    redrawCardFromDeck();
    setGuess('lower')
}


  return (
      <>
      {card && (
      <div className='game-board'>
          <figure className='card'>
              <img src={card.cards[0].image} alt={card.cards[0].suit + card.cards[0].value}/>
          </figure>
          <figure className='card'>
          {nextCard && (
            <>
            <img src={nextCard.cards[0].image} alt={nextCard.cards[0].suit + nextCard.cards[0].value}/>
            </>
          )}
          </figure>
          <button onClick={handleClickHigher} name='higher' type='submit'>Higher</button>
          <button onClick={handleClickLower} name='lower' type='submit'>Lower</button>
          {nextCard && (
              <>
              <h1>Cards remaining: {nextCard.remaining}</h1>
              <h2>Score: {score}</h2>
              <h3>Game status: {gameStatus}</h3>
              </>
          )}
      </div>
      )}
      </>
  );
}

export default Game;
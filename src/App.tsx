import React, { useState, useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary'

// import components
import Game from './components/Game';

function App() {

  const[card, setCard]: Array<any> = useState(null);
  const[nextCard, setNextCard]: Array<any> = useState(null);
  const handleError = useErrorHandler();


  // Get deck of cards
  const createDeckAndDraw = () => {
    const result = fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then((response) => response.json(),
          (error) => handleError(error))
          .then((data) => {
            
            // draw card from deck
            const result = fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`)
            .then((response) => response.json(),
                (error) => handleError(error))
                .then((data) => {
                    setCard(data);
              });
             return result;
          });
          return result;
  }

  // Redraw card from deck
  const redrawCardFromDeck = () => {
    const result = fetch(`https://deckofcardsapi.com/api/deck/${card.deck_id}/draw/?count=1`)
    .then((response) => response.json(),
        (error) => handleError(error))
        .then((data) => {
        setNextCard(data)
      });
     return result;
  }


  useEffect(() => {
     (async function (){
         await createDeckAndDraw();
     })();
  },[setCard]);


  return (
    <div className='app'>
      <Game card={card} nextCard={nextCard} redrawCardFromDeck={redrawCardFromDeck}/> 
    </div>
  );
}

export default App;

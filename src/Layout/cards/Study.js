import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import NotEnough from "../common/NotEnoughCards";

function Study() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const getDeck = async () => {
    const deck = await readDeck(deckId);
    setDeck(deck);
  };

  useEffect(() => {
    getDeck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped); // true
  };

  const handleNext = () => {

    if (currentCard === deck.cards.length - 1) {
      if (window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.")) {
        setCurrentCard(0);
      }
      history.push("/");
    } else {
      setCurrentCard(currentCard + 1);
    }
  };

  return (
    <div>
      {deck && (
        <>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 20 20">
                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
                  </svg>

                  Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/deck/${deck.id}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Study
              </li>
            </ol>
          </nav>
          <h1>Study: {deck.name}</h1>
          <div className="StudyCard1">

            {deck.cards.length > 2 ? <div className="card-body">
              <h2 className="card-title">
                Card {currentCard + 1} of {deck.cards.length} cards
              </h2>
              <p className="card-text" fontSize="25.6px" value="{}">
                {isFlipped
                  ? deck.cards[currentCard].back
                  : deck.cards[currentCard].front}
              </p>
              <button
                type="button"
                label="Buttons"
                className="btn btn-secondary mr-2"
                id="flip"
                onClick={handleFlip}
              >
                Flip
              </button>
              {isFlipped && <button
                type="button"
                label="Buttons"
                className="btn btn-primary"
                id="next"
                onClick={handleNext}
              >
                Next
              </button>}
            </div> : <NotEnough deckId={deck.id} />}
          </div>
        </>
      )}
    </div>
  );
}

export default Study;


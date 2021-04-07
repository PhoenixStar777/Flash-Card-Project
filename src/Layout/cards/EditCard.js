import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck,readCard, updateCard } from "../../utils/api";

function EditCard() {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState(null);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const getDeck = async () => {
    const deck = await readDeck(deckId);
    setDeck(deck);
  };

  const getCard = async () => {
    const { front, back } = await readCard(cardId);
    setFront(front);
    setBack(back);
  }

  useEffect(() => {
    getDeck();
    getCard();
  }, []);

  const handleOnChangeFront = (e) => {
    setFront(e.target.value);
  };

  const handleOnChangeBack = (e) => {
    setBack(e.target.value);
  };

  const handleSubmit = async () => {
    const updatedCard = { deckId: Number(deckId), id: Number(cardId), front: front, back:back};
    await updateCard(updatedCard);
   history.push(`/decks/${deckId}`)
  }

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  }

  return (
    <>
      {deck && (
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/deck/${deck.id}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Edit Card {cardId}
              </li>
            </ol>
          </nav>
          <div className="mb-3">
              <h2>Edit Card</h2>
            <label for="front" className="form-label">
              Front
            </label>
            <textarea
              className="form-control"
              onChange={handleOnChangeFront}
              value={front}
              id="front"
              rows="3"
              placeholder="Front side of card"
            ></textarea>
          </div>
          <div className="mb-3">
            <label for="back" className="form-label">
              Back
            </label>
            <textarea
              className="form-control"
              onChange={handleOnChangeBack}
              value={back}
              id="back"
              rows="3"
              placeholder="Back side of card"
            ></textarea>
          </div>
          <button
            type="button-lg"
            label="Buttons"
            className="btn btn-secondary mr-2"
            id="cancelButton"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button-lg"
            label="Buttons"
            className="btn btn-primary"
            id="submitButton"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
}

export default EditCard;

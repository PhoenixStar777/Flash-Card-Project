import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";

function AddCard() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const getDeck = async () => {
    const deck = await readDeck(deckId);
    setDeck(deck);
  };

  useEffect(() => {
    getDeck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChangeFront = (e) => {
    setFront(e.target.value);
  };

  const handleOnChangeBack = (e) => {
    setBack(e.target.value);
  };

  const handleSave = () => {
    const card = { front: front, back:back};
    createCard(deckId, card);
    setFront("");
    setBack("")
  }

  const handleDone = () => {
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
                <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Add Card
              </li>
            </ol>
          </nav>
          <div className="mb-3">
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
            id="doneButton"
            onClick={handleDone}
          >
            Done
          </button>
          <button
            type="button-lg"
            label="Buttons"
            className="btn btn-primary"
            id="saveButton"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      )}
    </>
  );
}

export default AddCard;

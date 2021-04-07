import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

function Deck({ deckData, getDecks }) {
  const { id, name, description, cards } = deckData;
  let history = useHistory();

  const handleDelete = async () => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      await deleteDeck(id);
      await getDecks();
    }
  };

  const handleStudy = () => {
    history.push(`decks/${id}/study`);
  };

  const handleView = () => {
    history.push(`decks/${id}`);
  };

  return (
    <div className="card my-2">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <h6 className="float-right">{cards.length} cards</h6>
        <p className="card-text" fontSize="25.6px">
          {description}
        </p>
        <div className="buttonHolder">
          <button
            type="button-lg"
            label="Buttons"
            className="btn btn-secondary mr-2"
            id="View"
            onClick={handleView}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 20 20">
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
            </svg>

            View
          </button>
          <button
            type="button-lg"
            label="Buttons"
            className="btn btn-primary"
            id="Study"
            onClick={handleStudy}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-journal-bookmark-fill" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z" />
              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
            </svg>

            Study
          </button>
          <button
            type="button"
            className="btn btn-danger float-right"
            onClick={handleDelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-trash-fill"
              viewBox="0 0 20 20"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

Deck.propTypes = {
  deckData: PropTypes.shape({
    "description": PropTypes.string.isRequired,
    "id": PropTypes.number.isRequired,
    "name": PropTypes.string.isRequired,
  }),
  getDecks: PropTypes.func.isRequired,
};

export default Deck;

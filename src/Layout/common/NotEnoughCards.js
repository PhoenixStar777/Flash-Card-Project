import React from "react";
import { useHistory } from "react-router-dom";

function NotEnoughCards(props) {
  const {deckId} = props;
  const history = useHistory();
  const handleAddCards = () => {
      history.push(`/decks/${deckId}/cards/new`);
  }

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h2>Not enough cards.</h2>
          <p>You need at least 3 cards to study.  There are two cards in this deck.</p>
          <button type="button"
            className="btn btn-primary"
            onClick={handleAddCards}
          ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus" viewBox="0 0 20 20">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
      </svg>Add Cards </button>
        </div>
      </div>
    </div>
  );
}

export default NotEnoughCards;

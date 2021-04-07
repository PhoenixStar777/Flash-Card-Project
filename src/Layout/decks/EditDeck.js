import { readDeck, updateDeck } from "../../utils/api";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";


function EditDeck(){
  const history = useHistory();
const  {deckId} = useParams();
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [deck, setDeck] = useState(""); //useState(deck) ?
const getDeck = async () => {
  const deck = await readDeck(deckId);
  setDeck(deck);
  setName(deck.name);
  setDescription(deck.description);
};
  useEffect(() => {
  getDeck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 const handleOnChangeName = (e) => {
  setName(e.target.value);
};

const handleOnChangeDescription = (e) => {
  setDescription(e.target.value);
};

const handleOnSubmit = async () => {
  const updatedDeck = {id: Number(deckId), name, description}; 
  await updateDeck(updatedDeck);
  history.push(`/decks/${deckId}`);  
}

const handleOnCancel = () => {
  history.push(`/decks/${deckId}`);
}

  return (
    <>
      {deck && (
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 20 20">
  							<path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
							</svg>
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
               Edit Deck
              </li>
            </ol>
          </nav>
          <div class="mb-3">
              <h2>Edit Deck</h2>
            <label for="front" class="form-label">
              Name
            </label>
            <textarea
              class="form-control"
              onChange={handleOnChangeName}
              value={name}
              id="name"
              rows="3"
              placeholder="Deck Name"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="back" class="form-label">
              Description
            </label>
            <textarea
              class="form-control"
              onChange={handleOnChangeDescription}
              value={description}
              id="description"
              rows="3"
              placeholder="Deck Description"
            ></textarea>
          </div>
          <button
            type="button-lg"
            label="Buttons"
            className="btn btn-secondary mr-2"
            id="cancelButton"
            onClick={handleOnCancel}
          >
            Cancel
          </button>
          <button
            type="button-lg"
            label="Buttons"
            className="btn btn-primary"
            id="submitButton"
            onClick={handleOnSubmit}
          >
            Submit
          </button>
        </div>
      )}
    
 

  </>

  )}


export default EditDeck;

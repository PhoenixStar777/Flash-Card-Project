import React, {  useState } from 'react';
import { createDeck } from '../../utils/api';
import { Link, useHistory} from "react-router-dom";

//should I change function name & component name to something else?
//Game plan, change component to DeckCreate it was CreateDeck
//Changed name due to function being called on utils page has same name CreateDeck


function CreateDeck() {

    const [deckName, setDeckName] = useState("");
    const [deckDescription, setDeckDescription] = useState("");
    const history = useHistory();

    

    const handleDeckNameChange = (e) => {
        setDeckName(e.target.value);        
    }

    const handleDeckDescriptionChange = (e) => {
        setDeckDescription(e.target.value);
    }

    const handleCancel = () => {
        setDeckName("");
        setDeckDescription("");
    };

    const handleSubmit = () => {
        const deck = { name: deckName, description: deckDescription };
        createDeck(deck).then(deck => history.push("/"))
    }

    return (

        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    
                    <li className="breadcrumb-item"><Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 20 20">
  							<path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
							</svg>Home</Link></li>
                    <li className="breadcrumb-item">Create Deck</li>
                </ol>
            </nav>
            <h1>Create Deck</h1>
            <div className="mb-3">
                <label htmlFor="deckName" className="form-label">Name</label>
                <input type="text" value={deckName} className="form-control" id="deckName" placeholder="Deck Name" onChange={handleDeckNameChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="deckDescription" placeholder="Brief description of the deck" className="form-label">Description</label>
                <textarea className="form-control" value={deckDescription} id="deckDescription" onChange={handleDeckDescriptionChange} rows="3"></textarea>
            </div>
            <div className="buttonHolder">
            <button
              type="button-lg"
              label="Buttons"
              className="btn btn-secondary mr-2"
              id="cancel"
              onClick = {handleCancel}
            >
              Cancel
            </button>
            <button
              type="button-lg"
              label="Buttons"
              className="btn btn-primary"
              id="submit"
              onClick = {handleSubmit}
            >
              Submit
            </button>
            </div>
        </>
    );
}





export default CreateDeck;

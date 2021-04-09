import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Deck from './Deck';
import { listDecks } from '../../utils/api';


function DeckList() {
    const history = useHistory();
    const [decks, setDecks] = useState([]);

    const getDecks = async () => {
        const decks = await listDecks();
        setDecks(decks);
    }
    useEffect(() => {
        getDecks(); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 

    const handleCreateDeck = () => {
        history.push("/decks/new");
    }

    return (
        <div>
            <button
                type="button-lg"
                label="Buttons"
                className="btn btn-secondary"
                id="plus"
                onClick={handleCreateDeck}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus" viewBox="0 0 20 20">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>

            Create Deck
          </button>
            { decks.map((deck, id) => {
                return <Deck deckData={deck} key={id} getDecks={getDecks} />
            })}
        </div>
    )
}



export default DeckList;
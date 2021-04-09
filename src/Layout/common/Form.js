import React, {useState, useEffect } from 'react'; 
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, createCard, updateCard } from "../../utils/api";

function Form({ cardType }) {
    const history = useHistory();
    const { cardId, deckId } = useParams();
    const isEditCard = cardType === 'editCard' ? true : false;
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
        if (isEditCard) {
            getCard();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCancel = () => {
        history.push(`/decks/${deckId}`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditCard) {
            const updatedCard = { deckId: Number(deckId), id: Number(cardId), front: front, back: back };
            await updateCard(updatedCard);
        } else {
            const card = { front: front, back: back };
            await createCard(deckId, card);
            setFront("");
            setBack("");
        }
        history.push(`/decks/${deckId}`)
    }

    const handleOnChangeFront = (e) => {
        setFront(e.target.value);
    };

    const handleOnChangeBack = (e) => {
        setBack(e.target.value);
    };
    return (
        <div>
            {deck && <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 20 20">
  							<path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
							</svg>
                            Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {isEditCard ? `Edit Card ${cardId}` : `Add Card`}
                    </li>
                </ol>
            </nav>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <h2>{isEditCard ? "Edit Card" : "Add Card"}</h2>
                    <label htmlFor="front" className="form-label">
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
                    <label htmlFor="back" className="form-label">
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
                    type="button"
                    label="Buttons"
                    className="btn btn-secondary mr-2"
                    id="cancelButton"
                    onClick={handleCancel}
                >
                    {isEditCard ? 'Cancel' : 'Done'}
                </button>
                <button
                    type="submit"
                    label="Buttons"
                    className="btn btn-primary"
                    id="submitButton"
                >
                    {isEditCard ? 'Submit' : 'Save'}
                </button>
            </form>
        </div>
    )
}

export default Form;
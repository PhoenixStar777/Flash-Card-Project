import React from "react";
import ReadCard from './ReadCard';

function CardList({cards, getDeck}) {
  return (
    <div className="mt-4">
      <h2>Cards</h2>
      {cards.map((card, i) => {
          return <ReadCard card={card} getDeck={getDeck}/>
      })}
    </div>
  );
}

export default CardList;

import React from "react";

export const useOrderedCards = (cards) => {
  const [orederedCards, setOrderedCards] = React.useState(null);

  React.useEffect(() => {
    setOrderedCards(cards);
  }, [cards]);

  const onSlideCard = (direction) => {
    if (direction === "left") {
      setOrderedCards([...orederedCards.slice(1), orederedCards[0]]);
    } else {
      setOrderedCards([
        orederedCards[orederedCards.length - 1],
        ...orederedCards.slice(0, -1)
      ]);
    }
  };

  return [orederedCards, onSlideCard];
};

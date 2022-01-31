import React from "react";

const calcRotationAndAngle = (cards, allMoney) => {
  const array = [...cards];

  for (let i = 0; i < array.length; i++) {
    if (i === 0) {
      array[i].rotation = 0;
      array[i].angle = (array[i].balance / allMoney) * 360;
    } else {
      array[i].rotation = array[i - 1].angle + array[i - 1].rotation;
      array[i].angle = (array[i].balance / allMoney) * 360;
    }
  }

  return array;
};

export const useRoundStat = (statsByCard) => {
  const [allAmount, setAllAmount] = React.useState(null);
  const [allAmountConsidered, setAllAmountConsidered] = React.useState(null);
  const [cardsWithAngles, setCardsWithAngles] = React.useState(null);

  React.useEffect(() => {
    const allMoney = statsByCard.reduce((sum, current) => {
      return sum + current.balance;
    }, 0);

    setAllAmount(allMoney);

    const allMoneyConsidered = statsByCard.reduce((sum, current) => {
      return current.total ? sum + current.balance : sum;
    }, 0);

    let cardsConsidered = statsByCard
      .filter((card) => card.total)
      .map((item) => ({ ...item, rotation: 0, angle: 0 }));

    cardsConsidered = calcRotationAndAngle(cardsConsidered, allMoneyConsidered);

    setAllAmountConsidered(allMoneyConsidered);
    setCardsWithAngles(cardsConsidered);
  }, [statsByCard]);

  return [allAmount, allAmountConsidered, cardsWithAngles];
};

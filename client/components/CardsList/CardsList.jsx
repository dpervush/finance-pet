import React from "react";
import Button from "../UI/Button/Button";
import { PlusIcon, ExpandIcon } from "../icons";

import Card from "./Card/Card";

import styles from "./CardsList.module.scss";

const cards = [
  {
    _id: "60e444a527214088a50c8bb7",
    name: "aliqua",
    color: "blue",
    number: 1922169227271577,
    balance: "$2,443.59",
  },
  {
    _id: "60e444a558001d7791dd5452",
    name: "reprehenderit",
    color: "green",
    number: 2973867723924793,
    balance: "$1,534.84",
  },
  {
    _id: "60e444a5356231266ce604be",
    name: "id",
    color: "brown",
    number: 2849360505082596,
    balance: "$1,893.50",
  },
];

const CardsList = () => {
  const [activeCard, setActiveCard] = React.useState(0);

  const onCardClickHandle = (index) => {
    setActiveCard(index);
  };

  return (
    <>
      {cards.map((item, index) => {
        return (
          <Card
            key={item._id}
            {...item}
            onClick={() => onCardClickHandle(index)}
            isActive={activeCard === index}
          />
        );
      })}

      <div className={styles.btn_wrapper}>
        <Button innerText="New card" padding="18px 17px">
          <PlusIcon />
        </Button>
        <Button padding="15px 16px">
          <ExpandIcon />
        </Button>
      </div>
    </>
  );
};

export default CardsList;

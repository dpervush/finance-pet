import React from "react";
import Button from "../UI/Button/Button";
import { PlusIcon, ExpandIcon } from "../icons";

import Card from "./Card/Card";

import styles from "./CardsList.module.scss";
import AddCardModal from "../AddCardModal/AddCardModal";

const cards = [
  {
    _id: "60e444a527214088a50c8bb7",
    name: "aliqua",
    color: "#8a16ff",
    number: 1922169227271577,
    balance: "$2,443.59",
  },
  {
    _id: "60e444a558001d7791dd5452",
    name: "reprehenderit",
    color: "#ff25c2",
    number: 2973867723924793,
    balance: "$1,534.84",
  },
  {
    _id: "60e444a5356231266ce604be",
    name: "id",
    color: "#24dffe",
    number: 2849360505082596,
    balance: "$1,893.50",
  },
];

const CardsList = () => {
  const [activeCard, setActiveCard] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);

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
        <Button
          innerText="New card"
          padding="18px 17px"
          onClick={() => setShowModal(true)}
        >
          <PlusIcon />
        </Button>
        <Button padding="15px 16px">
          <ExpandIcon />
        </Button>
      </div>
      <AddCardModal onClose={() => setShowModal(false)} show={showModal} />
    </>
  );
};

export default CardsList;

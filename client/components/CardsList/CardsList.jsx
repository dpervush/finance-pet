import React from "react";
import Button from "../UI/Button/Button";
import { PlusIcon, ExpandIcon } from "../icons";

import Card from "./Card/Card";
import AddCardModal from "../AddCardModal/AddCardModal";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

import styles from "./CardsList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "../../store/slices/cards";

const CardsList = () => {
  const ref = React.useRef();

  const dispatch = useDispatch();
  const { cards } = useSelector(({ cards }) => cards);

  const [activeCard, setActiveCard] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  useOnClickOutside(ref, () => setActiveCard(null));

  const onCardClickHandle = (index) => {
    setActiveCard(index);
  };

  React.useEffect(() => {
    dispatch(getCards());
  }, []);

  return (
    <div className={styles.card_list} ref={ref}>
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
      {showModal && (
        <AddCardModal onClose={() => setShowModal(false)} show={showModal} />
      )}
    </div>
  );
};

export default CardsList;

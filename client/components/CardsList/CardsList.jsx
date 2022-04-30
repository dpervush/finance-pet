import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SwipeableList } from "@sandstreamdev/react-swipeable-list";

import Card from "./Card/Card";
import AddCardModal from "../AddCardModal/AddCardModal";
import Button from "../UI/Button/Button";
import { PlusIcon, ExpandIcon } from "../icons";
import { getCards } from "../../store/slices/cards";

import styles from "./CardsList.module.scss";
import { getStatsByCard } from "../../store/slices/stats";
import { bodyWidth } from "../../utils";
import { useAddModal } from "./hooks/useAddModal";
import { useOrderedCards } from "./hooks/useOrderedCards";
import useIsMobileDevice from "../../hooks/useIsMobileDevice";

const CardsList = () => {
  const dispatch = useDispatch();
  const {
    cards: { cards, loading }
  } = useSelector((state) => ({
    cards: state.cards
  }));

  const [addModalShown, closeAddModal, openAddModal] = useAddModal();
  const [orderedCards, onSlideCard] = useOrderedCards(cards);

  React.useEffect(() => {
    dispatch(getCards());
  }, []);

  const [activeCard, setActiveCard] = React.useState(-1);
  const onCardClickHandle = (event, index) => {
    if (index === activeCard) {
      setActiveCard(-1);
    } else {
      setActiveCard(index);
    }
  };

  const { isMobile } = useIsMobileDevice();

  return (
    <div>
      <SwipeableList>
        <ul className={styles.card_list}>
          {orderedCards?.map((item, index) => (
            <React.Fragment key={item.id}>
              <div
                className={styles.card_wrapper}
                key={item.id}
                style={
                  bodyWidth <= 710
                    ? {
                        top: 40 - 20 * index + "px",
                        transform:
                          index < 3
                            ? `translateX(-50%) scale(${1 - index * 0.1})`
                            : `translateX(-50%) scale(0)`,
                        zIndex: cards.length - index
                      }
                    : null
                }
              >
                <Card
                  {...item}
                  onClick={(event) => onCardClickHandle(event, index)}
                  isActive={isMobile || activeCard === index}
                  onSlideCard={onSlideCard}
                />
              </div>
            </React.Fragment>
          ))}
        </ul>
      </SwipeableList>

      <div className={styles.btn_wrapper}>
        <Button innerText="New card" padding="18px 17px" onClick={openAddModal}>
          <PlusIcon />
        </Button>
        <Button padding="15px 16px">
          <ExpandIcon />
        </Button>
      </div>
      {addModalShown && (
        <AddCardModal onClose={closeAddModal} show={addModalShown} />
      )}
    </div>
  );
};

export default CardsList;

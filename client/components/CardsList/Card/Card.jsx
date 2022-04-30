import React from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import styled from "styled-components";
import { SwipeableListItem } from "@sandstreamdev/react-swipeable-list";

import AddCardModal from "../../AddCardModal/AddCardModal";
import { deleteCard } from "../../../store/slices/cards";
import { bodyWidth, formatCurrency, isTouchDevice } from "../../../utils";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

import styles from "./Card.module.scss";
import { DeleteConfirmModal } from "../../../containers/DeleteConfirmModal/DeleteConfirmModal";
import { useShowActions, useAddModal, useDeleteModal } from "./hooks";

const cx = classNames.bind(styles);

const Wrapper = styled.div`
  background-color: ${(props) => props.color};
`;

const SwipeableWrapper = ({ children, onSlideCard }) => {
  if (isTouchDevice || bodyWidth < 710) {
    return (
      <SwipeableListItem
        threshold={0.12}
        swipeLeft={{
          action: () => onSlideCard("left")
        }}
        swipeRight={{
          action: () => onSlideCard("rigth")
        }}
      >
        {children}
      </SwipeableListItem>
    );
  } else {
    return <div>{children}</div>;
  }
};

const formatNumber = (number) => {
  const formattedNumber =
    number.slice(0, 14).replace("[0-9]*/g", "*") + " " + number.slice(15, 19);
  return formattedNumber;
};

const Card = ({
  onSlideCard,
  balance,
  currency,
  name,
  number,
  color,
  total,
  onClick,
  isActive,
  icon,
  id
}) => {
  const dispatch = useDispatch();

  const [actionsShown, closeActions, showActions] = useShowActions();
  const [addModalShown, closeAddModal, openAddModal] = useAddModal();
  const [deleteModalShown, closeDeleteModal, showDeleteModal] =
    useDeleteModal();

  React.useEffect(() => {
    !isActive && closeActions();
  }, [isActive, closeActions]);

  const ref = React.useRef();
  useOnClickOutside(ref, closeActions);

  const onDeleteClickHandler = () => dispatch(deleteCard(id));

  const onMoreClick = (e) => {
    if (isActive) {
      if (actionsShown) {
        closeActions(e);
      } else {
        showActions(e);
      }
    } else {
      onClick();
      showActions(e);
    }
  };

  return (
    <SwipeableWrapper onSlideCard={onSlideCard}>
      <li className={styles.card_wrapper}>
        <Wrapper
          color={color}
          onClick={onClick}
          className={cx({ card: true, active: isActive })}
        >
          <div className={styles.card_inner}>
            <div className={styles.actions_wrapper} ref={ref}>
              <div className={styles.more} onClick={onMoreClick}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              {actionsShown && (
                <div className={styles.actions}>
                  <button className={styles.btn} onClick={openAddModal}>
                    Update
                  </button>
                  <button className={styles.btn} onClick={showDeleteModal}>
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div className={styles.system}></div>
            <div className={styles.balance}>
              {formatCurrency(balance, currency)}
            </div>
            <div className={styles.title}>{formatNumber(name) ?? name}</div>
            {addModalShown && (
              <AddCardModal
                onClose={closeAddModal}
                initValues={{
                  id,
                  balance,
                  currency,
                  name,
                  number,
                  color,
                  total,
                  icon
                }}
                method="UPDATE"
              />
            )}
          </div>
        </Wrapper>
      </li>

      {deleteModalShown && (
        <DeleteConfirmModal
          title={"Delete card?"}
          onClose={closeDeleteModal}
          onSubmit={onDeleteClickHandler}
        />
      )}
    </SwipeableWrapper>
  );
};

export default Card;

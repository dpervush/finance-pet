import React from "react";
import classNames from "classNames/bind";
import styled from "styled-components";

import styles from "./Card.module.scss";
import { useDispatch } from "react-redux";
import { deleteCard } from "../../../store/slices/cards";
import AddCardModal from "../../AddCardModal/AddCardModal";

const cx = classNames.bind(styles);

const Wrapper = styled.div`
  background-color: ${(props) => props.color};
`;

const Card = ({
  balance,
  currency,
  name,
  number,
  color,
  total,
  onClick,
  isActive,
  _id: id,
}) => {
  const dispatch = useDispatch();

  const [showActions, setShowActions] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const formatNumber = (number) => {
    const formattedNumber =
      number.slice(0, 14).replace("[0-9]*/g", "*") + " " + number.slice(15, 19);
    return formattedNumber;
  };

  const onUpdateClickHandler = () => {
    setShowModal(true);
  };
  const onDeleteClickHandler = () => dispatch(deleteCard(id));

  React.useEffect(() => {
    !isActive && setShowActions(false);
  }, [isActive]);

  return (
    <Wrapper
      color={color}
      onClick={onClick}
      className={cx({ card: true, active: true })}
    >
      <div className={styles.more} onClick={() => setShowActions(!showActions)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {showActions && (
        <div className={styles.actions}>
          <button className={styles.btn} onClick={onUpdateClickHandler}>
            Update
          </button>
          <button className={styles.btn} onClick={onDeleteClickHandler}>
            Delete
          </button>
        </div>
      )}
      <div className={styles.system}></div>
      <div className={styles.balance}>
        {currency === "USD" &&
          balance.toLocaleString("en-IN", {
            style: "currency",
            currency: "USD",
          })}
        {currency === "RUB" &&
          balance.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
            currencyDisplay: "code",
          })}
      </div>
      <div className={styles.title}>{name || formatNumber(number)}</div>
      {showModal && (
        <AddCardModal
          onClose={() => setShowModal(false)}
          initValues={{ id, balance, currency, name, number, color, total }}
          method="UPDATE"
        />
      )}
    </Wrapper>
  );
};

export default Card;

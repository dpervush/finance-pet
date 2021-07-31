import React from "react";
import classNames from "classNames/bind";
import styled from "styled-components";

import styles from "./Card.module.scss";

const cx = classNames.bind(styles);

const Wrapper = styled.div`
  background-color: ${(props) => props.color};
`;

const Card = ({ balance, name, number, color, onClick, isActive }) => {
  const formatNumber = (number) => {
    const formattedNumber =
      number.slice(0, 14).replace("[0-9]*/g", "*") + " " + number.slice(15, 19);
    return formattedNumber;
  };

  return (
    <Wrapper
      color={color}
      onClick={onClick}
      className={cx({ card: true, active: isActive })}
    >
      <div className={styles.more}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={styles.system}></div>
      <div className={styles.balance}>{balance}</div>
      <div className={styles.title}>{name || formatNumber(number)}</div>
    </Wrapper>
  );
};

export default Card;

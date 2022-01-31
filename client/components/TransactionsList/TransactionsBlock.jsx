import React from "react";
import { SwipeableList } from "@sandstreamdev/react-swipeable-list";

import TransactionItem from "./TransactionItem/TransactionItem";
import { monthNamesLong } from "../../utils/constants";
import { bodyWidth, isTouchDevice } from "../../utils";

import styles from "./TransactionBlock.module.scss";

const SwipeableWrapper = ({ children }) => {
  if (isTouchDevice || bodyWidth < 710) {
    return <SwipeableList>{children}</SwipeableList>;
  } else {
    return <div>{children}</div>;
  }
};

export const TransactionBlock = ({
  year,
  month,
  transactions,
  lastTransactionRef
}) => {
  return (
    <div className={styles.block} key={month}>
      <div className={styles.title}>{`${monthNamesLong[month]}, ${year}`}</div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.name}></div>
          <div className={styles.date}>Date</div>
          <div className={styles.gap}></div>
          <div className={styles.category}>Category</div>
          <div className={styles.card}>Card</div>
          <div className={styles.amount}>Amount</div>
        </div>
        <SwipeableWrapper>
          {transactions.map((item) => (
            <TransactionItem
              key={item.id}
              {...item}
              lastTransactionRef={lastTransactionRef}
            />
          ))}
        </SwipeableWrapper>
      </div>
    </div>
  );
};

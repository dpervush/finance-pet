import React from "react";

import { TransactionBlock } from "./TransactionsBlock";
import { useTransactionBlock } from "../../hooks/useTransactionBlock";

import styles from "./TransactionBlock.module.scss";

export const TransactionList = ({ items, lastTransactionRef }) => {
  const [parsedItems] = useTransactionBlock(items);

  return (
    <div className={styles.wrapper}>
      {parsedItems.reverse().map((yearData) => {
        return yearData.data.reverse().map((monthData) => {
          return (
            <TransactionBlock
              key={`${yearData.year}_${monthData.month}`}
              year={yearData.year}
              lastTransactionRef={lastTransactionRef}
              {...monthData}
            />
          );
        });
      })}
    </div>
  );
};

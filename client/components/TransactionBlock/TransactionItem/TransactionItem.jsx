import React from "react";
import { DeleteIcon, EditIcon } from "../../icons";

import styles from "./TransactionItem.module.scss";

const monthNamesShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const TransactionItem = ({ name, date, category, card, amount }) => {
  const formateDate = (date) =>
    `${new Date(date).getDay()} ${
      monthNamesShort[new Date(date).getMonth()]
    } ${new Date(date).getFullYear()}`;

  return (
    <div className={styles.row}>
      <div className={styles.name}>{name}</div>
      <div className={styles.date}>{formateDate(date)}</div>
      <div className={styles.gap}></div>
      <div className={styles.category}>
        <span>{category || "Groceries"}</span>
      </div>
      <div className={styles.card}>
        <span></span>
      </div>
      <div className={styles.amount}>
        <span className={styles.text}>{amount}</span>
        <div className={styles.edit}>
          <EditIcon />
        </div>
        <div className={styles.delete}>
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;

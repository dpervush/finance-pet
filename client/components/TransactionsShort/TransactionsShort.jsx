import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getRecentTransactions } from "../../store/slices/transactions";
import TransactionItem from "./TransactionItem/TransactionItem";

import styles from "./TransactionsShort.module.scss";

const TransactionsShort = () => {
  const dispatch = useDispatch();

  const { recentTransactions } = useSelector(
    ({ transactions }) => transactions
  );

  React.useEffect(() => {
    dispatch(getRecentTransactions());
  }, []);

  return (
    <div className={styles.transactions}>
      <div className={styles.header}>
        <div className={styles.title}>Transactions</div>
        <div>
          <Link href="/transactions">
            <a className={styles.all}>See All</a>
          </Link>{" "}
        </div>
      </div>
      <div className={styles.body}>
        {recentTransactions?.map((item) => (
          <TransactionItem
            key={item.id}
            date={item.date}
            type={item.type}
            amount={item.amount}
            currency={item.card.currency}
            comment={item.title}
            category={item.category.title}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionsShort;

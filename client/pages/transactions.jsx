import React from "react";
import Layout from "../containers/layout/Layout";
import TransactionBlock from "../components/TransactionBlock/TransactionBlock";

import styles from "../styles/Transactions.module.scss";
import Dropdown from "../components/UI/Dropdown/Dropdown";
import Button from "../components/UI/Button/Button";
import { PlusIcon } from "../components/icons";
import AddTransactionModal from "../components/AddTransactionModal/AddTransactionModal";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../store/slices/transactions";

const state = {
  categories: [
    {
      id: 0,
      title: "Groceries",
      selected: false,
      key: "categories",
    },
    {
      id: 1,
      title: "Transportation",
      selected: false,
      key: "categories",
    },
    {
      id: 2,
      title: "Shopping",
      selected: false,
      key: "categories",
    },
    {
      id: 3,
      title: "Investing",
      selected: false,
      key: "categories",
    },
    {
      id: 4,
      title: "Health",
      selected: false,
      key: "categories",
    },
    {
      id: 5,
      title: "Eating out",
      selected: false,
      key: "categories",
    },
  ],
  flow: [
    {
      id: 0,
      title: "All",
      selected: false,
      key: "flow",
    },
    {
      id: 1,
      title: "Income",
      selected: false,
      key: "flow",
    },
    {
      id: 2,
      title: "Expence",
      selected: false,
      key: "flow",
    },
  ],
  cards: [
    {
      id: 0,
      title: "All",
      selected: false,
      key: "cards",
    },
    {
      id: 1,
      title: "first",
      selected: false,
      key: "cards",
    },
    {
      id: 2,
      title: "second",
      selected: false,
      key: "cards",
    },
  ],
};

const Transactions = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector(({ transactions }) => transactions);

  const [dropdownState, setDropdownState] = React.useState(state);

  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    dispatch(getTransactions());
  }, []);

  const filteredTransactions = transactions.reduce((obj, current) => {
    const year = new Date(current.date).getFullYear();
    const month = new Date(current.date).getMonth();

    if (!Object.prototype.hasOwnProperty.call(obj, year)) {
      obj[year] = {};
    }
    if (!Object.prototype.hasOwnProperty.call(obj[year], month)) {
      obj[year][month] = [];
    }

    obj[year][month].push(current);

    return obj;
  }, {});

  const resetThenSet = (id, key) => {
    const temp = [...dropdownState[key]];

    temp.forEach((item) => (item.selected = false));
    temp[id].selected = true;

    setDropdownState({ ...dropdownState, [key]: temp });
  };

  return (
    <Layout>
      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
      <div className={styles.content}>
        <div className={styles.filters}>
          <div className={styles.filter}>
            <Dropdown
              title="Category"
              list={dropdownState.categories}
              resetThenSet={resetThenSet}
            />
          </div>
          <div className={styles.filter}>
            <Dropdown
              title="Flow"
              list={dropdownState.flow}
              resetThenSet={resetThenSet}
            />
          </div>
          <div className={styles.filter}>
            <Dropdown
              title="Card"
              list={dropdownState.cards}
              resetThenSet={resetThenSet}
            />
          </div>
          <div className={styles.filter}>
            <Button padding="8px" onClick={() => setShowModal(true)}>
              <PlusIcon />
            </Button>
          </div>
        </div>
        <div className={styles.transactions_list}>
          <TransactionBlock items={filteredTransactions} />
        </div>
      </div>
    </Layout>
  );
};

export default Transactions;

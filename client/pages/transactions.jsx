import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";

import Layout from "../containers/layout/Layout";
import AddTransactionModal from "../components/AddTransactionModal/AddTransactionModal";
import Button from "../components/UI/Button/Button";
import Dropdown from "../components/UI/Dropdown/Dropdown";
import { PlusIcon } from "../components/icons";
import { TransactionList } from "../components/TransactionsList/TransactionsList";

import { getCategories } from "../store/slices/categories";
import { getStatsByCategory } from "../store/slices/stats";

import { getValueFromCookie } from "../utils/getValueFromCookie";
import { useLoadTransactions } from "../hooks/useLoadTransactions";
import { useCategories } from "../hooks/useCategories";
import { useFilters } from "../hooks/useFilters";
import { useFilteredTransactions } from "../hooks/useFilteredTransactions";

import styles from "../styles/Transactions.module.scss";

const Transactions = ({ user }) => {
  const dispatch = useDispatch();
  const {
    categories: { categories },
    cards: { cards }
  } = useSelector((state) => state);

  const [showModal, setShowModal] = React.useState(false);

  const [categoriesBalanceExpense, categoriesBalanceIncome] = useCategories();
  const [filters, dropdownState, resetThenSet] = useFilters(cards, categories);
  const { transactions, loading, lastTransactionRef } =
    useLoadTransactions(filters);
  const [filteredTransactions] = useFilteredTransactions(transactions);

  React.useEffect(() => {
    dispatch(getStatsByCategory());
    dispatch(getCategories());
  }, []);

  return (
    <Layout>
      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          categoriesExpense={categoriesBalanceExpense}
          categoriesIncome={categoriesBalanceIncome}
        />
      )}
      <div className={styles.content}>
        <div className={styles.filters}>
          <div className={styles.filter}>
            {categories && (
              <Dropdown
                title="Category"
                list={dropdownState.categories}
                resetThenSet={resetThenSet}
              />
            )}
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
          {filteredTransactions && (
            <TransactionList
              items={filteredTransactions}
              lastTransactionRef={lastTransactionRef}
            />
          )}
        </div>
        {!loading &&
          filteredTransactions &&
          Object.keys(filteredTransactions).length == 0 && (
            <div className={styles.no_data}>No transactions here yet :(</div>
          )}
        {loading && (
          <div className={styles.loader}>
            <Loader type="Oval" color="#24dffe" height={60} width={60} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Transactions;

export const getServerSideProps = async (context) => {
  let isAuth = false;
  let user = {};

  const cookie = getValueFromCookie("refreshToken", context.req.headers.cookie);

  const $api = axios.create({
    withCredentials: true,
    baseURL: "http://server:8080/api"
//     baseURL: "http://localhost:8080/api"
  });

  await $api
    .get("/auth/me", { headers: { Authorization: "Bearer " + cookie } })
    .then((response) => {
      isAuth = true;
      user = response.data.currentUser;
    })
    .catch((err) => {
      console.log(err);
      isAuth = false;
    });

  if (!isAuth) {
    return {
      redirect: {
        destination: "/login"
      }
    };
  }

  return { props: { user } };
};

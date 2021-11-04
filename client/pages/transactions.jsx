import React from "react";
import { useDispatch, useSelector } from "react-redux";
import $api from "../http";

import Layout from "../containers/layout/Layout";
import TransactionBlock from "../components/TransactionBlock/TransactionBlock";
import { PlusIcon } from "../components/icons";
import AddTransactionModal from "../components/AddTransactionModal/AddTransactionModal";
import Button from "../components/UI/Button/Button";
import Dropdown from "../components/UI/Dropdown/Dropdown";

import { getCategories } from "../store/slices/categories";
import { getTransactions } from "../store/slices/transactions";
import { getValueFromCookie } from "../utils/getValueFromCookie";
import { TRANSACTIONS_PER_PAGE } from "../utils/constants";

import styles from "../styles/Transactions.module.scss";

const dropdownFlow = [
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
];
const Transactions = ({ user }) => {
  const dispatch = useDispatch();
  const {
    transactions: { transactions },
    categories: { categories },
    cards: { cards },
  } = useSelector((state) => state);

  const [activePage, setActivePage] = React.useState(1);
  const [dropdownState, setDropdownState] = React.useState({
    flow: dropdownFlow,
  });
  const [filters, setFilteres] = React.useState({
    card: null,
    category: null,
    flow: null,
  });

  const [showModal, setShowModal] = React.useState(false);

  const fetchItemsAndPages = () => {
    setActivePage(activePage + 1);
  };

  React.useEffect(() => {
    dispatch(
      getTransactions({ page: activePage, size: TRANSACTIONS_PER_PAGE })
    );
    dispatch(getCategories());
  }, []);

  React.useEffect(() => {
    const dropdownCards = cards.map((card) => ({
      id: card.id,
      title: card.name || card.number,
      selected: false,
      key: "cards",
    }));

    const dropdownCategories = categories.map((category) => ({
      id: category.id,
      title: category.title,
      selected: false,
      key: "categories",
    }));

    setDropdownState({
      ...dropdownState,
      cards: [
        {
          id: 0,
          title: "All",
          selected: false,
          key: "card",
        },
        ...dropdownCards,
      ],
      categories: [
        {
          id: 0,
          title: "All",
          selected: false,
          key: "category",
        },
        ...dropdownCategories,
      ],
    });
  }, [cards, categories]);

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

  const resetThenSet = (id, items) => {
    const temp = [...items];

    let currentFilter;
    temp.forEach((item) => {
      if (item.id === id) {
        currentFilter = id;
        return (item.selected = true);
      } else {
        return (item.selected = false);
      }
    });

    setDropdownState({ ...dropdownState, [temp[0].key]: [...temp] });
    setFilteres({ ...filters, [temp[0].key]: currentFilter });
  };

  const getFlowFilter = () => {
    let flowFilter;

    if (filters.flow === 0 || !filters.flow) {
      flowFilter = null;
    } else {
      flowFilter = filters.flow === 1 ? "Income" : "Expence";
    }

    return flowFilter;
  };

  React.useEffect(() => {
    dispatch(
      getTransactions({
        card: filters.card === 0 ? null : filters.card,
        category: filters.category === 0 ? null : filters.category,
        flow: getFlowFilter(),
        page: activePage,
        size: TRANSACTIONS_PER_PAGE,
      })
    );
  }, [filters]);

  React.useEffect(() => {
    dispatch(
      getTransactions({
        card: filters.card === 0 ? null : filters.card,
        category: filters.category === 0 ? null : filters.category,
        flow: getFlowFilter(),
        page: activePage,
        size: TRANSACTIONS_PER_PAGE,
      })
    );
  }, [activePage]);

  return (
    <Layout>
      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
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
          <TransactionBlock items={filteredTransactions} />
        </div>
        <button onClick={fetchItemsAndPages} className="btn more">
          👀
        </button>
      </div>
    </Layout>
  );
};

export default Transactions;

export const getServerSideProps = async (context) => {
  let isAuth = false;
  let user = {};

  const cookie = getValueFromCookie("refreshToken", context.req.headers.cookie);

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
        destination: "/login",
      },
    };
  }

  return { props: { user } };
};

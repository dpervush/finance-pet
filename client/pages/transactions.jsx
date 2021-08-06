import React from "react";
import Layout from "../containers/layout/Layout";
import TransactionBlock from "../components/TransactionBlock/TransactionBlock";

import styles from "../styles/Transactions.module.scss";
import Dropdown from "../components/UI/Dropdown/Dropdown";
import Button from "../components/UI/Button/Button";
import { PlusIcon } from "../components/icons";
import AddTransactionModal from "../components/AddTransactionModal/AddTransactionModal";

const transactions = [
  {
    _id: "60e444a516b94436385b280b",
    name: "ad",
    date: "Sun May 09 2021 20:21:35 GMT+0300 (MSK)",
    amount: "$1,507.31",
    cardId: "60e444a5b44f403140ec140c",
    categoryId: "60e444a5df43295b70bf38cb",
  },
  {
    _id: "60e444a565a98e0f12086302",
    name: "exercitation",
    date: "Sun Jan 10 2021 08:26:30 GMT+0300 (MSK)",
    amount: "$3,627.14",
    cardId: "60e444a50b39a4dc88c494b4",
    categoryId: "60e444a583f64badd70fdb34",
  },
  {
    _id: "60e444a563d920894ebfa4c9",
    name: "consectetur",
    date: "Sun Jun 28 2020 14:49:49 GMT+0300 (MSK)",
    amount: "$3,287.22",
    cardId: "60e444a5eb997e228f0aecf1",
    categoryId: "60e444a5cef4ad152f22fd9d",
  },
  {
    _id: "60e444a5df5a3a8eab8095db",
    name: "reprehenderit",
    date: "Tue Dec 29 2020 09:58:36 GMT+0300 (MSK)",
    amount: "$1,941.97",
    cardId: "60e444a5be8161a490b21729",
    categoryId: "60e444a545963856672d3b33",
  },
  {
    _id: "60e444a5ebf2ec9e9f61a408",
    name: "amet",
    date: "Fri Dec 03 2021 01:01:49 GMT+0300 (MSK)",
    amount: "$3,305.84",
    cardId: "60e444a54f78f38dc8c5cfe0",
    categoryId: "60e444a554c86636bfd2ad85",
  },
  {
    _id: "60e444a545b4993315e567cd",
    name: "eiusmod",
    date: "Fri Feb 21 2020 21:54:22 GMT+0300 (MSK)",
    amount: "$3,823.08",
    cardId: "60e444a5f061748dbeaefd5c",
    categoryId: "60e444a5c9f3916e6d1e1295",
  },
  {
    _id: "60e444a5ecc65dcff76d0136",
    name: "pariatur",
    date: "Sat Feb 27 2021 06:18:26 GMT+0300 (MSK)",
    amount: "$2,812.99",
    cardId: "60e444a5dab0a6fc57d65b59",
    categoryId: "60e444a59640b40241c9b8e5",
  },
  {
    _id: "60e444a5941690b998b95a3b",
    name: "eiusmod",
    date: "Tue Aug 03 2021 21:23:06 GMT+0300 (MSK)",
    amount: "$2,583.65",
    cardId: "60e444a53279e9c0c5bea73d",
    categoryId: "60e444a5cf670986991fd62b",
  },
  {
    _id: "60e444a50bdcc16b9f7166db",
    name: "ullamco",
    date: "Mon Sep 07 2020 03:06:59 GMT+0300 (MSK)",
    amount: "$1,843.56",
    cardId: "60e444a5a6da255ca1335a98",
    categoryId: "60e444a5b5c289282b9c8e3d",
  },
  {
    _id: "60e444a53a07054792cba987",
    name: "pariatur",
    date: "Sun Jun 28 2020 01:15:32 GMT+0300 (MSK)",
    amount: "$2,689.16",
    cardId: "60e444a5f3fa576233683d74",
    categoryId: "60e444a5445320d480c1e187",
  },
  {
    _id: "60e444a52514e792e264a70e",
    name: "veniam",
    date: "Thu Feb 13 2020 06:33:45 GMT+0300 (MSK)",
    amount: "$1,088.97",
    cardId: "60e444a59447b152f8bda878",
    categoryId: "60e444a5b25e9036168079a9",
  },
  {
    _id: "60e444a5f303f748b68c508d",
    name: "ipsum",
    date: "Tue Feb 09 2021 19:54:31 GMT+0300 (MSK)",
    amount: "$1,748.04",
    cardId: "60e444a516fcbb0f85fc0fa1",
    categoryId: "60e444a512b9b0066ea524e8",
  },
  {
    _id: "60e444a5a91d5d165288354a",
    name: "exercitation",
    date: "Tue May 11 2021 05:30:07 GMT+0300 (MSK)",
    amount: "$3,601.47",
    cardId: "60e444a58043ac4065e995b8",
    categoryId: "60e444a54c8b4ae4966e2f56",
  },
  {
    _id: "60e444a5e1dc2b6a97c01ae5",
    name: "et",
    date: "Sat Nov 28 2020 20:48:54 GMT+0300 (MSK)",
    amount: "$2,905.54",
    cardId: "60e444a5d5a26461f6fe718e",
    categoryId: "60e444a58e306d52c74ac189",
  },
  {
    _id: "60e444a57ba2fe0c093e5536",
    name: "cillum",
    date: "Wed Jun 02 2021 06:32:18 GMT+0300 (MSK)",
    amount: "$1,597.41",
    cardId: "60e444a5fcae7f124588cf1c",
    categoryId: "60e444a5cca495823c03a899",
  },
  {
    _id: "60e444a54b0ea10b00d63c3f",
    name: "consequat",
    date: "Mon Jul 05 2021 09:31:33 GMT+0300 (MSK)",
    amount: "$2,667.76",
    cardId: "60e444a52304b77c22159c2d",
    categoryId: "60e444a503f38f976ffe9481",
  },
  {
    _id: "60e444a552e55c1b9740d9a2",
    name: "ut",
    date: "Mon Apr 19 2021 01:47:12 GMT+0300 (MSK)",
    amount: "$2,023.43",
    cardId: "60e444a55e50387c05f545f7",
    categoryId: "60e444a5b1ecd2735c1e63cd",
  },
  {
    _id: "60e444a5e92063170006c7f2",
    name: "aliquip",
    date: "Thu Dec 16 2021 08:57:20 GMT+0300 (MSK)",
    amount: "$3,342.90",
    cardId: "60e444a5103434e1c4fcda86",
    categoryId: "60e444a52b878440510f0fc2",
  },
  {
    _id: "60e444a5d425d657e920e1f1",
    name: "cupidatat",
    date: "Fri Nov 05 2021 08:36:01 GMT+0300 (MSK)",
    amount: "$1,648.51",
    cardId: "60e444a5ae95396a6d3b6c11",
    categoryId: "60e444a50d6abcc905eb93fc",
  },
  {
    _id: "60e444a528b843818c261440",
    name: "commodo",
    date: "Fri Aug 27 2021 11:11:17 GMT+0300 (MSK)",
    amount: "$1,512.15",
    cardId: "60e444a5e3fb10d98967ce6f",
    categoryId: "60e444a5bf2682fdedb39a44",
  },
  {
    _id: "60e444a598771de3d3c972eb",
    name: "tempor",
    date: "Sat Nov 14 2020 02:37:32 GMT+0300 (MSK)",
    amount: "$2,663.07",
    cardId: "60e444a51187bd8e9749cd11",
    categoryId: "60e444a5198c141f08153a1e",
  },
  {
    _id: "60e444a588e786e5f9992a4a",
    name: "irure",
    date: "Tue Jul 21 2020 11:59:29 GMT+0300 (MSK)",
    amount: "$1,413.07",
    cardId: "60e444a527631621d19dda36",
    categoryId: "60e444a54af19abce21848bd",
  },
  {
    _id: "60e444a5151b6f658ea6cb9a",
    name: "anim",
    date: "Wed May 27 2020 14:14:02 GMT+0300 (MSK)",
    amount: "$1,123.79",
    cardId: "60e444a586bb959de4ea5ec7",
    categoryId: "60e444a5698ac96fa5563263",
  },
  {
    _id: "60e444a5bc6e97c5f2789961",
    name: "elit",
    date: "Thu Dec 30 2021 07:07:57 GMT+0300 (MSK)",
    amount: "$2,248.71",
    cardId: "60e444a5487ab1b6565559ec",
    categoryId: "60e444a56392c2bff55aa59c",
  },
];

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
  const [dropdownState, setDropdownState] = React.useState(state);

  const [showModal, setShowModal] = React.useState(false);

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
      <AddTransactionModal onClose={() => setShowModal(false)} show={showModal}>
        Hello from the modal!
      </AddTransactionModal>
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
        <TransactionBlock items={filteredTransactions} />
      </div>
    </Layout>
  );
};

export default Transactions;

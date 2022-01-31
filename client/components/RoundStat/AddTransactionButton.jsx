import React from "react";

import AddTransactionModal from "../AddTransactionModal/AddTransactionModal";
import Button from "../UI/Button/Button";
import { PlusIcon } from "../icons";
import { useCategories } from "../../hooks/useCategories";

import styles from "./RoundStat.module.scss";

export const AddTransactionButton = () => {
  const [showModal, setShowModal] = React.useState(false);

  const toggleNewTransactionModal = () => {
    setShowModal(!showModal);
  };

  const [categoriesBalanceExpense, categoriesBalanceIncome] = useCategories();

  return (
    <div>
      <div className={styles.add_transaction}>
        <Button padding="12px" onClick={toggleNewTransactionModal}>
          <PlusIcon />
        </Button>
      </div>
      {showModal && (
        <AddTransactionModal
          onClose={toggleNewTransactionModal}
          categoriesExpense={categoriesBalanceExpense}
          categoriesIncome={categoriesBalanceIncome}
        />
      )}
    </div>
  );
};

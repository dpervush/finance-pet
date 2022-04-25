import React from "react";

import AddCardModal from "../AddCardModal/AddCardModal";
import AddCategoryModal from "../AddCategoryModal/AddCategoryModal";
import ModalWindow from "../../containers/ModalWindow/ModalWindow";
import ModalWindowStyles from "../../containers/ModalWindow/ModalWindow.module.scss";

import styles from "./AddTransactionModal.module.scss";
import { useOnNestedClickOutside } from "../../hooks/useOnNestedClickOutside";
import { AddTransactionForm } from "./AddTransactionForm/AddTransactionForm";
import { useCategories } from "../../hooks/useCategories";

const AddTransactionModal = ({ show, onClose, method, initValues = {} }) => {
  const [openNewCardModal, setOpenNewCardModal] = React.useState(false);

  const onAddCardHandle = () => setOpenNewCardModal(true);
  const onCloseAddCardHandle = () => setOpenNewCardModal(false);

  const ref = React.useRef();
  useOnNestedClickOutside(ref, onClose, ModalWindowStyles);

  const [categoriesExpense, categoriesIncome] = useCategories();

  return (
    <ModalWindow show={show} onClose={onClose}>
      <div className={styles.body} ref={ref}>
        <div className={styles.title}>Add transaction</div>
        <AddTransactionForm
          method={method}
          initValues={initValues}
          categoriesExpense={categoriesExpense}
          categoriesIncome={categoriesIncome}
          onAddCardHandle={onAddCardHandle}
          onClose={onClose}
        />
      </div>
      {openNewCardModal && <AddCardModal onClose={onCloseAddCardHandle} />}
    </ModalWindow>
  );
};

export default AddTransactionModal;

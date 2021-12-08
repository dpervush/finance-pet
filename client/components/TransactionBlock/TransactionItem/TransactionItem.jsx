import React from "react";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../../store/slices/transactions";
import { formatCurrency, formatDate } from "../../../utils";
import { DeleteIcon, EditIcon } from "../../icons";
import AddTransactionModal from "../../AddTransactionModal/AddTransactionModal";

import styles from "./TransactionItem.module.scss";
import { DeleteConfirmModal } from "../../../containers/DeleteConfirmModal/DeleteConfirmModal";

const TransactionItem = ({
  id,
  title,
  date,
  category,
  card,
  amount,
  type,
  comment,
  last,
  lastTransactionRef
}) => {
  const dispatch = useDispatch();

  const onDeleteHandle = () => dispatch(deleteTransaction(id));

  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const openModal = (cb) => {
    cb(true);
  };
  const closeModal = (cb) => {
    cb(false);
  };

  return (
    <div className={styles.row} ref={last && lastTransactionRef}>
      <div className={styles.name}>{title}</div>
      <div className={styles.date}>{formatDate(date)}</div>
      <div className={styles.gap}></div>
      <div className={styles.category}>
        <span>{category.title}</span>
      </div>
      <div className={styles.card}>
        <span style={{ backgroundColor: card.color }}></span>
      </div>
      <div className={styles.amount}>
        <span className={styles.text}>
          {type === "Income"
            ? formatCurrency(amount, card.currency)
            : "-" + formatCurrency(amount, card.currency)}
        </span>
        <button
          className={styles.edit}
          onClick={() => openModal(setShowEditModal)}
        >
          <EditIcon />
        </button>
        <button
          className={styles.delete}
          onClick={() => openModal(setShowDeleteModal)}
        >
          <DeleteIcon />
        </button>
      </div>
      {showEditModal && (
        <AddTransactionModal
          show={showEditModal}
          onClose={() => closeModal(setShowEditModal)}
          initValues={{ id, amount, card, category, type, comment }}
          method="UPDATE"
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmModal
          title={"Delete transaction?"}
          onClose={() => closeModal(setShowDeleteModal)}
          onSubmit={onDeleteHandle}
        />
      )}
    </div>
  );
};

export default TransactionItem;

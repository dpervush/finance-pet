import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Image from "next/image";

import ModalWindow from "../../containers/ModalWindow/ModalWindow";
import Button from "../UI/Button/Button";
import icon from "../../public/assets/icons/shopping.svg";

import {
  selectSourse,
  selectTarget,
  setTransaction,
} from "../../store/slices/newTransactionSlice";

import styles from "./AddTransactionModal.module.scss";
import AddCategoryModal from "../AddCategoryModal/AddCategoryModal";
import { getCategories } from "../../store/slices/categories";
import { getCards } from "../../store/slices/cards";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  createTransaction,
  getTransactions,
} from "../../store/slices/transactions";

const AddTransactionModal = ({ show, onClose }) => {
  const { from, to, amount, comment } = useSelector(
    (state) => state.newTransactionForm
  );

  const dispatch = useDispatch();
  const {
    categories: { categories },
    cards: { cards },
    transactions: { transactions },
  } = useSelector((store) => store);

  const [activePage, setActivePage] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);

  React.useEffect(() => {
    dispatch(getCategories());
    dispatch(getCards());
    dispatch(getTransactions());
  }, []);

  const { register, handleSubmit, watch, reset, getValues } = useForm();

  const watchFirstBlockValues = watch(["from", "to"]);
  const watchSecondBlockValues = watch(["amount"]);

  const onSubmit = ({ from, to, comment, amount }) => {
    const selectedCard = cards.find((card) => card._id === from);
    const selectedCategory = categories.find((category) => category._id === to);

    dispatch(
      createTransaction({
        title: comment || selectedCategory.title,
        amount,
        card: selectedCard,
        category: selectedCategory,
      })
    );
    reset();
    setActivePage(0);
    onClose();
  };

  const navNextPage = () => {
    dispatch(selectSourse(getValues("from")));
    dispatch(selectTarget(getValues("to")));

    setActivePage(activePage + 1);
  };
  const navPrevPage = () => setActivePage(activePage - 1);

  const onAddCategoryHandle = () => setOpenModal(true);
  const onCloseAddCategoryHandle = () => setOpenModal(false);

  return (
    <ModalWindow show={show} onClose={onClose}>
      <div className={styles.body}>
        <div className={styles.title}>Add transaction</div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {activePage === 0 ? (
            <div className={styles.first_page}>
              <div className={styles.subtitle}>From</div>
              <div className={styles.from_block}>
                <div className={styles.from_item}>
                  <button className={styles.add_btn}>
                    <span>account</span>
                  </button>
                </div>
                {cards?.map((card) => (
                  <div key={card._id} className={styles.from_item}>
                    <label className={styles.label}>
                      <input
                        className={`${styles.radio} ${styles.visually_hidden}`}
                        {...register("from", { required: true })}
                        type="radio"
                        value={card._id}
                      />
                      {card.name}
                      <span className={styles.icon}>
                        <Image src={icon} alt="icon" />
                      </span>
                      <span className={styles.balance}>
                        {formatCurrency(card.balance, card.currency)}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
              <div className={styles.subtitle}>To</div>
              <div className={styles.to_block}>
                <div className={styles.from_item}>
                  <button
                    className={styles.add_btn}
                    onClick={onAddCategoryHandle}
                  >
                    <span>category</span>
                  </button>
                </div>
                {categories?.map((category) => (
                  <div key={category._id} className={styles.from_item}>
                    <label className={styles.label}>
                      <input
                        className={`${styles.radio} ${styles.visually_hidden}`}
                        {...register("to", { required: true })}
                        type="radio"
                        value={category._id}
                      />
                      {category.title}
                      <span className={styles.icon}>
                        <Image src={icon} alt="icon" />
                      </span>
                      <span className={styles.balance}>600</span>
                      <span className={styles.budget}>{category.budget}</span>
                    </label>
                  </div>
                ))}
              </div>
              <div className={styles.actions}>
                <Button
                  innerText="Next"
                  type="button"
                  padding="13px 35px"
                  onClick={navNextPage}
                  isDisabled={
                    !watchFirstBlockValues[0] || !watchFirstBlockValues[1]
                  }
                ></Button>
              </div>
            </div>
          ) : null}
          {activePage === 1 ? (
            <div className={styles.second_page}>
              <div className={styles.header}>
                {from} {">"} {to}
              </div>
              <div className={styles.form_item}>
                <label className={styles.label}>
                  <span>Сколько</span>
                  <input
                    className={styles.input}
                    type="number"
                    placeholder="amount"
                    {...register("amount", { required: true })}
                  />
                </label>
              </div>
              {/* TODO: сделать выбор даты */}
              <div className={styles.form_item}>
                <label className={styles.label}>
                  <span>Комментарий</span>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Оставьте комментарий"
                    {...register("comment", { maxLength: 80 })}
                  />
                </label>
              </div>

              <div className={styles.actions}>
                <Button
                  innerText="Back"
                  type="button"
                  padding="13px 35px"
                  onClick={navPrevPage}
                ></Button>
                <Button
                  innerText="Finish"
                  type="submit"
                  padding="13px 35px"
                  isDisabled={!watchSecondBlockValues[0]}
                ></Button>
              </div>
            </div>
          ) : null}
        </form>
      </div>
      {openModal && <AddCategoryModal onClose={onCloseAddCategoryHandle} />}
    </ModalWindow>
  );
};

export default AddTransactionModal;

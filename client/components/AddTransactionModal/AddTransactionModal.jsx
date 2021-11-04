import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { TypesBlock } from "./TypesBlock/TypesBlock";
import { FromBlock } from "./FromBlock/FromBlock";
import { ToBlock } from "./ToBlock/ToBlock";
import Button from "../UI/Button/Button";
import AddCardModal from "../AddCardModal/AddCardModal";
import AddCategoryModal from "../AddCategoryModal/AddCategoryModal";
import ModalWindow from "../../containers/ModalWindow/ModalWindow";
import ModalWindowStyles from "../../containers/ModalWindow/ModalWindow.module.scss";

import {
  createTransaction,
  updateTransaction,
} from "../../store/slices/transactions";

import styles from "./AddTransactionModal.module.scss";

const AddTransactionModal = ({ show, onClose, method, initValues = {} }) => {
  const dispatch = useDispatch();

  const {
    categories: { categories },
    cards: { cards },
  } = useSelector((store) => store);

  const [activePage, setActivePage] = React.useState(0);
  const [openNewCategoryModal, setOpenNewCategoryModal] = React.useState(false);
  const [openNewCardModal, setOpenNewCardModal] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const { register, handleSubmit, watch, reset, getValues } = useForm({
    defaultValues: {
      type: initValues.type || "Expense",
      from: initValues.card?.id.toString() || null,
      to: initValues.category?.id.toString() || null,
      amount: initValues.amount || null,
      comment: initValues.comment || "",
    },
  });

  const [source, target, type] = watch(["from", "to", "type"]);
  const watchSecondBlockValues = watch(["amount"]);

  const onSubmit = ({ type, from, to, comment, amount }) => {
    if (method === "UPDATE") {
      dispatch(
        updateTransaction({
          id: initValues.id,
          title: comment || selectedCategory.title,
          type,
          amount,
          cardId: selectedCard.id,
          categoryId: selectedCategory.id,
          date: new Date(),
        })
      );
    } else {
      dispatch(
        createTransaction({
          title: comment || selectedCategory.title,
          type,
          amount,
          cardId: selectedCard.id,
          categoryId: selectedCategory.id,
        })
      );
    }

    reset();
    setActivePage(0);
    onClose();
  };

  React.useEffect(() => {}, [type]);

  const navNextPage = () => {
    const fromId = getValues("from");
    const toId = getValues("to");

    const selectedFrom = cards.find((card) => card.id === +fromId);
    const selectedTo = categories.find((category) => category.id === +toId);

    setSelectedCard(selectedFrom);
    setSelectedCategory(selectedTo);

    setActivePage(activePage + 1);
  };
  const navPrevPage = () => setActivePage(activePage - 1);

  const onAddCardHandle = () => setOpenNewCardModal(true);
  const onCloseAddCardHandle = () => setOpenNewCardModal(false);

  const onAddCategoryHandle = () => setOpenNewCategoryModal(true);
  const onCloseAddCategoryHandle = () => setOpenNewCategoryModal(false);

  const ref = React.useRef();

  const handleClickOnDocument = (e) => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      ref.current?.closest("." + ModalWindowStyles.wrapper) ===
        e.target.closest("." + ModalWindowStyles.wrapper)
    ) {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOnDocument);

    return () => document.removeEventListener("click", handleClickOnDocument);
  }, []);

  return (
    <ModalWindow show={show} onClose={onClose}>
      <div className={styles.body} ref={ref}>
        <div className={styles.title}>Add transaction</div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {activePage === 0 ? (
            <div className={styles.first_page}>
              <TypesBlock register={register} />
              <FromBlock
                items={cards}
                register={register}
                onAddCardHandle={onAddCardHandle}
              />
              <ToBlock
                items={categories}
                register={register}
                onAddCategoryHandle={onAddCategoryHandle}
              />
              <div className={styles.actions}>
                <Button
                  innerText="Next"
                  type="button"
                  padding="13px 35px"
                  onClick={navNextPage}
                  isDisabled={!source || !target}
                ></Button>
              </div>
            </div>
          ) : null}
          {activePage === 1 ? (
            <div className={styles.second_page}>
              <div className={styles.header}>
                {selectedCard.name} {">"} {selectedCategory.title}
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
      {openNewCardModal && <AddCardModal onClose={onCloseAddCardHandle} />}
      {openNewCategoryModal && (
        <AddCategoryModal onClose={onCloseAddCategoryHandle} />
      )}
    </ModalWindow>
  );
};

export default AddTransactionModal;

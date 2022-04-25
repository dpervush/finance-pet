import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";

import { TypesBlock } from "./TypesBlock/TypesBlock";
import Button from "../../UI/Button/Button";

import {
  createTransaction,
  updateTransaction
} from "../../../store/slices/transactions";

import styles from "./AddTransactionForm.module.scss";
import AddCategoryModal from "../../AddCategoryModal/AddCategoryModal";

const DateBlock = dynamic(() => import("./DateBlock/DateBlock"), {
  ssr: false
});

const FromBlock = dynamic(() => import("./FromBlock/FromBlock"), {
  ssr: false
});

const ToBlock = dynamic(() => import("./ToBlock/ToBlock"), {
  ssr: false
});

export const AddTransactionForm = ({
  method,
  initValues = {},
  categoriesExpense,
  categoriesIncome,
  onAddCardHandle,
  onClose
}) => {
  const dispatch = useDispatch();
  const { cards } = useSelector(({ cards }) => cards);

  const [activePage, setActivePage] = React.useState(0);

  const [openNewCategoryModal, setOpenNewCategoryModal] = React.useState(false);

  const onAddCategoryHandle = () => setOpenNewCategoryModal(true);

  const onCloseAddCategoryHandle = () => setOpenNewCategoryModal(false);

  const { register, handleSubmit, watch, reset, getValues } = useForm({
    defaultValues: {
      type: initValues.type || "expense",
      from:
        type === "expense"
          ? initValues.card?.id.toString()
          : initValues.category?.id.toString(),
      to:
        type === "expense"
          ? initValues.category?.id.toString()
          : initValues.card?.id.toString(),
      amount: initValues.amount || null,
      comment: initValues.comment || "",
      date: initValues.date || new Date()
    }
  });

  const [source, target, type] = watch(["from", "to", "type"]);
  const watchSecondBlockValues = watch(["amount"]);

  const onSubmit = ({ type, comment, amount }) => {
    const body = {
      title: type === "expense" ? selectedTarget.title : selectedSource.title,
      type,
      amount,
      date: new Date(date),
      cardId: type === "expense" ? selectedSource.id : selectedTarget.id,
      categoryId: type === "expense" ? selectedTarget.id : selectedSource.id
    };

    if (method === "UPDATE") {
      dispatch(
        updateTransaction({
          id: initValues.id,
          ...body
        })
      );
    } else {
      dispatch(
        createTransaction({
          ...body
        })
      );
    }

    reset();
    setActivePage(0);
    onClose();
  };

  const [selectedSource, setSelectedSource] = React.useState(null);
  const [selectedTarget, setSelectedTarget] = React.useState(null);
  const [date, setDate] = React.useState(new Date());

  const navNextPage = () => {
    const fromId = getValues("from");
    const toId = getValues("to");

    let selectedFrom, selectedTo;

    if (type === "expense") {
      selectedFrom = cards.find((card) => card.id === +fromId);
      selectedTo = categoriesExpense.find((category) => category.id === +toId);
    } else {
      selectedFrom = categoriesIncome.find(
        (category) => category.id === +fromId
      );
      selectedTo = cards.find((card) => card.id === +toId);
    }

    setSelectedSource(selectedFrom);
    setSelectedTarget(selectedTo);

    setActivePage(activePage + 1);
  };
  const navPrevPage = () => setActivePage(activePage - 1);

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {activePage === 0 ? (
          <>
            <div className={styles.form_body}>
              <TypesBlock register={register} />
              {type === "expense" && (
                <>
                  <div className={styles.subtitle}>From</div>
                  <FromBlock
                    items={cards}
                    register={register}
                    fieldName="from"
                    onAddCardHandle={onAddCardHandle}
                  />
                  <div className={styles.subtitle}>To</div>
                  <ToBlock
                    items={categoriesExpense}
                    register={register}
                    fieldName="to"
                    onAddCategoryHandle={onAddCategoryHandle}
                  />
                </>
              )}
              {type === "income" && (
                <>
                  <div className={styles.subtitle}>From</div>
                  <ToBlock
                    items={categoriesIncome}
                    register={register}
                    fieldName="from"
                    onAddCategoryHandle={onAddCategoryHandle}
                  />
                  <div className={styles.subtitle}>To</div>
                  <FromBlock
                    items={cards}
                    register={register}
                    fieldName="to"
                    onAddCardHandle={onAddCardHandle}
                  />
                </>
              )}
            </div>
            <div className={styles.actions}>
              <Button
                innerText="Next"
                type="button"
                padding="7px 35px"
                onClick={navNextPage}
                isDisabled={!source || !target}
              ></Button>
            </div>
          </>
        ) : null}
        {activePage === 1 ? (
          <>
            <div className={`${styles.form_body} ${styles.second_page}`}>
              <div className={styles.header}>
                {type === "expense"
                  ? `${selectedSource.name} > ${selectedTarget.title}`
                  : `${selectedSource.title} > ${selectedTarget.name}`}
              </div>
              <div className={styles.form_item}>
                <div className={styles.subtitle}>Сколько</div>
                <label className={styles.label}>
                  <input
                    className={styles.input}
                    type="number"
                    placeholder="amount"
                    {...register("amount", { required: true })}
                  />
                </label>
              </div>
              <DateBlock
                initialDate={initValues.date}
                register={register}
                onSelectDate={setDate}
              />
              <div className={styles.form_item}>
                <div className={styles.subtitle}>Комментарий</div>
                <label className={styles.label}>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Оставьте комментарий"
                    {...register("comment", { maxLength: 80 })}
                  />
                </label>
              </div>
            </div>
            <div className={styles.actions}>
              <Button
                innerText="Back"
                type="button"
                padding="7px 35px"
                onClick={navPrevPage}
              ></Button>
              <Button
                innerText="Finish"
                type="submit"
                padding="7px 35px"
                isDisabled={!watchSecondBlockValues[0]}
              ></Button>
            </div>
          </>
        ) : null}
      </form>
      {openNewCategoryModal && (
        <AddCategoryModal onClose={onCloseAddCategoryHandle} type={type} />
      )}
    </>
  );
};

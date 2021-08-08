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

const AddTransactionModal = ({ show, onClose }) => {
  const { from, to, amount, comment } = useSelector(
    (state) => state.newTransactionForm
  );

  const dispatch = useDispatch();

  const [activePage, setActivePage] = React.useState(0);

  const { register, handleSubmit, watch, reset, getValues } = useForm();

  const watchFirstBlockValues = watch(["from", "to"]);
  const watchSecondBlockValues = watch(["amount"]);

  const onSubmit = (data) => {
    dispatch(setTransaction(data));
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
                  <label className={styles.label}>
                    <input
                      className={`${styles.radio} ${styles.visually_hidden}`}
                      {...register("from", { required: true })}
                      type="radio"
                      value="Card"
                    />
                    Card
                    <span className={styles.icon}>
                      <Image src={icon} alt="icon" />
                    </span>
                    <span className={styles.balance}>8 600 RUB</span>
                  </label>
                </div>
                <div className={styles.from_item}>
                  <label className={styles.label}>
                    <input
                      className={`${styles.radio} ${styles.visually_hidden}`}
                      {...register("from", { required: true })}
                      type="radio"
                      value="Travel"
                    />
                    Travel
                    <span className={styles.icon}>
                      <Image src={icon} alt="icon" />
                    </span>
                    <span className={styles.balance}>8 600 RUB</span>
                  </label>
                </div>
                <div className={styles.from_item}>
                  <label className={styles.label}>
                    <input
                      className={`${styles.radio} ${styles.visually_hidden}`}
                      {...register("from", { required: true })}
                      type="radio"
                      value="Shopping"
                    />
                    Shopping
                    <span className={styles.icon}>
                      <Image src={icon} alt="icon" />
                    </span>
                    <span className={styles.balance}>8 600 RUB</span>
                  </label>
                </div>
                <div className={styles.from_item}>
                  <label className={styles.label}>
                    <input
                      className={`${styles.radio} ${styles.visually_hidden}`}
                      {...register("from", { required: true })}
                      type="radio"
                      value="Savings"
                    />
                    Savings
                    <span className={styles.icon}>
                      <Image src={icon} alt="icon" />
                    </span>
                    <span className={styles.balance}>8 600 RUB</span>
                  </label>
                </div>
              </div>
              <div className={styles.subtitle}>To</div>
              <div className={styles.to_block}>
                <div className={styles.from_item}>
                  <label className={styles.label}>
                    <input
                      className={`${styles.radio} ${styles.visually_hidden}`}
                      {...register("to", { required: true })}
                      type="radio"
                      value="Groceries"
                    />
                    Groceries
                    <span className={styles.icon}>
                      <Image src={icon} alt="icon" />
                    </span>
                    <span className={styles.balance}>600</span>
                    <span className={styles.budget}>8 600</span>
                  </label>
                </div>
                <div className={styles.from_item}>
                  <label className={styles.label}>
                    <input
                      className={`${styles.radio} ${styles.visually_hidden}`}
                      {...register("to", { required: true })}
                      type="radio"
                      value="Transportation"
                    />
                    Transportation
                    <span className={styles.icon}>
                      <Image src={icon} alt="icon" />
                    </span>
                    <span className={styles.balance}>600</span>
                    <span className={styles.budget}>8 600</span>
                  </label>
                </div>
                <div className={styles.from_item}>
                  <label className={styles.label}>
                    <input
                      className={`${styles.radio} ${styles.visually_hidden}`}
                      {...register("to", { required: true })}
                      type="radio"
                      value="Beauty"
                    />
                    Beauty
                    <span className={styles.icon}>
                      <Image src={icon} alt="icon" />
                    </span>
                    <span className={styles.balance}>600</span>
                    <span className={styles.budget}>8 600</span>
                  </label>
                </div>
                <div className={styles.from_item}>
                  <label className={styles.label}>
                    <input
                      className={`${styles.radio} ${styles.visually_hidden}`}
                      {...register("to", { required: true })}
                      type="radio"
                      value="Eating out"
                    />
                    Eating out
                    <span className={styles.icon}>
                      <Image src={icon} alt="icon" />
                    </span>
                    <span className={styles.balance}>600</span>
                    <span className={styles.budget}>8 600</span>
                  </label>
                </div>
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
    </ModalWindow>
  );
};

export default AddTransactionModal;

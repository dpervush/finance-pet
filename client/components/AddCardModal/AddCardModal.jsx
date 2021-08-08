import React from "react";
import { useForm } from "react-hook-form";

import ModalWindow from "../../containers/ModalWindow/ModalWindow";
import Button from "../UI/Button/Button";

import styles from "./AddCardModal.module.scss";

const AddCardModal = ({ show, onClose }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
    onClose();
  };

  return (
    <ModalWindow show={show} onClose={onClose}>
      <div className={styles.body}>
        <div className={styles.title}>Add new card</div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.form_item} ${styles.form_item__input}`}>
            <input
              className={styles.input}
              type="text"
              placeholder="Название или номер карты"
              {...register("name", { maxLength: 80 })}
            />
            <div className={styles.icon}></div>
          </div>
          <div className={`${styles.form_item} ${styles.form_item__input}`}>
            <div className={styles.icon}></div>
            <input
              className={styles.input}
              type="number"
              placeholder="Баланс"
              {...register("budget")}
            />
          </div>
          <div className={`${styles.form_item} ${styles.form_item__color}`}>
            <div className={styles.subtitle}>Pick a color</div>
            <div className={styles.colors}>
              <label>
                <input
                  className={`${styles.radio} ${styles.visually_hidden}`}
                  {...register("color")}
                  type="radio"
                  value="#8A16FF"
                  checked
                />
                <span
                  className={styles.color}
                  style={{ backgroundColor: "#8A16FF" }}
                ></span>
              </label>
              <label>
                <input
                  className={`${styles.radio} ${styles.visually_hidden}`}
                  {...register("color")}
                  type="radio"
                  value="#FF25C2"
                />
                <span
                  className={styles.color}
                  style={{ backgroundColor: "#FF25C2" }}
                ></span>
              </label>
              <label>
                <input
                  className={`${styles.radio} ${styles.visually_hidden}`}
                  {...register("color")}
                  type="radio"
                  value="#24DFFE"
                />
                <span
                  className={styles.color}
                  style={{ backgroundColor: "#24DFFE" }}
                ></span>
              </label>
              <label>
                <input
                  className={`${styles.radio} ${styles.visually_hidden}`}
                  {...register("color")}
                  type="radio"
                  value="#FF253F"
                />
                <span
                  className={styles.color}
                  style={{ backgroundColor: "#FF253F" }}
                ></span>
              </label>
              <label>
                <input
                  className={`${styles.radio} ${styles.visually_hidden}`}
                  {...register("color")}
                  type="radio"
                  value="#2BF06C"
                />
                <span
                  className={styles.color}
                  style={{ backgroundColor: "#2BF06C" }}
                ></span>
              </label>
              <label>
                <input
                  className={`${styles.radio} ${styles.visually_hidden}`}
                  {...register("color")}
                  type="radio"
                  value="#F4FF26"
                />
                <span
                  className={styles.color}
                  style={{ backgroundColor: "#F4FF26" }}
                ></span>
              </label>
            </div>
          </div>
          <div className={`${styles.form_item} ${styles.form_item__total}`}>
            <div className={styles.subtitle}>Consider in total balance</div>
            <label>
              <input
                className={`${styles.checkbox} ${styles.visually_hidden}`}
                type="checkbox"
                placeholder="total"
                {...register("total", {})}
                checked
              />
              <span className={styles.switch}></span>
            </label>
          </div>

          <Button innerText="Create" type="submit" padding="13px 35px"></Button>
        </form>
      </div>
    </ModalWindow>
  );
};

export default AddCardModal;

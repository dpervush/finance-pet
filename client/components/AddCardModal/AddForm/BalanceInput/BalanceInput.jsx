import React from "react";

import styles from "../AddForm.module.scss";

export const BalanceInput = ({
  register,
  activeCurrency,
  toggleShowCurrencyBlock
}) => {
  return (
    <div className={`${styles.form_item} ${styles.form_item__input}`}>
      <div
        className={styles.icon}
        style={{
          backgroundImage: `url(/assets/icons/${activeCurrency.toLowerCase()}-icon.svg)`
        }}
        onClick={toggleShowCurrencyBlock}
      ></div>
      <input
        className={styles.input}
        type="number"
        placeholder="Баланс"
        {...register("balance")}
      />
    </div>
  );
};

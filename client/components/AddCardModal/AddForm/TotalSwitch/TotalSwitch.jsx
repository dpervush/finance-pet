import React from "react";

import styles from "../AddForm.module.scss";

export const TotalSwitch = ({ register }) => {
  return (
    <div className={`${styles.form_item} ${styles.form_item__total}`}>
      <div className={styles.subtitle}>Consider in total balance</div>
      <label>
        <input
          className={`${styles.checkbox} ${styles.visually_hidden}`}
          type="checkbox"
          placeholder="total"
          {...register("total", {})}
        />
        <span className={styles.switch}></span>
      </label>
    </div>
  );
};

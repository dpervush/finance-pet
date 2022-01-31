import React from "react";

import styles from "../AddForm.module.scss";

export const ColorInput = ({ register }) => {
  return (
    <div>
      <div className={`${styles.form_item} ${styles.form_item__color}`}>
        <div className={styles.subtitle}>Pick a color</div>
        <div className={styles.colors}>
          <label>
            <input
              className={`${styles.radio} ${styles.visually_hidden}`}
              {...register("color")}
              type="radio"
              value="#8A16FF"
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
    </div>
  );
};

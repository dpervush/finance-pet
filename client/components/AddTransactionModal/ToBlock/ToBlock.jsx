import React from "react";
import Image from "next/image";
import icon from "../../../public/assets/icons/shopping.svg";

import styles from "../AddTransactionModal.module.scss";
import { formatCurrency } from "../../../utils";
import CategoriesIcons from "../../icons/categoriesIcons/CategoriesIcons";

const ToBlock = ({ items, register, onAddCategoryHandle }) => {
  return (
    <>
      <div className={styles.subtitle}>To</div>
      <div className={styles.to_block}>
        <div className={styles.from_item}>
          <button
            className={styles.add_btn}
            onClick={onAddCategoryHandle}
            type="button"
          >
            <span>category</span>
          </button>
        </div>
        {items?.map(({ id, title, budget, sum }) => (
          <div key={id} className={styles.from_item}>
            <label className={styles.label}>
              <input
                className={`${styles.radio} ${styles.visually_hidden}`}
                {...register("to", { required: true })}
                type="radio"
                value={id}
              />
              <span className={styles.text}>{title}</span>
              <span className={styles.icon}>
                            <CategoriesIcons
                              name="airplane"
                              color="#fff"
                              size="16"
                            />
                <Image src={icon} alt="icon" />
              </span>
              <span className={styles.balance}>
                {formatCurrency(+sum).slice(0, -3)}
              </span>
              <span className={styles.budget}>
                {formatCurrency(+budget).slice(0, -3)}
              </span>
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default ToBlock;

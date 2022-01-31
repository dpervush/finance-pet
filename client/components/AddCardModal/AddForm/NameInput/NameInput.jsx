import React from "react";
import CategoriesIcons from "../../../icons/categoriesIcons/CategoriesIcons";

import styles from "../AddForm.module.scss";

export const NameInput = ({
  register,
  activeIcon,
  errors,
  toggleShowIconBlock
}) => {
  return (
    <div className={styles.form_block}>
      <div className={`${styles.form_item} ${styles.form_item__input}`}>
        <input
          className={styles.input}
          type="text"
          placeholder="Название или номер карты"
          {...register("name", { required: true, maxLength: 80 })}
        />
        <div className={styles.icon} onClick={toggleShowIconBlock}>
          <CategoriesIcons name={activeIcon} color="#fff" size="29" />
        </div>
      </div>
      <div className={styles.error}>
        {errors.name &&
          errors.name.type === "required" &&
          "This field is required"}
      </div>
    </div>
  );
};

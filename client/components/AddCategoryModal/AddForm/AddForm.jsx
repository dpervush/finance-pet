import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import CategoriesIcons from "../../icons/categoriesIcons/CategoriesIcons";
import { IconsBlock } from "../../UI/IconsBlock/IconsBlock";
import Button from "../../UI/Button/Button";

import { icons } from "../../../utils/constants";
import {
  createCategory,
  updateCategory
} from "../../../store/slices/categories";

import styles from "./AddForm.module.scss";

export const AddForm = ({ type, method, initValues }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: initValues || { total: true, color: "#8A16FF", type }
  });

  const [showIconsBlock, setShowIconsBlock] = React.useState(false);
  const [activeIcon, setActiveIcon] = React.useState(
    initValues?.icon || icons[0]
  );

  const handleIcon = () => {
    setActiveIcon(getValues("icon"));
    setShowIconsBlock(false);
  };

  const onSubmit = (data) => {
    method === "UPDATE"
      ? dispatch(
          updateCategory({ ...data, budget: +data.budget, id: initValues.id })
        )
      : dispatch(createCategory({ ...data, budget: +data.budget }));
    reset();
    onClose();
  };
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form_body}>
          <div className={styles.form_block}>
            <div className={`${styles.form_item} ${styles.form_item__input}`}>
              <input
                className={styles.input}
                type="text"
                placeholder="Название категории"
                {...register("title", { required: true })}
              />
              <div
                className={styles.icon}
                onClick={() => setShowIconsBlock(true)}
              >
                <CategoriesIcons name={activeIcon} color="#fff" size="16" />
              </div>
            </div>
            <div className={styles.error}>
              {errors.title &&
                errors.title.type === "required" &&
                "This field is required"}
            </div>
          </div>
          <div className={styles.form_block}>
            <div className={`${styles.form_item} ${styles.form_item__input}`}>
              <input
                className={styles.input}
                type="number"
                placeholder="Бюджет"
                {...register("budget")}
              />
            </div>
          </div>
        </div>
        <div className={styles.btn_wrapper}>
          <Button
            innerText={method === "UPDATE" ? "Update" : "Create"}
            type="submit"
            padding="7px 35px"
          ></Button>
        </div>
      </form>
      {showIconsBlock && (
        <IconsBlock
          icons={icons}
          onSubmit={handleIcon}
          register={register}
          onClose={() => setShowIconsBlock(false)}
        />
      )}
    </>
  );
};

import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import ModalWindow from "../../containers/ModalWindow/ModalWindow";
import Button from "../UI/Button/Button";

import { createCategory, updateCategory } from "../../store/slices/categories";

import styles from "./AddCategoryModal.module.scss";

const AddCategoryModal = ({ onClose, method, initValues }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: initValues || { total: true, color: "#8A16FF" }
  });

  const onSubmit = (data) => {
    method === "UPDATE"
      ? dispatch(
          updateCategory({ ...data, budget: +data.budget, id: initValues.id })
        )
      : dispatch(createCategory({ ...data, budget: +data.budget }));
    reset();
    onClose();
  };

  const contentRef = React.useRef();

  const handleClickOnDocument = (e) => {
    if (contentRef.current && !contentRef.current.contains(e.target)) {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOnDocument);

    return () => document.removeEventListener("click", handleClickOnDocument);
  }, []);

  return (
    <ModalWindow onClose={onClose}>
      <div className={styles.body} ref={contentRef}>
        <div className={styles.title}>Add category</div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form_block}>
            <div className={`${styles.form_item} ${styles.form_item__input}`}>
              <input
                className={styles.input}
                type="text"
                placeholder="Название категории"
                {...register("title", { required: true })}
              />
              <div className={styles.icon}></div>
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
              <div className={styles.icon}></div>
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
      </div>
    </ModalWindow>
  );
};

export default AddCategoryModal;

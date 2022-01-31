import React from "react";

import ModalWindow from "../../containers/ModalWindow/ModalWindow";
import ModalWindowStyles from "../../containers/ModalWindow/ModalWindow.module.scss";
import { AddForm } from "./AddForm/AddForm";

import { useOnNestedClickOutside } from "../../hooks/useOnNestedClickOutside";

import styles from "./AddCategoryModal.module.scss";

const AddCategoryModal = ({ type, method, initValues, onClose }) => {
  const contentRef = React.useRef();

  useOnNestedClickOutside(contentRef, onClose, ModalWindowStyles);

  return (
    <ModalWindow onClose={onClose}>
      <div className={styles.body} ref={contentRef}>
        <div className={styles.title}>Add category</div>
        <AddForm type={type} method={method} initValues={initValues} />
      </div>
    </ModalWindow>
  );
};

export default AddCategoryModal;

import React from "react";

import { AddForm } from "./AddForm/AddForm";
import ModalWindow from "../../containers/ModalWindow/ModalWindow";
import ModalWindowStyles from "../../containers/ModalWindow/ModalWindow.module.scss";

import styles from "./AddCardModal.module.scss";

import { useOnNestedClickOutside } from "../../hooks/useOnNestedClickOutside";

const AddCardModal = ({ onClose, method, initValues }) => {
  const contentRef = React.useRef();

  useOnNestedClickOutside(contentRef, onClose, ModalWindowStyles);

  return (
    <ModalWindow onClose={onClose}>
      <div className={styles.body} ref={contentRef}>
        <div className={styles.title}>Add new card</div>
        <AddForm method={method} initValues={initValues} />
      </div>
    </ModalWindow>
  );
};

export default AddCardModal;

import React from "react";

import ModalWindow from "../ModalWindow/ModalWindow";
import Button from "../../components/UI/Button/Button";

import { useOnNestedClickOutside } from "../../hooks/useOnNestedClickOutside";

import styles from "./DeleteConfirmModal.module.scss";
import ModalWindowStyles from "../ModalWindow/ModalWindow.module.scss";

export const DeleteConfirmModal = ({ title, children, onClose, onSubmit }) => {
  const contentRef = React.useRef();

  useOnNestedClickOutside(contentRef, onClose, ModalWindowStyles);

  return (
    <ModalWindow onClose={onClose}>
      <div className={styles.body} ref={contentRef}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{children}</div>
        <div className={styles.actions}>
          <div className={styles.btn}>
            <Button
              innerText="Cancel"
              type="button"
              padding="13px 35px"
              onClick={onClose}
            ></Button>
          </div>
          <div className={styles.btn}>
            <Button
              innerText="Delete"
              type="submit"
              padding="13px 35px"
              onClick={onSubmit}
            ></Button>
          </div>
        </div>
      </div>
    </ModalWindow>
  );
};

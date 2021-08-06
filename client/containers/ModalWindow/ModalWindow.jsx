import React from "react";
import ReactDOM from "react-dom";

import styles from "./ModalWindow.module.scss";

function ModalWindow({ show, onClose, children }) {
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <a href="#" onClick={handleCloseClick}>
          x
        </a>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")
  );
}

export default ModalWindow;

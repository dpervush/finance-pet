import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "../../components/icons";

import styles from "./ModalWindow.module.scss";

function ModalWindow({ show, onClose, children }) {
  const [isBrowser, setIsBrowser] = React.useState(false);

  React.useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <button className={styles.close} onClick={handleCloseClick}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}

export default ModalWindow;

import React from "react";
import ModalWindow from "../../containers/ModalWindow/ModalWindow";

const AddTransactionModal = ({ children, show, onClose }) => {
  return (
    <ModalWindow show={show} onClose={onClose}>
      {children}
    </ModalWindow>
  );
};

export default AddTransactionModal;

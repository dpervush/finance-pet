import React from "react";

import styles from "./Button.module.scss";

const Button = ({ innerText, onClick, padding, children }) => {
  return (
    <button
      onClick={onClick}
      className={styles.btn}
      style={{ padding: padding }}
    >
      {children}
      {innerText && <span className={styles.text}>{innerText}</span>}
    </button>
  );
};

export default Button;

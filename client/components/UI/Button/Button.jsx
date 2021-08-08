import React from "react";

import styles from "./Button.module.scss";

const Button = ({
  innerText,
  onClick,
  padding,
  children,
  isDisabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={styles.btn}
      style={{ padding: padding }}
      disabled={isDisabled}
    >
      {children && <span className={styles.icon}>{children}</span>}

      {innerText && <span className={styles.text}>{innerText}</span>}
    </button>
  );
};

export default Button;

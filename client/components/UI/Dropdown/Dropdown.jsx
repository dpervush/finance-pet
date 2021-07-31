import React from "react";

import styles from "./Dropdown.module.scss";

const Dropdown = ({ title, list, resetThenSet }) => {
  const [isListOpen, setIsListOpen] = React.useState(false);
  const [headerTitle, setHeaderTitle] = React.useState(title);

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const selectItem = (item) => {
    const { title, id, key } = item;

    setIsListOpen(false);
    setHeaderTitle(title);

    resetThenSet(id, key);
  };

  return (
    <div className={styles.wrapper}>
      <button type="button" className={styles.header} onClick={toggleList}>
        <span className={styles.header_title}>{headerTitle}</span>
      </button>
      {isListOpen && (
        <div className={styles.list}>
          {list.map((item) => (
            <button
              type="button"
              className={styles.list_item}
              key={item.id}
              onClick={() => selectItem(item)}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

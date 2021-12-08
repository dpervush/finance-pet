import React from "react";
import { useSelector } from "react-redux";
import CardsList from "../../components/CardsList/CardsList";
import Header from "../../components/Header/Header";
import { ProgressBar } from "../../components/UI/ProgressBar/ProgressBar";

import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  const {
    cards: { loading: cardsLoading }
  } = useSelector((state) => state);
  return (
    <div className={styles.layout}>
      {cardsLoading && <ProgressBar />}
      <div className={styles.wrapper}>
        <Header />
        {/* <div className={styles.bg}></div> */}
        <div className={styles.cards_list}>
          <CardsList />
        </div>
        <div className={styles.container}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;

import dynamic from "next/dynamic";

import Layout from "../containers/layout/Layout";
import ShortStat from "../components/ShortStat/ShortStat";

import styles from "../styles/Home.module.scss";
import TransactionsShort from "../components/TransactionsShort/TransactionsShort";

const BubbleStat = dynamic(() => import("../components/BubbleStat/BubbleStat"));

export default function Home() {
  return (
    <Layout>
      <div className={styles.grid}>
        <div className={styles.block}>
          <BubbleStat />
        </div>
        <div className={styles.block}></div>
        <div className={styles.block}>
          <ShortStat />
        </div>
        <div className={styles.block}>
          <TransactionsShort />
        </div>
      </div>
    </Layout>
  );
}

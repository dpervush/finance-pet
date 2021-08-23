import dynamic from "next/dynamic";

import Layout from "../containers/layout/Layout";
import ShortStat from "../components/ShortStat/ShortStat";
import TransactionsShort from "../components/TransactionsShort/TransactionsShort";

import styles from "../styles/Home.module.scss";

const BubbleStat = dynamic(
  () => import("../components/BubbleStat/BubbleStat"),
  { ssr: false }
);
const RoundStat = dynamic(() => import("../components/RoundStat/RoundStat"), {
  ssr: false,
});

export default function Home() {
  return (
    <Layout>
      <div className={styles.grid}>
        <div className={styles.block}>
          <BubbleStat />
        </div>
        <div className={styles.block}>
          <RoundStat />
        </div>
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

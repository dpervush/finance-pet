import React from "react";
import dynamic from "next/dynamic";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";

// import { CoinsIcon, PlayIcon, SettingsIcon } from "../icons";

import { getStatsByCard, getStatsByCategory } from "../../store/slices/stats";

import styles from "./RoundStat.module.scss";
import { AddTransactionButton } from "./AddTransactionButton";
import { useRoundStat } from "../../hooks/useRoundStat";

const StatConva = dynamic(() => import("./StatConva"), {
  ssr: false
});

export const RoundStat = () => {
  const dispatch = useDispatch();
  const {
    stats: { statsByCard, cardStatLoading }
  } = useSelector((store) => store);

  React.useEffect(() => {
    dispatch(getStatsByCategory());
    dispatch(getStatsByCard());
  }, []);

  const [allAmount, allAmountConsidered, cardsWithAngles] =
    useRoundStat(statsByCard);

  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.settings}>
        <Button padding="12px">
          <SettingsIcon />
        </Button>
      </div> */}
      <AddTransactionButton />
      <div className={styles.canvas}>
        {cardStatLoading && (
          <div className={styles.loader}>
            <Loader type="Oval" color="#24dffe" height={60} width={60} />
          </div>
        )}
        {!cardStatLoading && (
          <StatConva
            allAmount={allAmount}
            allAmountConsidered={allAmountConsidered}
            cardsWithAngles={cardsWithAngles}
          />
        )}
      </div>
      {/* <div className={styles.goals}>
        <div className={styles.coins}>
          <CoinsIcon />
        </div>
        <div className={styles.text}>Set new financial goals for 2021</div>
        <button className={styles.btn}>
          <PlayIcon />
        </button>
      </div> */}
    </div>
  );
};

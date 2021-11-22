import React from "react";
import { Stage, Layer, Text, Arc, Circle } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { getStatsByCard } from "../../store/slices/stats";
import { formatCurrency } from "../../utils";
import { CoinsIcon, PlayIcon, SettingsIcon } from "../icons";
import Button from "../UI/Button/Button";

import styles from "./RoundStat.module.scss";

const calcOffset = (all, index, array) => {
  if (index === 0) return 0;

  return (
    (array[index - 1].balance / all) * 360 + calcOffset(all, index - 1, array)
  );
};

const RoundStat = ({ radius = 130 }) => {
  const dispatch = useDispatch();
  const { statsByCard } = useSelector(({ stats }) => stats);

  const [allAmount, setAllAmount] = React.useState(null);
  const [allAmountConsidered, setAllAmountConsidered] = React.useState(null);
  const [cardsWithAngles, setCardsWithAngles] = React.useState(null);

  React.useEffect(() => {
    dispatch(getStatsByCard());
  }, []);

  React.useEffect(() => {
    const allMoney = statsByCard.reduce((sum, current) => {
      return sum + current.balance;
    }, 0);

    setAllAmount(allMoney);

    const allMoneyConsidered = statsByCard.reduce((sum, current) => {
      return current.total ? sum + current.balance : 0;
    }, 0);

    setAllAmountConsidered(allMoneyConsidered);

    const cardsWithAngles = statsByCard.map((card, index, array) => {
      const rotation = calcOffset(allMoney, index, array.slice(0, index));

      return { ...card, rotation };
    });

    setCardsWithAngles(cardsWithAngles);
  }, [statsByCard]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.settings}>
        <Button padding="12px">
          <SettingsIcon />
        </Button>
      </div>
      <div className={styles.canvas}>
        <Stage width={270} height={270}>
          <Layer>
            <Circle
              x={135}
              y={135}
              radius={radius}
              opacity={0.2}
              stroke="#ffffff"
              strokeWidth={6}
            />
            <Arc
              x={135}
              y={135}
              angle={(allAmountConsidered / allAmount) * 360}
              innerRadius={radius - 3}
              outerRadius={radius + 3}
              fill="#172EFF"
              rotation={-90}
              lineCap="round"
            />
            {cardsWithAngles?.map((card, index) => (
              <Arc
                key={card.id}
                x={135}
                y={135}
                innerRadius={radius - 10}
                outerRadius={radius - 16}
                lineCap="round"
                fill={card.color}
                angle={(card.balance / allAmountConsidered) * 360 - 5}
                rotation={card.rotation - 90}
              />
            ))}
            <Arc angle={160} rotation={-90} />
            <Arc angle={30} rotation={80} />
            <Text
              x={135 - radius}
              y={135 - radius / 2}
              width={radius * 2}
              align="center"
              text={"Overall"}
              fontSize={14}
              fontFamily="Montserrat"
              fill="#ffffff"
            />
            <Text
              x={135 - radius}
              y={135 - 13}
              width={radius * 2}
              align="center"
              text={
                allAmountConsidered &&
                formatCurrency(allAmountConsidered, "RUB").slice(0, -3)
              }
              fontSize={42}
              fontFamily="BebasNeue"
              fill="#ffffff"
            />
          </Layer>
        </Stage>
      </div>
      <div className={styles.goals}>
        <div className={styles.coins}>
          <CoinsIcon />
        </div>
        <div className={styles.text}>Set new financial goals for 2021</div>
        <button className={styles.btn}>
          <PlayIcon />
        </button>
      </div>
    </div>
  );
};

export default RoundStat;

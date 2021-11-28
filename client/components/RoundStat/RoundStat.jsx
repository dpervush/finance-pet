import React from "react";
import { Stage, Layer, Text, Arc, Circle } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { getStatsByCard } from "../../store/slices/stats";
import { formatCurrency } from "../../utils";
import { CoinsIcon, PlayIcon, SettingsIcon } from "../icons";
import Button from "../UI/Button/Button";

import styles from "./RoundStat.module.scss";

const calcRotationAndAngle = (cards, allMoney) => {
  const array = [...cards];

  for (let i = 0; i < array.length; i++) {
    if (i === 0) {
      array[i].rotation = 0;
      array[i].angle = (array[i].balance / allMoney) * 360;
    } else {
      array[i].rotation = array[i - 1].angle + array[i - 1].rotation;
      array[i].angle = (array[i].balance / allMoney) * 360;
    }
  }

  return array;
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
      return current.total ? sum + current.balance : sum;
    }, 0);

    let cardsConsidered = statsByCard
      .filter((card) => card.total)
      .map((item) => ({ ...item, rotation: 0, angle: 0 }));

    cardsConsidered = calcRotationAndAngle(cardsConsidered, allMoneyConsidered);

    setAllAmountConsidered(allMoneyConsidered);
    setCardsWithAngles(cardsConsidered);
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

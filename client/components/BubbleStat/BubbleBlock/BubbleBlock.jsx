import React from "react";
import { Stage, Layer, Text, Arc } from "react-konva";

import Bubble from "../Bubble/Bubble";

import styles from "../BubbleStat.module.scss";
import { useBubblesWithCoordinates } from "../hooks/useBubblesWithCoordinates";

const CANVA_HEIGHT = 390;

export const BubbleBlock = ({ data, width }) => {
  const { bubbles } = useBubblesWithCoordinates(data, width, CANVA_HEIGHT);

  return (
    <div className={styles.canvas}>
      <Stage width={width} height={CANVA_HEIGHT}>
        <Layer>
          {bubbles.map((category, index) => (
            <Bubble
              key={category.id}
              x={category.xAxis}
              y={category.yAxis}
              radius={category.radius}
              category={width > 430 ? category.title : null}
              color={category.color}
              balance={category.sum}
              budget={category.budget}
              icon={category.icon}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

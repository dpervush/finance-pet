import React from "react";
import { Stage, Layer, Text, Arc } from "react-konva";

import Bubble from "../Bubble/Bubble";

import styles from "../BubbleStat.module.scss";

export const BubbleBlock = ({ data }) => {
  const maxSum = Math.max(...data.map((item) => +item.sum));

  const renderBubbles = () => {
    return data.map((item, index, array) => {
      const radius = 40 + 20 * (item.sum / maxSum);

      const prevItem = array[index - 1] || array[0];
      const prevItemRadius = 40 + 20 * (prevItem.sum / maxSum);

      const xAxis = prevItemRadius * index + radius + 30;
      const yAxis = prevItemRadius * index + radius + 30;

      // console.log(xAxis);
      return {
        ...item,
        radius,
        x: xAxis,
        y: yAxis,
      };
    });
  };

  return (
    <div className={styles.canvas}>
      <Stage width={475} height={390}>
        <Layer>
          {renderBubbles().map((category, index) => (
            <Bubble
              key={category.id}
              x={category.radius + category.x}
              y={category.radius + category.y}
              radius={category.radius}
              category={category.title}
              color={category.color}
              balance={category.sum}
              budget={category.budget}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

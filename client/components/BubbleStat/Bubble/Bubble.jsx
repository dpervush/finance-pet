import React from "react";
import { Arc, Circle, Text, Image } from "react-konva";
import useImage from "use-image";

const Bubble = ({
  x,
  y,
  radius,
  category = "Groceries",
  balance = "8 600 RUB",
  icon = "../../../public/assets/icons/shopping.svg",
}) => {
  const [image] = useImage(icon);

  return (
    <>
      <Arc
        x={x}
        y={y}
        angle={280}
        innerRadius={radius - 1}
        outerRadius={radius + 1}
        fill="#8A16FF"
        rotation={-90}
      />
      <Circle x={x} y={y} radius={radius - 1} fill="#8A16FF" opacity={0.2} />
      <Circle
        x={x}
        y={y}
        radius={radius}
        opacity={0.1}
        stroke="#ffffff"
        strokeWidth={2}
      />
      <Text
        x={x - radius}
        y={y + radius / 5}
        width={radius * 2}
        align="center"
        text={category}
        fontStyle="bold"
        fill="#ffffff"
      />
      <Text
        x={x - radius}
        y={y + radius / 2}
        width={radius * 2}
        text={balance}
        fill="#ffffff"
        align="center"
        letterSpacing={1}
        fontStyle="bold"
        opacity={0.5}
        fontSize={10}
      />
      <Image x={x} y={y} image={image} alt="" width={50} height={50} />
    </>
  );
};

export default Bubble;

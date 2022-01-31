import React from "react";

export const useBubblesWithCoordinates = (data, width, height) => {
  const [maxSum, setMaxSum] = React.useState(0);
  const [bubbles, setBubbles] = React.useState([]);

  React.useEffect(() => {
    const maxSum = Math.max(...data.map((item) => +item.sum));

    setMaxSum(maxSum);
  }, [data]);

  React.useEffect(() => {
    renderBubbles();
  }, [maxSum]);

  const renderBubbles = () => {
    const bubblesWithoutCoordinates = [...data];

    const bubblesWithCoordinates = [];

    let intervalsCountXAxis = Math.ceil(
      Math.sqrt(bubblesWithoutCoordinates.length)
    );

    let intervalsCountYAxis = Math.ceil(
      Math.sqrt(bubblesWithoutCoordinates.length)
    );

    if (
      intervalsCountYAxis * (intervalsCountYAxis - 1) >
      bubblesWithoutCoordinates.length
    ) {
      intervalsCountYAxis -= 1;
    }

    const intervalsWidth = width / intervalsCountXAxis;

    const intervalsHeight = height / intervalsCountYAxis;

    for (let i = 0; i < bubblesWithoutCoordinates.length; i++) {
      const item = bubblesWithoutCoordinates[i];

      const radius = 40 + 20 * (item.sum / maxSum);

      const xStart = (i % intervalsCountXAxis) * intervalsWidth;
      const xEnd = ((i % intervalsCountXAxis) + 1) * intervalsWidth;

      const yStart = Math.floor(i / intervalsCountXAxis) * intervalsHeight;
      const yEnd = Math.floor(i / intervalsCountXAxis + 1) * intervalsHeight;

      const xAxis =
        xStart +
        (xEnd - xStart) / 2 +
        Math.random() * 20 * Math.pow(-1, Math.floor(Math.random() * 10));
      const yAxis =
        yStart +
        (yEnd - yStart) / 2 +
        Math.random() * 20 * Math.pow(-1, Math.floor(Math.random() * 10));

      bubblesWithCoordinates[i] = {
        ...item,
        radius,
        xAxis,
        yAxis
      };
    }

    setBubbles(bubblesWithCoordinates);
  };

  return { bubbles };
};

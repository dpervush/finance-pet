import React from "react";
import { useWindowSize } from "../../../hooks/useWindowSize";

export const useCanvasSize = () => {
  const canvasRef = React.useRef();

  const [canvasWidth, setCanvasWidth] = React.useState(0);

  const size = useWindowSize();

  React.useEffect(() => {
    const computedStyle = getComputedStyle(canvasRef.current);

    let width = canvasRef.current.clientWidth; // width with padding
    let height = canvasRef.current.clientHeight; // height with padding

    height -=
      parseFloat(computedStyle.paddingTop) +
      parseFloat(computedStyle.paddingBottom);
    width -=
      parseFloat(computedStyle.paddingLeft) +
      parseFloat(computedStyle.paddingRight);

    setCanvasWidth(width);
  }, [size]);

  return { canvasWidth, canvasRef };
};

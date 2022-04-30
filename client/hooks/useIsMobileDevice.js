import { useState, useLayoutEffect } from "react";

const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );

export default function useIsMobileDevice() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useLayoutEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  return { isMobileDevice };
}

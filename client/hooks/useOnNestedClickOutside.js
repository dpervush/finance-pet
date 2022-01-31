import React from "react";

export function useOnNestedClickOutside(ref, handler, windowStyles) {
  React.useEffect(() => {
    const listener = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        ref.current.closest("." + windowStyles.wrapper) ===
          event.target.closest("." + windowStyles.wrapper)
      ) {
        handler(event);
        return;
      }
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, windowStyles]);
}

import React from "react";

export const useShowActions = () => {
  const [actionsShown, setActionsShown] = React.useState(false);

  const closeActions = (e) => {
    e?.stopPropagation();
    setActionsShown(false);
  };
  const showActions = (e) => {
    e.stopPropagation();
    setActionsShown(true);
  };

  return [actionsShown, closeActions, showActions];
};

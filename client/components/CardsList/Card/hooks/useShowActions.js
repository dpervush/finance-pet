import React from "react";

export const useShowActions = () => {
  const [actionsShown, setActionsShown] = React.useState(false);

  const closeActions = () => setActionsShown(false);
  const showActions = () => setActionsShown(true);

  return [actionsShown, closeActions, showActions];
};

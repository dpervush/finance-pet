import React from "react";

export const useAddModal = () => {
  const [addModalShown, setShowAddModal] = React.useState(false);

  const closeAddModal = () => setShowAddModal(false);
  const openAddModal = () => setShowAddModal(true);

  return [addModalShown, closeAddModal, openAddModal];
};

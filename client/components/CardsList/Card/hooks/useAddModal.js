import React from "react";

export const useAddModal = () => {
  const [addModalShown, setShowAddModal] = React.useState(false);

  const closeAddModal = (e) => {
    e.stopPropagation();
    setShowAddModal(false);
  };
  const openAddModal = (e) => {
    e.stopPropagation();
    setShowAddModal(true);
  };

  return [addModalShown, closeAddModal, openAddModal];
};

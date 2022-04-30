import React from "react";

export const useDeleteModal = () => {
  const [deleteModalShown, setDeleteModalShown] = React.useState(false);

  const closeDeleteModal = (e) => {
    e.stopPropagation();
    setDeleteModalShown(false);
  };
  const showDeleteModal = (e) => {
    e.stopPropagation();
    setDeleteModalShown(true);
  };

  return [deleteModalShown, closeDeleteModal, showDeleteModal];
};

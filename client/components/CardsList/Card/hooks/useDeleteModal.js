import React from "react";

export const useDeleteModal = () => {
  const [deleteModalShown, setDeleteModalShown] = React.useState(false);

  const closeDeleteModal = () => setDeleteModalShown(false);
  const showDeleteModal = () => setDeleteModalShown(true);

  return [deleteModalShown, closeDeleteModal, showDeleteModal];
};

import React, { useState } from "react";

import { Modal, Typography, Button } from "neetoui";

import notesApi from "apis/notes";

export default function DeleteAlert({ refetch, onClose, selectedNoteIds }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await notesApi.destroy({ ids: selectedNoteIds });
      onClose();
      refetch();
    } catch (error) {
      logger.error(error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Modal
      isOpen
      size="md"
      submitButtonProps={{
        style: "primary",
        label: "Continue",
        loading: isDeleting,
        onClick: handleDelete
      }}
      onClose={onClose}
      closeButton={false}
    >
      <Modal.Header>
        <Typography style="h2">Delete Note</Typography>
      </Modal.Header>
      <Modal.Body>
        <Typography style="body2" lineHeight="normal">
          Are you sure you want to delete the note? This action cannot be
          undone.
        </Typography>
      </Modal.Body>
      <Modal.Footer className="space-x-2">
        <Button label="Continue" onClick={() => handleDelete()} size="large" />
        <Button
          style="text"
          label="Cancel"
          size="large"
          onClick={() => {
            onClose();
          }}
        />
      </Modal.Footer>
    </Modal>
  );
}

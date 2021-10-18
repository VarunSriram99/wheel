import React, { useState } from "react";

import { Modal, Typography, Button } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";

export default function DeleteAlert({
  onClose,
  selectedNoteIds,
  notes,
  setNotes
}) {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setDeleting(true);
      let deletedNotes = notes;
      deletedNotes.splice(
        deletedNotes.findIndex(
          element => element.createdAt == selectedNoteIds[0]
        ),
        1
      );
      setNotes(deletedNotes);
      localStorage.setItem("contacts", JSON.stringify(deletedNotes));
      onClose();
    } catch (error) {
      Logger.error(error);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <Modal
      isOpen
      size="md"
      submitButtonProps={{
        style: "primary",
        label: "Continue",
        loading: deleting,
        onClick: handleDelete
      }}
      onClose={onClose}
    >
      <Modal.Header>
        <Typography style="h2">Delete Contact</Typography>
      </Modal.Header>
      <Modal.Body>
        <Typography style="body2" lineHeight="normal">
          Are you sure you want to delete the contact? This action cannot be
          undone.
        </Typography>
      </Modal.Body>
      <Modal.Footer className="space-x-2">
        <Button label="Continue" onClick={() => handleDelete()} size="large" />
        <Button
          style="text"
          label="Cancel"
          onClick={() => {
            onClose();
          }}
          size="large"
        />
      </Modal.Footer>
    </Modal>
  );
}

import React, { useState } from "react";

import Logger from "js-logger";
import { Modal, Typography, Button } from "neetoui";

export default function DeleteAlert({
  onClose,
  selectedContactIds,
  contacts,
  setContacts
}) {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setDeleting(true);
      let deletedcontacts = contacts;
      deletedcontacts.splice(
        deletedcontacts.findIndex(
          element => element.createdAt == selectedContactIds[0]
        ),
        1
      );
      setContacts(deletedcontacts);
      localStorage.setItem("contacts", JSON.stringify(deletedcontacts));
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
      closeButton={false}
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

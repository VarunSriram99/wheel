import React, { useState } from "react";

import Logger from "js-logger";
import { Modal, Typography, Button } from "neetoui";

export default function DeleteAlert({
  onClose,
  selectedContactIds,
  contacts,
  setContacts
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
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
      closeButton={false}
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
        <Button label="Continue" size="large" onClick={() => handleDelete()} />
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

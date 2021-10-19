import React from "react";

import { Pane, Typography } from "neetoui";

import NewContactForm from "./NewContactForm";

export default function NewContactPane({
  isNewContactPaneOpen,
  setIsNewContactPaneOpen,
  setContacts,
  contacts
}) {
  const onClose = () => setIsNewContactPaneOpen(false);
  return (
    <Pane
      isOpen={isNewContactPaneOpen}
      onClose={onClose}
      size="lg"
      className="w-5/12"
    >
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Add New Contact
        </Typography>
      </Pane.Header>
      <Pane.Body>
        <div className="px-6 w-full">
          <NewContactForm
            onClose={onClose}
            setContacts={setContacts}
            contacts={contacts}
          />
        </div>
      </Pane.Body>
    </Pane>
  );
}

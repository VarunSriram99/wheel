import React from "react";

import { Pane, Typography } from "neetoui";

import Create from "./Create";

export default function NewContact({
  isNewContactPaneOpen,
  setIsNewContactPaneOpen,
  setContacts,
  contacts
}) {
  const onClose = () => setIsNewContactPaneOpen(false);
  return (
    <Pane
      size="lg"
      className="w-5/12"
      isOpen={isNewContactPaneOpen}
      onClose={onClose}
    >
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Add New Contact
        </Typography>
      </Pane.Header>
      <Pane.Body>
        <div className="px-6 w-full">
          <Create
            setContacts={setContacts}
            contacts={contacts}
            onClose={onClose}
          />
        </div>
      </Pane.Body>
    </Pane>
  );
}

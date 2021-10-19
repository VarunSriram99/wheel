import React from "react";

import { Pane, Typography } from "neetoui";

import NewContactForm from "./NewContactForm";

export default function NewContactPane({
  isNewContactPaneOpen,
  setIsNewContactPaneOpen,
  setNotes,
  notes
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
          <NewContactForm onClose={onClose} setNotes={setNotes} notes={notes} />
        </div>
      </Pane.Body>
    </Pane>
  );
}

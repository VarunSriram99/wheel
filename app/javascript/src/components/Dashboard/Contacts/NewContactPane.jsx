import React from "react";

import { Pane, Typography } from "@bigbinary/neetoui/v2";

import NewContactForm from "./NewContactForm";

export default function NewContactPane({
  showPane,
  setShowPane,
  setNotes,
  notes
}) {
  const onClose = () => setShowPane(false);
  return (
    <Pane isOpen={showPane} onClose={onClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Add New Note
        </Typography>
      </Pane.Header>
      <Pane.Body>
        <div className="px-6">
          <NewContactForm onClose={onClose} setNotes={setNotes} notes={notes} />
        </div>
      </Pane.Body>
    </Pane>
  );
}

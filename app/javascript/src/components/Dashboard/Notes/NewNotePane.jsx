import React from "react";

import { Pane, Typography } from "@bigbinary/neetoui/v2";

import NewNoteForm from "./NewNoteForm";

export default function NewNotePane({ fetchNotes, showPane, setShowPane }) {
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
          <NewNoteForm onClose={onClose} refetch={fetchNotes} />
        </div>
      </Pane.Body>
    </Pane>
  );
}

import React from "react";

import { Pane, Typography } from "neetoui";

import NewNoteForm from "./NewNoteForm";

export default function NewNotePane({
  fetchNotes,
  isNewNotePaneOpen,
  setIsNewNotePaneOpen
}) {
  const onClose = () => setIsNewNotePaneOpen(false);
  return (
    <Pane
      isOpen={isNewNotePaneOpen}
      onClose={onClose}
      size="lg"
      className="w-5/12"
    >
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Add New Note
        </Typography>
      </Pane.Header>
      <Pane.Body>
        <div className="px-6 w-full">
          <NewNoteForm onClose={onClose} refetch={fetchNotes} />
        </div>
      </Pane.Body>
    </Pane>
  );
}

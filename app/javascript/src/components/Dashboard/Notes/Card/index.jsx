import React from "react";

import Card from "./Card";

export default function Cards({
  setSelectedNoteIds,
  notes = [],
  setIsDeleteAlertOpen
}) {
  return (
    <div className="w-full px-4 py-2">
      {notes.map(note => (
        <div
          key={note.id}
          className={"cursor-pointer bg-white hover:bg-gray-50 my-2"}
        >
          <div className="flex flex-col neeto-ui-shadow-xl shadow border-solid border w-full rounded-sm my-4">
            <Card
              note={note}
              setSelectedNoteIds={setSelectedNoteIds}
              setIsDeleteAlertOpen={setIsDeleteAlertOpen}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

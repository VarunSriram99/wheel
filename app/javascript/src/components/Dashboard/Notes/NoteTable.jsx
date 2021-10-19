import React from "react";

import Logger from "js-logger";

import NoteRow from "./NoteRow";

export default function NoteTable({
  selectedNoteIds,
  setSelectedNoteIds,
  notes = [],
  setIsDeleteAlertOpen
}) {
  Logger.info(JSON.stringify(notes));
  selectedNoteIds;
  return (
    <div className="w-full px-4">
      <table className="nui-table nui-table--checkbox">
        <tbody>
          {notes.map(note => (
            <tr
              key={note.id}
              className={"cursor-pointer bg-white hover:bg-gray-50 my-2"}
            >
              <td className="flex flex-col neeto-ui-shadow-xl shadow border-solid border w-full rounded-sm my-2">
                <NoteRow
                  note={note}
                  setSelectedNoteIds={setSelectedNoteIds}
                  setIsDeleteAlertOpen={setIsDeleteAlertOpen}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React from "react";

import Logger from "js-logger";
import { Checkbox, Pagination } from "neetoui";

import NoteRow from "./ContactRow";

export default function ContactTable({
  selectedNoteIds,
  setSelectedNoteIds,
  notes = [],
  setShowDeleteAlert
}) {
  Logger.info(JSON.stringify(notes));
  selectedNoteIds;
  return (
    <div className="px-4 w-full">
      <table className="neeto-ui-table neeto-ui-table--checkbox neeto-ui-table--actions">
        <thead>
          <tr>
            <th className="px-4">
              <Checkbox name="header" />
            </th>
            <th className="px-4 text-left">Name & Role</th>
            <th className="px-4">Email</th>
            <th className="px-4">Created at</th>
            <th className="px-4 flex flex-row justify-end"></th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, id) => (
            <NoteRow
              key={id}
              note={note}
              setSelectedNoteIds={setSelectedNoteIds}
              setShowDeleteAlert={setShowDeleteAlert}
            />
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <Pagination
          count={1000}
          navigate={function noRefCheck() {}}
          pageNo={3}
          pageSize={100}
        />
      </div>
    </div>
  );
}

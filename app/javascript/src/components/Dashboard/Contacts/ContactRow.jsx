import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Avatar, Dropdown, Checkbox } from "neetoui";

function ContactRow({ note, setSelectedNoteIds, setShowDeleteAlert }) {
  function deleteHandle(e) {
    setSelectedNoteIds([e.target.id]);
    setShowDeleteAlert(true);
  }
  return (
    <>
      <tr>
        <td>
          <Checkbox />
        </td>
        <td className="flex flex-row items-center">
          <Avatar user={{ name: note.firstName + " " + note.lastName }} />
          &nbsp;&nbsp;
          <div className="flex-col flex">
            <p>{note.firstName + " " + note.lastName}</p>
            <p>{note.role}</p>
          </div>
        </td>
        <td>{note.email}</td>
        <td>
          {new Date(note.createdAt)
            .toDateString()
            .split(" ")
            .slice(1)
            .join(", ")}
        </td>
        <td className="px-4 flex flex-row justify-end">
          <Dropdown
            buttonStyle="icon"
            position="bottom-end"
            icon={MenuHorizontal}
            closeOnSelect
          >
            <li
              id={note.createdAt}
              onClick={e => {
                deleteHandle(e);
              }}
            >
              Delete
            </li>
          </Dropdown>
        </td>
      </tr>
    </>
  );
}
export default ContactRow;

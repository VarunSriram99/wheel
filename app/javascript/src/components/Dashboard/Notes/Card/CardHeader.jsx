import React from "react";

import { MenuVertical } from "neetoicons";
import { Typography, Dropdown } from "neetoui";

export default function CardHeader({ note, deleteHandle }) {
  return (
    <div className="flex justify-between ml-4 mr-2">
      <Typography style="h4">{note.title}</Typography>
      <Dropdown
        buttonStyle="icon"
        position="bottom-end"
        icon={MenuVertical}
        className="self-end"
        closeOnSelect
      >
        <li>Edit</li>
        <li
          id={note.id}
          onClick={e => {
            deleteHandle(e);
          }}
        >
          Delete
        </li>
      </Dropdown>
    </div>
  );
}

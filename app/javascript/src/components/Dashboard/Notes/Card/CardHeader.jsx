import React from "react";

import { MenuVertical } from "neetoicons";
import { Typography, Dropdown } from "neetoui";

export default function CardHeader({ title, id, deleteHandle }) {
  return (
    <div className="flex justify-between ml-4 mr-2">
      <Typography style="h4">{title}</Typography>
      <Dropdown
        buttonStyle="icon"
        position="bottom-end"
        icon={MenuVertical}
        className="self-end"
        closeOnSelect
      >
        <li>Edit</li>
        <li
          id={id}
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

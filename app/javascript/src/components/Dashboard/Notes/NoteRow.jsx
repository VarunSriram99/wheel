import React from "react";

import { Clock, MenuVertical } from "@bigbinary/neeto-icons";
import { Typography, Tag, Avatar, Dropdown } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";

function NoteRow({ note, setSelectedNoteIds, setShowDeleteAlert }) {
  function deleteHandle(e) {
    setSelectedNoteIds([e.target.id]);
    setShowDeleteAlert(true);
    Logger.log(e.target.id);
  }
  return (
    <>
      <div className="self-end">
        <Dropdown
          buttonStyle="icon"
          position="bottom-end"
          icon={MenuVertical}
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
      <div className="border-b m-3 pb-2">
        <Typography style="h3">{note.title}</Typography>
        <Typography style="body1" className="text-gray-500">
          {note.description}
        </Typography>
      </div>
      <div className="flex flex-row justify-between px-2">
        <Tag
          color="grey"
          className="bg-gray-100 text-gray-500"
          label="Getting Started"
          size="large"
        />
        <div className="flex flex-row items-center">
          <Clock color="grey" size={15} />
          &nbsp;
          {note.created_at === note.updated_at
            ? "Created " +
              parseInt((new Date() - new Date(note.created_at)) / 3600000) +
              " hours ago "
            : "Drafted " +
              parseInt((new Date() - new Date(note.updated_at)) / 3600000) +
              " hours ago "}
          &nbsp;
          <Avatar
            onClick={{
              onClick: function noRefCheck() {}
            }}
            size="small"
            user={{
              name: "neeto UI"
            }}
          />
        </div>
      </div>
    </>
  );
}
export default NoteRow;

import React from "react";

import Logger from "js-logger";
import { Clock, MenuVertical } from "neetoicons";
import { Typography, Tag, Avatar, Dropdown, Tooltip } from "neetoui";

import { useUserState } from "contexts/user";

function NoteRow({ note, setSelectedNoteIds, setIsDeleteAlertOpen }) {
  const { user } = useUserState();
  const day = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    0: "Sunday"
  };
  function deleteHandle(e) {
    setSelectedNoteIds([e.target.id]);
    setIsDeleteAlertOpen(true);
    Logger.log(e.target.id);
  }
  return (
    <>
      <div className="flex justify-between">
        <Typography style="h4" className="ml-2">
          {note.title}
        </Typography>
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
      <Typography style="body2" className="text-gray-500 border-b mx-2 pb-2">
        {note.description}
      </Typography>
      <div className="flex flex-row justify-between px-2 mt-2">
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
              name: user?.first_name + " " + user?.last_name
            }}
          />
        </div>
      </div>
    </>
  );
}
export default NoteRow;

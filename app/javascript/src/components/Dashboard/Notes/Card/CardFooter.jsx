import React from "react";

import { Clock } from "neetoicons";
import { Tag, Tooltip, Avatar, Typography } from "neetoui";

import { useUserState } from "contexts/user";

export default function CardFooter({ note }) {
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
  return (
    <div className="flex flex-row justify-between px-2 mt-2 pt-2 mx-2">
      <Tag
        color="grey"
        className="bg-gray-100 text-gray-500"
        label="Getting Started"
        size="small"
      />
      <div className="flex flex-row items-center">
        <Tooltip
          content={
            day[new Date(note.updated_at).getDay()] +
            ", " +
            (new Date(note.updated_at).getHours() > 12
              ? parseInt(new Date(note.updated_at).getHours()) - 12
              : new Date(note.updated_at).getHours()
            )
              .toString()
              .padStart(2, "0") +
            ":" +
            new Date(note.updated_at).getMinutes().toString().padStart(2, "0") +
            " " +
            (new Date(note.updated_at).getHours() > 12 ? "PM" : "AM")
          }
          followCursor="horizontal"
          placement="bottom"
        >
          <div className="flex flex-row items-center">
            <Clock color="grey" size={15} />
            &nbsp;
            <Typography style="body3">
              {note.created_at === note.updated_at
                ? "Created " +
                  parseInt((new Date() - new Date(note.created_at)) / 3600000) +
                  " hours ago "
                : "Drafted " +
                  parseInt((new Date() - new Date(note.updated_at)) / 3600000) +
                  " hours ago "}
            </Typography>
            &nbsp;
          </div>
        </Tooltip>
        <Avatar
          size="small"
          user={{
            name: user?.first_name + " " + user?.last_name
          }}
        />
      </div>
    </div>
  );
}

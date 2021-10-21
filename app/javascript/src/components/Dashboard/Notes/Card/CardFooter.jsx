import React from "react";

import dayjs from "dayjs";
import { Clock } from "neetoicons";
import { Tag, Tooltip, Avatar, Typography } from "neetoui";

import { useUserState } from "contexts/user";

export default function CardFooter({ created_at, updated_at }) {
  const dateDifference = () => {
    const currentDate = dayjs();
    return created_at === updated_at
      ? `Created ${dayjs
          .duration(currentDate.diff(dayjs(created_at)))
          .asHours()
          .toFixed(0)} hours ago`
      : `Drafted ${dayjs
          .duration(currentDate.diff(dayjs(updated_at)))
          .asHours()
          .toFixed(0)} hours ago`;
  };
  const { user } = useUserState();
  var duration = require("dayjs/plugin/duration");
  dayjs.extend(duration);
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
          content={dayjs(updated_at).format("dddd, hh:mm A")}
          followCursor="horizontal"
          placement="bottom"
        >
          <div className="flex flex-row items-center">
            <Clock color="grey" size={15} />
            &nbsp;
            <Typography style="body3">{dateDifference()}</Typography>
            &nbsp;
          </div>
        </Tooltip>
        <Avatar
          size="small"
          user={{
            name: `${user?.first_name} ${user?.last_name}`
          }}
        />
      </div>
    </div>
  );
}

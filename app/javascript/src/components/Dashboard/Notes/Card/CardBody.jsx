import React from "react";

import { Typography } from "neetoui";

export default function CardBody({ note }) {
  return (
    <Typography style="body2" className="text-gray-500 border-b mx-4 pb-2">
      {note.description}
    </Typography>
  );
}

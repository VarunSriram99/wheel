import React from "react";

import { Typography } from "neetoui";

export default function CardBody({ description = "" }) {
  return (
    <Typography style="body2" className="text-gray-500 border-b mx-4 pb-2">
      {description}
    </Typography>
  );
}

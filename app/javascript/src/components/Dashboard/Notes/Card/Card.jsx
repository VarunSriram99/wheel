import React from "react";

import Logger from "js-logger";

import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";

function Card({ note, setSelectedNoteIds, setIsDeleteAlertOpen }) {
  function deleteHandle(e) {
    setSelectedNoteIds([e.target.id]);
    setIsDeleteAlertOpen(true);
    Logger.log(e.target.id);
  }
  return (
    <div className="py-4">
      <CardHeader note={note} deleteHandle={deleteHandle} />
      <CardBody note={note} />
      <CardFooter note={note} />
    </div>
  );
}
export default Card;

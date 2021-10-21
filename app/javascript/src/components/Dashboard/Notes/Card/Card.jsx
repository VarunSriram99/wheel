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
      <CardHeader title={note.title} id={note.id} deleteHandle={deleteHandle} />
      <CardBody description={note.description} />
      <CardFooter created_at={note.created_at} updated_at={note.updated_at} />
    </div>
  );
}
export default Card;

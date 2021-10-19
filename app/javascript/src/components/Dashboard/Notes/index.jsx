import React, { useState, useEffect } from "react";

import { Button, PageLoader } from "@bigbinary/neetoui/v2";
import EmptyNotesListImage from "images/EmptyNotesList";
import { Header, SubHeader } from "neetoui/layouts";

import notesApi from "apis/notes";
import EmptyState from "components/Common/EmptyState";

import DeleteAlert from "./DeleteAlert";
import NewNotePane from "./NewNotePane";
import NoteTable from "./NoteTable";

const Notes = () => {
  const [loading, setLoading] = useState(true);
  const [showNewNotePane, setShowNewNotePane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const [notes, setNotes] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await notesApi.fetch();
      setNotes(response.data.notes);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col w-full">
      <Header
        title="All Notes"
        menuBarToggle={() => {
          alert("Clicked");
        }}
        actionBlock={
          <div className="flex flex-row justify-center">
            <SubHeader
              className="w-80 mx-5"
              searchProps={{
                value: searchString,
                onChange: e => setSearchString(e.target.value),
                clear: () => setSearchString("")
              }}
            />

            <br />
            <Button
              onClick={() => setShowNewNotePane(true)}
              label="Add Note"
              icon="ri-add-line"
              style="primary"
              size="large"
            />
          </div>
        }
        toggleMenu={() => {}}
      />
      {notes.length ? (
        <>
          <NoteTable
            selectedNoteIds={selectedNoteIds}
            setSelectedNoteIds={setSelectedNoteIds}
            notes={notes}
            setShowDeleteAlert={setShowDeleteAlert}
          />
        )}
      </div>
      <NewNotePane
        showPane={showNewNotePane}
        setShowPane={setShowNewNotePane}
        fetchNotes={fetchNotes}
      />
      {showDeleteAlert && (
        <DeleteAlert
          selectedNoteIds={selectedNoteIds}
          onClose={() => setShowDeleteAlert(false)}
          refetch={fetchNotes}
        />
      )}
    </div>
  );
};

export default Notes;

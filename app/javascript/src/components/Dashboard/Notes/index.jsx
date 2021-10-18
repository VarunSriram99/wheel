import React, { useState, useEffect } from "react";

import { Search, Settings, Plus } from "@bigbinary/neeto-icons";
import { Button, PageLoader, Typography, Input } from "@bigbinary/neetoui/v2";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";
import { Header } from "@bigbinary/neetoui/v2/layouts";
import EmptyNotesListImage from "images/EmptyNotesList";
import Logger from "js-logger";

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

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await notesApi.fetch();
      setNotes(response.data.notes);
    } catch (error) {
      Logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="w-full flex">
      <MenuBar showMenu="true" title="Notes">
        <MenuBar.Block label="All" count={200} active />
        <MenuBar.Block label="Users" count={80} />
        <MenuBar.Block label="Leads" count={60} />
        <MenuBar.Block label="Visitors" count={60} />

        <MenuBar.SubTitle
          iconProps={[
            {
              icon: () => <Search size={20} />
            }
          ]}
        >
          <Typography
            component="h4"
            style="h5"
            textTransform="uppercase"
            weight="bold"
          >
            Segments
          </Typography>
        </MenuBar.SubTitle>
        <MenuBar.Block label="Europe" count={80} />
        <MenuBar.Block label="Middle-East" count={60} />
        <MenuBar.Block label="Asia" count={60} />
        <MenuBar.SubTitle
          iconProps={[
            {
              icon: () => <Settings size={20} />
            },
            {
              icon: () => <Plus size={20} />
            },
            {
              icon: () => <Search size={20} />
            }
          ]}
        >
          <Typography
            component="h4"
            style="h5"
            textTransform="uppercase"
            weight="bold"
          >
            Tags
          </Typography>
        </MenuBar.SubTitle>
        <MenuBar.Block label="Sales" count={80} />
        <MenuBar.Block label="Finance" count={60} />
        <MenuBar.Block label="User Experience" count={60} />
      </MenuBar>
      <div className="flex flex-col">
        <Header
          title="All Notes"
          menuBarToggle={() => {}}
          actionBlock={
            <div className="flex flex-row items-center mr-4">
              <Input
                className="w-80"
                prefix={<Search size={16} />}
                placeholder={"Search Name, Email, Phone Number, Ect."}
              />
              <br />
              <Button
                onClick={() => setShowNewNotePane(true)}
                label="Add Note"
                icon="ri-add-line"
                style="primary"
                size="large"
                className="ml-2"
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
          </>
        ) : (
          <EmptyState
            image={EmptyNotesListImage}
            title="Looks like you don't have any notes!"
            subtitle="Add your notes to send customized emails to them."
            primaryAction={() => setShowNewNotePane(true)}
            primaryActionLabel="Add New Note"
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

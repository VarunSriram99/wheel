import React, { useState, useEffect } from "react";

import EmptyNotesListImage from "images/EmptyNotesList";
import Logger from "js-logger";
import { Search } from "neetoicons";
import { Button, PageLoader, Typography, Input } from "neetoui";
import { MenuBar, Header } from "neetoui/layouts";

import notesApi from "apis/notes";
import EmptyState from "components/Common/EmptyState";

import Cards from "./Card";
import { MENUBAR_ICON_PROPS } from "./constants";
import DeleteAlert from "./DeleteAlert";
import NewNote from "./NewNote";

const Notes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isNewNotePaneOpen, setIsNewNotePaneOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await notesApi.fetch();
      setNotes(response.data.notes);
    } catch (error) {
      Logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="w-full flex">
      <MenuBar showMenu={isFilterMenuOpen} title="Notes">
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
        <MenuBar.SubTitle iconProps={MENUBAR_ICON_PROPS}>
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
      <div className="flex flex-col w-full">
        <Header
          title="All Notes"
          menuBarToggle={() => {
            setIsFilterMenuOpen(!isFilterMenuOpen);
          }}
          actionBlock={
            <div className="flex flex-row items-center mr-4">
              <Input
                className="w-80"
                prefix={<Search size={16} />}
                placeholder="Search Name, Email, Phone Number, Ect."
              />
              <br />
              <Button
                onClick={() => setIsNewNotePaneOpen(true)}
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
            <Cards
              setSelectedNoteIds={setSelectedNoteIds}
              notes={notes}
              setIsDeleteAlertOpen={setIsDeleteAlertOpen}
            />
          </>
        ) : (
          <EmptyState
            image={EmptyNotesListImage}
            title="Looks like you don't have any notes!"
            subtitle="Add your notes to send customized emails to them."
            primaryAction={() => setIsNewNotePaneOpen(true)}
            primaryActionLabel="Add New Note"
          />
        )}
      </div>
      <NewNote
        isNewNotePaneOpen={isNewNotePaneOpen}
        setIsNewNotePaneOpen={setIsNewNotePaneOpen}
        fetchNotes={fetchNotes}
      />
      {isDeleteAlertOpen && (
        <DeleteAlert
          selectedNoteIds={selectedNoteIds}
          refetch={fetchNotes}
          onClose={() => setIsDeleteAlertOpen(false)}
        />
      )}
    </div>
  );
};

export default Notes;

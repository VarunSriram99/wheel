import React, { useState, useEffect } from "react";

import EmptyNotesListImage from "images/EmptyNotesList";
import { Search, Settings, Plus } from "neetoicons";
import { Button, PageLoader, Typography, Input } from "neetoui";
import { MenuBar, Header } from "neetoui/layouts";

import EmptyState from "components/Common/EmptyState";

import ContactTable from "./ContactTable";
import DeleteAlert from "./DeleteAlert";
import NewContactPane from "./NewContactPane";

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [isNewContactPaneOpen, setIsNewContactPaneOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("contacts")) {
      setNotes([
        {
          firstName: "Ronald",
          lastName: "Richards",
          email: "albert@borer.com",
          role: "Owner",
          createdAt: new Date()
        },
        {
          firstName: "Jacob",
          lastName: "Jones",
          email: "albert@borer.com",
          role: "Owner",
          createdAt: new Date()
        },
        {
          firstName: "Ronald",
          lastName: "Richards",
          email: "albert@borer.com",
          role: "Owner",
          createdAt: new Date()
        },
        {
          firstName: "Jacob",
          lastName: "Jones",
          email: "albert@borer.com",
          role: "Owner",
          createdAt: new Date()
        }
      ]);
      localStorage.setItem("contacts", notes);
    } else {
      setNotes(JSON.parse(localStorage.getItem("contacts")));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-row w-full">
        <MenuBar showMenu="true" title="Contacts">
          <MenuBar.Block label="All" count={0} active />
          <MenuBar.Block label="Archived" count={0} />
          <MenuBar.Block label="Completed" count={0} />
          <MenuBar.Block label="Phase 2" count={0} />

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
        </MenuBar>
        <div className="flex flex-col w-full">
          <Header
            title="All Contacts"
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
                  onClick={() => setIsNewContactPaneOpen(true)}
                  label="Add Contact"
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
              <ContactTable
                selectedNoteIds={selectedNoteIds}
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
              primaryAction={() => setIsNewContactPaneOpen(true)}
              primaryActionLabel="Add New Note"
            />
          )}
        </div>
      </div>
      <NewContactPane
        isNewContactPaneOpen={isNewContactPaneOpen}
        setIsNewContactPaneOpen={setIsNewContactPaneOpen}
        setNotes={setNotes}
        notes={notes}
      />
      {isDeleteAlertOpen && (
        <DeleteAlert
          selectedNoteIds={selectedNoteIds}
          notes={notes}
          setNotes={setNotes}
          onClose={() => setIsDeleteAlertOpen(false)}
        />
      )}
    </div>
  );
};

export default Contacts;

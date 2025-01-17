import React, { useState, useEffect } from "react";

import EmptyNotesListImage from "images/EmptyNotesList";
import Logger from "js-logger";
import { Search } from "neetoicons";
import { Button, PageLoader, Typography, Input } from "neetoui";
import { MenuBar, Header } from "neetoui/layouts";

import EmptyState from "components/Common/EmptyState";

import { MENUBAR_ICON_PROPS, CONTACTS_SEED_DATA } from "./constants";
import ContactTable from "./ContactTable";
import DeleteAlert from "./DeleteAlert";
import NewContact from "./NewContact";

const Contacts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isNewContactPaneOpen, setIsNewContactPaneOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(true);

  useEffect(() => {
    try {
      if (!localStorage.getItem("contacts")) {
        setContacts(CONTACTS_SEED_DATA);
        localStorage.setItem("contacts", contacts);
      } else {
        setContacts(JSON.parse(localStorage.getItem("contacts")));
      }
    } catch (error) {
      Logger.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-row w-full">
        <MenuBar showMenu={isFilterMenuOpen} title="Contacts">
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
        </MenuBar>
        <div className="flex flex-col w-full">
          <Header
            title="All Contacts"
            menuBarToggle={() => {
              setIsFilterMenuOpen(!isFilterMenuOpen);
            }}
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
          {contacts.length ? (
            <>
              <ContactTable
                selectedContactIds={selectedContactIds}
                setSelectedContactIds={setSelectedContactIds}
                contacts={contacts}
                setIsDeleteAlertOpen={setIsDeleteAlertOpen}
              />
            </>
          ) : (
            <EmptyState
              image={EmptyNotesListImage}
              title="Looks like you don't have any contacts!"
              subtitle="Add your contacts to send customized emails to them."
              primaryAction={() => setIsNewContactPaneOpen(true)}
              primaryActionLabel="Add New Note"
            />
          )}
        </div>
      </div>
      <NewContact
        isNewContactPaneOpen={isNewContactPaneOpen}
        setIsNewContactPaneOpen={setIsNewContactPaneOpen}
        setContacts={setContacts}
        contacts={contacts}
      />
      {isDeleteAlertOpen && (
        <DeleteAlert
          selectedContactIds={selectedContactIds}
          contacts={contacts}
          setContacts={setContacts}
          onClose={() => setIsDeleteAlertOpen(false)}
        />
      )}
    </div>
  );
};

export default Contacts;

import React from "react";

import { Checkbox, Pagination } from "neetoui";

import ContactRow from "./ContactRow";

export default function ContactTable({
  selectedContactIds,
  setSelectedContactIds,
  contacts = [],
  setIsDeleteAlertOpen
}) {
  selectedContactIds;
  return (
    <div className="px-4 w-full">
      <table className="neeto-ui-table neeto-ui-table--checkbox neeto-ui-table--actions">
        <thead>
          <tr>
            <th className="px-4">
              <Checkbox name="header" />
            </th>
            <th className="px-4 text-left">Name & Role</th>
            <th className="px-4">Email</th>
            <th className="px-4">Created at</th>
            <th className="px-4 flex flex-row justify-end"></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, id) => (
            <ContactRow
              key={id}
              contact={contact}
              setSelectedContactIds={setSelectedContactIds}
              setIsDeleteAlertOpen={setIsDeleteAlertOpen}
            />
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <Pagination
          count={1000}
          navigate={function noRefCheck() {}}
          pageNo={3}
          pageSize={100}
        />
      </div>
    </div>
  );
}

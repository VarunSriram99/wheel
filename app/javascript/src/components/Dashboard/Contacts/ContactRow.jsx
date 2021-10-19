import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Avatar, Dropdown, Checkbox } from "neetoui";

function ContactRow({ contact, setSelectedContactIds, setIsDeleteAlertOpen }) {
  function deleteHandle(e) {
    setSelectedContactIds([e.target.id]);
    setIsDeleteAlertOpen(true);
  }
  return (
    <>
      <tr>
        <td>
          <Checkbox />
        </td>
        <td className="flex flex-row items-center">
          <Avatar user={{ name: contact.firstName + " " + contact.lastName }} />
          &nbsp;&nbsp;
          <div className="flex-col flex">
            <p>{contact.firstName + " " + contact.lastName}</p>
            <p>{contact.role}</p>
          </div>
        </td>
        <td>{contact.email}</td>
        <td>
          {new Date(contact.createdAt)
            .toDateString()
            .split(" ")
            .slice(1)
            .join(", ")}
        </td>
        <td className="px-4 flex flex-row justify-end">
          <Dropdown
            buttonStyle="icon"
            position="bottom-end"
            icon={MenuHorizontal}
            closeOnSelect
          >
            <li
              id={contact.createdAt}
              onClick={e => {
                deleteHandle(e);
              }}
            >
              Delete
            </li>
          </Dropdown>
        </td>
      </tr>
    </>
  );
}
export default ContactRow;

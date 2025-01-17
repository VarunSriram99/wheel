import React from "react";

import { Settings, Plus, Search } from "neetoicons";
import * as yup from "yup";

export const MENUBAR_ICON_PROPS = [
  {
    icon: () => <Settings size={20} />
  },
  {
    icon: () => <Plus size={20} />
  },
  {
    icon: () => <Search size={20} />
  }
];

export const CONTACTS_SEED_DATA = [
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
];

export const ROLE_FIELD_OPTIONS = [
  {
    label: "Owner",
    value: "Owner"
  },
  {
    label: "Employee",
    value: "Employee"
  }
];
export const FORMIK_INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  createdAt: new Date()
};
export const FORMIK_VALIDATION_SCHEMA = {
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().required("Email is required"),
  role: yup.object().required("Role is required")
};

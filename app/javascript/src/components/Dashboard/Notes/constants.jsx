import React from "react";

import { Settings, Plus, Search } from "neetoicons";
import * as yup from "yup";

export const ASSIGNED_CONTACT_OPTIONS = [
  {
    label: "Contact 1",
    value: "contact1"
  },
  {
    label: "Contact 2",
    value: "contact2"
  },
  {
    label: "Contact 3",
    value: "contact3"
  }
];
export const TAG_OPTIONS = [
  {
    label: "Getting Started",
    value: "gs"
  },
  {
    label: "Onboarding",
    value: "ob"
  },
  {
    label: "User Flow",
    value: "uf"
  },
  {
    label: "UX",
    value: "ux"
  },
  {
    label: "Bugs",
    value: "bg"
  },
  {
    label: "V2",
    value: "v2"
  }
];
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
export const FORMIK_INITIAL_VALUES = {
  title: "",
  description: ""
};
export const FORMIK_VALIDATION_SCHEMA = {
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required")
};

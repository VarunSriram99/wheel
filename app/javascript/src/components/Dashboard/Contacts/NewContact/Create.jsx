import React from "react";

import classNames from "classnames";
import { Formik, Form } from "formik";
import { Check } from "neetoicons";
import { Button } from "neetoui";
import { Input, Select } from "neetoui/formik";
import * as yup from "yup";

export default function Create({ onClose, setContacts, contacts }) {
  const roleOptions = [
    {
      label: "Owner",
      value: "Owner"
    },
    {
      label: "Employee",
      value: "Employee"
    }
  ];
  const formikValidationSchema = {
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().required("Email is required"),
    role: yup.object().required("Role is required")
  };
  const formikInitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    createdAt: new Date()
  };
  const handleSubmit = values => {
    try {
      let editedValues = values;
      editedValues.role = editedValues.role.value;
      setContacts([...contacts, editedValues]);
      localStorage.setItem(
        "contacts",
        JSON.stringify([...contacts, editedValues])
      );
      onClose();
    } catch (err) {
      logger.error(err);
    }
  };
  return (
    <Formik
      initialValues={formikInitialValues}
      onSubmit={handleSubmit}
      validationSchema={yup.object(formikValidationSchema)}
      className="h-full w-full p-0"
    >
      {({ isSubmitting }) => (
        <Form className="h-full w-full p-0">
          <div
            className={classNames(
              "flex",
              "flex-col",
              "w-full",
              "justify-between",
              "h-full"
            )}
          >
            <div className="px-10">
              <div className="flex flex-row mb-8 mt-4">
                <Input
                  label="First Name"
                  name="firstName"
                  className="mr-3"
                  placeholder="Enter first name"
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  className="ml-3"
                  placeholder="Last first name"
                  required
                />
              </div>
              <Input
                label="Email"
                name="email"
                className="my-8"
                placeholder="Enter your email address"
                required
              />
              <Select
                label="Role"
                name="role"
                required
                options={roleOptions}
                placeholder="Select Role"
                className="my-8"
              />
            </div>
            <div className="nui-pane__footer nui-pane__footer--absolute my-4 border-t-2 p-8 mb-20 w-full">
              <Button
                type="submit"
                label="Save Changes"
                size="large"
                style="primary"
                className="ml-2"
                icon={Check}
                disabled={isSubmitting}
                loading={isSubmitting}
              />

              <Button
                label="Cancel"
                size="large"
                style="text"
                onClick={onClose}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

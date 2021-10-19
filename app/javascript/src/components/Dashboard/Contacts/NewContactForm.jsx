import React from "react";

import { Formik, Form } from "formik";
import { Check } from "neetoicons";
import { Button } from "neetoui";
import { Input, Select } from "neetoui/formik";
import * as yup from "yup";

export default function NewContactForm({ onClose, setContacts, contacts }) {
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
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        createdAt: new Date()
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        email: yup.string().required("Email is required"),
        role: yup.object().required("Role is required")
      })}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="flex flex-row">
            <Input
              label="First Name"
              name="firstName"
              className="mb-6 mr-3"
              placeholder="Enter first name"
              required
            />
            <Input
              label="Last Name"
              name="lastName"
              className="mb-6 ml-3"
              placeholder="Last first name"
              required
            />
          </div>
          <Input
            label="Email"
            name="email"
            className="mb-6"
            placeholder="Enter your email address"
            required
          />
          <Select
            label="Role"
            name="role"
            required
            options={[
              {
                label: "Owner",
                value: "Owner"
              },
              {
                label: "Employee",
                value: "Employee"
              }
            ]}
            placeholder="Select Role"
            className="my-4 w-96"
          />

          <div className="nui-pane__footer nui-pane__footer--absolute my-4">
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
              onClick={onClose}
              label="Cancel"
              size="large"
              style="text"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

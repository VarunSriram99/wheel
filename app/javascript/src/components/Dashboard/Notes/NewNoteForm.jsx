import React from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Button, Select } from "@bigbinary/neetoui/v2";
import { Input, Textarea } from "@bigbinary/neetoui/v2/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";

import notesApi from "apis/notes";

export default function NewNoteForm({ onClose, refetch }) {
  const handleSubmit = async values => {
    try {
      await notesApi.create(values);
      refetch();
      onClose();
    } catch (err) {
      logger.error(err);
    }
  };
  return (
    <Formik
      initialValues={{
        title: "",
        description: ""
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required")
      })}
    >
      {({ isSubmitting }) => (
        <Form>
          <Input
            label="Title"
            name="title"
            size="large"
            className="mb-6 w-full"
            placeholder="Enter title"
            required
          />
          <Textarea
            placeholder="Enter note description"
            label="Description"
            name="description"
            rows={1}
            required
          />
          <Select
            label="Assigned Contact"
            required
            options={[
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
            ]}
            placeholder="Select Role"
            className="my-4"
          />
          <Select
            label="Tags"
            required
            options={[
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
            ]}
            placeholder="Select Role"
            className="my-4"
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

import React from "react";

import classNames from "classnames";
import { Formik, Form } from "formik";
import { Check } from "neetoicons";
import { Button, Select } from "neetoui";
import { Input, Textarea } from "neetoui/formik";
import * as yup from "yup";

import notesApi from "apis/notes";

import {
  FORMIK_INITIAL_VALUES,
  FORMIK_VALIDATION_SCHEMA,
  ASSIGNED_CONTACT_OPTIONS,
  TAG_OPTIONS
} from "../constants";

export default function Create({ onClose, refetch }) {
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
      initialValues={FORMIK_INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={yup.object(FORMIK_VALIDATION_SCHEMA)}
      className="h-full"
    >
      {({ isSubmitting }) => (
        <Form className="h-full">
          <div
            className={classNames(
              "flex",
              "flex-col",
              "w-full",
              "justify-between",
              "h-full"
            )}
          >
            <div className="px-12">
              <Input
                label="Title"
                name="title"
                size="large"
                className="mb-8 mt-4 w-full"
                placeholder="Enter title"
                required
              />
              <Textarea
                placeholder="Enter note description"
                label="Description"
                name="description"
                className="my-8"
                rows={1}
                required
              />
              <Select
                label="Assigned Contact"
                required
                options={ASSIGNED_CONTACT_OPTIONS}
                placeholder="Select Role"
                className="my-8"
              />
              <Select
                label="Tags"
                required
                options={TAG_OPTIONS}
                placeholder="Select Role"
                className="my-8"
              />
            </div>
            <div className="nui-pane__footer nui-pane__footer--absolute mb-20 justify-self-end border-t-2 p-8">
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

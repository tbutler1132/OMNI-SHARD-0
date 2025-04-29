"use client";

import { useState } from "react";
import { View } from "../../types/ontology/view";
import { createEntity, updateEntity } from "../../lib/ontology/actions";
import { FieldInput } from "../FieldInput";

interface FormRendererProps {
  view: View;
  initialValues?: Record<string, unknown>;
  mode?: "create" | "edit";
}

export function FormRenderer({
  view,
  initialValues = {},
  mode = "create",
}: FormRendererProps) {
  const [formState, setFormState] =
    useState<Record<string, unknown>>(initialValues);

  const handleChange = (field: string, value: unknown) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (view.actions && view.actions.length > 0) {
      const actionId = view.actions[0];
      console.log("Action ID:", actionId);
      console.log("Form State:", formState);

      if (mode === "create") {
        await createEntity(view.targetEntity, formState);
      } else if (mode === "edit") {
        if (!initialValues?.id) {
          console.warn("No ID provided for edit mode.");
          return;
        }
        await updateEntity(
          view.targetEntity,
          initialValues.id as string,
          formState
        );
      }
    } else {
      console.warn("No action linked to View. Cannot submit form.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      {view.fields.map((fieldName) => {
        const override = view.fieldOverrides?.[fieldName];
        const inputType = override?.inputType ?? "text";
        const value = formState[fieldName] ?? "";

        return (
          <FieldInput
            key={fieldName}
            fieldName={fieldName}
            inputType={inputType}
            value={value}
            onChange={handleChange}
            override={override}
          />
        );
      })}

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        {mode === "edit" ? "Update" : "Create"}
      </button>
    </form>
  );
}

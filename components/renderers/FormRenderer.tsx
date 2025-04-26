"use client";

import { useState } from "react";
import { View } from "../../types/ontology/view"; // your generated View types
// import { createEntity } from "@/lib/create-entity";

interface FormRendererProps {
  view: View;
}

export function FormRenderer({ view }: FormRendererProps) {
  const [formState, setFormState] = useState<Record<string, unknown>>({});

  const handleChange = (field: string, value: unknown) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Optionally call a Function linked in view.actions[0]
    if (view.actions && view.actions.length > 0) {
      const actionId = view.actions[0];
      console.log("Action ID:", actionId);
      console.log("Form State:", formState);
      //   await createEntity(view.targetEntity, formState, actionId);
    } else {
      console.warn("No action linked to View. Cannot submit form.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      {view.fields.map((fieldName) => {
        const override = view.fieldOverrides?.[fieldName];
        const inputType = override?.inputType ?? "text";

        if (inputType === "select") {
          return (
            <div key={fieldName} className="flex flex-col">
              <label className="text-sm font-medium">{fieldName}</label>
              <select
                className="border p-2 rounded"
                onChange={(e) => handleChange(fieldName, e.target.value)}
              >
                {override?.options?.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (inputType === "datetime") {
          return (
            <div key={fieldName} className="flex flex-col">
              <label className="text-sm font-medium">{fieldName}</label>
              <input
                type="datetime-local"
                className="border p-2 rounded"
                onChange={(e) => handleChange(fieldName, e.target.value)}
              />
            </div>
          );
        }

        return (
          <div key={fieldName} className="flex flex-col">
            <label className="text-sm font-medium">{fieldName}</label>
            <input
              type="text"
              className="border p-2 rounded"
              onChange={(e) => handleChange(fieldName, e.target.value)}
            />
          </div>
        );
      })}
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}

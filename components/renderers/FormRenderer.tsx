"use client";

import { useState } from "react";
import { View } from "../../types/ontology/view";
import { createEntity, updateEntity } from "../../lib/actions";
import { FieldInput } from "../FieldInput";
import styles from "./FormRenderer.module.css";

interface FormRendererProps {
  view: View;
  initialValues?: Record<string, unknown>;
  mode?: "create" | "edit";
  onSuccess?: () => void;
  onError?: (err: Error) => void;
  referenceOptions?: Record<string, { id: string; label: string }[]>;
}

export function FormRenderer({
  view,
  initialValues = {},
  mode = "create",
  onSuccess,
  onError,
  referenceOptions = {},
}: FormRendererProps) {
  const [formState, setFormState] =
    useState<Record<string, unknown>>(initialValues);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: unknown) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      if (view.actions && view.actions.length > 0) {
        if (mode === "create") {
          await createEntity(view.targetEntity, formState);
        } else if (mode === "edit") {
          if (!initialValues?.id) {
            throw new Error("No ID provided for edit mode.");
          }
          await updateEntity(
            view.targetEntity,
            initialValues.id as string,
            formState
          );
        }
        setStatus("success");
        if (onSuccess) onSuccess();
      } else {
        throw new Error("No action linked to View.");
      }
    } catch (err) {
      setStatus("error");
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      if (onError && err instanceof Error) onError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formWrapper}>
      {status === "success" && (
        <div className={styles.success}>✅ Saved successfully!</div>
      )}

      {status === "error" && error && (
        <div className={styles.error}>⚠️ {error}</div>
      )}

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
            options={referenceOptions[fieldName]}
          />
        );
      })}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={status === "submitting"}
      >
        {status === "submitting"
          ? "Saving..."
          : mode === "edit"
          ? "Update"
          : "Create"}
      </button>
    </form>
  );
}

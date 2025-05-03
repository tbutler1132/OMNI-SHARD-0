"use client";

import { useEffect, useState } from "react";

interface FieldInputProps {
  fieldName: string;
  inputType: string;
  value: unknown;
  onChange: (field: string, value: unknown) => void;
  override?: { options?: string[] };
  targetEntity?: string;
}

export function FieldInput({
  fieldName,
  inputType,
  value,
  onChange,
  override,
  targetEntity,
}: FieldInputProps) {
  const [options, setOptions] = useState<{ id: string; label: string }[]>([]);

  //TODO: Use react-query or swr for data fetching
  useEffect(() => {
    if (inputType === "reference-select" && targetEntity) {
      fetch(`/api/reference-options?entity=${targetEntity}`)
        .then((res) => res.json())
        .then((opts) => setOptions(opts));
    }
  }, [inputType, targetEntity]);

  switch (inputType) {
    case "select":
      return (
        <div className="flex flex-col">
          <label className="text-sm font-medium">{fieldName}</label>
          <select
            className="border p-2 rounded"
            value={value as string}
            onChange={(e) => onChange(fieldName, e.target.value)}
          >
            <option value="">Select...</option>
            {override?.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      );

    case "reference-select":
      return (
        <div className="flex flex-col">
          <label className="text-sm font-medium">{fieldName}</label>
          <select
            className="border p-2 rounded"
            value={value as string}
            onChange={(e) => onChange(fieldName, e.target.value)}
          >
            <option value="">Select...</option>
            {options.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );

    case "checkbox":
      return (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(fieldName, e.target.checked)}
          />
          <label className="text-sm font-medium">{fieldName}</label>
        </div>
      );

    case "datetime":
      return (
        <div className="flex flex-col">
          <label className="text-sm font-medium">{fieldName}</label>
          <input
            type="datetime-local"
            className="border p-2 rounded"
            value={value as string}
            onChange={(e) => onChange(fieldName, e.target.value)}
          />
        </div>
      );

    default:
      return (
        <div className="flex flex-col">
          <label className="text-sm font-medium">{fieldName}</label>
          <input
            type="text"
            className="border p-2 rounded"
            value={value as string}
            onChange={(e) => onChange(fieldName, e.target.value)}
          />
        </div>
      );
  }
}

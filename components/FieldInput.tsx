"use client";

interface FieldInputProps {
  fieldName: string;
  inputType: string;
  value: unknown;
  onChange: (field: string, value: unknown) => void;
  override?: { options?: string[] };
  options?: { id: string; label: string }[];
}

export function FieldInput({
  fieldName,
  inputType,
  value,
  onChange,
  override,
  options = [],
}: FieldInputProps) {
  switch (inputType) {
    case "select":
      return (
        <div className="flex flex-col">
          <label className="text-sm font-medium">{fieldName}</label>
          <select
            className="border p-2 rounded"
            value={(value as string) || ""}
            onChange={(e) => onChange(fieldName, e.target.value)}
          >
            <option value="">Select...</option>
            {override?.options?.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );

    case "number":
      return (
        <div className="flex flex-col">
          <label className="text-sm font-medium">{fieldName}</label>
          <input
            type="number"
            className="border p-2 rounded"
            value={value as number}
            onChange={(e) => onChange(fieldName, Number(e.target.value))}
          />
        </div>
      );

    case "checkbox":
      return (
        <div className="flex flex-row items-center space-x-2">
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

    case "json-editor":
      return (
        <div className="flex flex-col">
          <label className="text-sm font-medium">{fieldName}</label>
          <textarea
            className="border p-2 rounded font-mono text-sm"
            rows={5}
            value={JSON.stringify(value ?? {}, null, 2)}
            onChange={(e) => {
              try {
                onChange(fieldName, JSON.parse(e.target.value));
              } catch (err) {
                console.error("Invalid JSON", err);
              }
            }}
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

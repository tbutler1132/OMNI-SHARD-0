type FieldInputProps = {
  fieldName: string;
  inputType: string;
  value: string | number;
  onChange: (fieldName: string, value: string | number) => void;
};

const FieldInput = ({
  fieldName,
  inputType,
  value,
  onChange,
}: FieldInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{fieldName}</label>

      {inputType === "text" && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(fieldName, e.target.value)}
          className="border rounded px-2 py-1"
        />
      )}

      {inputType === "number" && (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(fieldName, Number(e.target.value))}
          className="border rounded px-2 py-1"
        />
      )}

      {/* Add more input types here (checkbox, select, etc.) */}
    </div>
  );
};

export default FieldInput;

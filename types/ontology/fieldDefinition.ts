export interface FieldDefinition {
  id: string;
  name: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "datetime"
    | "enum"
    | "reference"
    | "reference[]"
    | "object"
    | "object[]"
    | "string[]";
  optional?: boolean;
  requires_human?: boolean;
  auto_populated?: boolean;
  input_type?: string;
  output_type?: string;
  max_length?: number;
  enum_values?: string[];
  determination_rules?: object;
  governed_by?: string;
  description?: string;
  prompt?: string;
  schema_version: number;
  created_at?: string;
  updated_at?: string;
}

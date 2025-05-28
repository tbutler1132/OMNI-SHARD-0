import { FieldDefinition } from "./entityTypes";

export type ObjectType = {
  id: string;
  name: string;
  fields: FieldDefinition[];
};

export const objectTypes: Record<string, ObjectType> = {
  Step: {
    id: "Step",
    name: "Step",
    fields: [
      { kind: "primitive", name: "label", type: "string" },
      { kind: "primitive", name: "order", type: "number" },
      { kind: "reference", name: "assignee", type: "User" },
    ],
  },
  FormSection: {
    id: "FormSection",
    name: "FormSection",
    fields: [
      { kind: "primitive", name: "heading", type: "string" },
      { kind: "primitive", name: "description", type: "string" },
      { kind: "primitive", name: "visible", type: "boolean" },
    ],
  },
  BehaviorInputs: {
    id: "BehaviorInputs",
    name: "BehaviorInputs",
    fields: [
      { kind: "primitive", name: "inputKey", type: "string" },
      { kind: "primitive", name: "inputType", type: "string" },
    ],
  },
  BehaviorStep: {
    id: "BehaviorStep",
    name: "BehaviorStep",
    fields: [
      { kind: "primitive", name: "action", type: "string" },
      { kind: "object", name: "input", type: "BehaviorInputs" },
    ],
  },
};

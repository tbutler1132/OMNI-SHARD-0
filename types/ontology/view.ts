export interface View {
  id: string;
  entity: "View";
  version: number;
  name: string;
  description?: string;
  targetEntity: string;
  layout: "list" | "board" | "calendar" | "gallery" | string;

  fields: string[];
  fieldOverrides?: {
    [fieldName: string]: {
      inputType?: string;
      options?: string[];
      target?: string;
    };
  };

  filters: {
    field: string;
    operator:
      | "equals"
      | "notEquals"
      | "in"
      | "notIn"
      | "isNull"
      | "isNotNull"
      | "gt"
      | "lt"
      | "gte"
      | "lte"
      | "contains";
    value?: string | number | boolean | string[] | number[];
  }[];

  sort?: {
    field: string;
    order: "asc" | "desc";
  }[];

  groupBy?: {
    field: string;
    order?: string[];
    labels?: Record<string, string>;
  };

  subGroupBy?: {
    field: string;
    order?: string[];
    labels?: Record<string, string>;
  };

  actions?: string[];
  rendererComponent?: string | null;
  schemaVersion: number;
}

export interface FieldOverride {
  inputType: "text" | "select" | "datetime" | "number" | "textarea";
  options?: string[]; // Only for selects
}

export interface SortOrder {
  field: string;
  direction: "asc" | "desc";
}

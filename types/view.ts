export interface View {
  id: string;
  type: "View";
  essence: {
    name: string;
    description: string;
    targetEntityType: string;
    layout: "list" | "grid" | "table";
  };
}

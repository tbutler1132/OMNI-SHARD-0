import { Entity } from "@/types/entity";

type FormRendererProps = {
  entityType: Entity<"EntityType">[];
};

const FormRenderer = ({ entityType }: FormRendererProps) => {
  console.log("FormRenderer data:", entityType[0].essence.traits);
  return <div>FormRenderer</div>;
};

export default FormRenderer;

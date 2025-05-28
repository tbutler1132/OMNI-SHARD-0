"use client";

import { AnyEntity, Entity } from "@/types/entity";
import FieldInput from "../FieldInput"; // assuming you already have this

type FormRendererProps = {
  data: AnyEntity[];
};

const FormRenderer = ({ data }: FormRendererProps) => {
  const views = data.filter((e) => e.type === "View") as Entity<"View">[];
  const entityTypes = data.filter(
    (e) => e.type === "EntityType"
  ) as Entity<"EntityType">[];
  const traits = data.filter((e) => e.type === "Trait") as Entity<"Trait">[];

  if (!views.length) return <div>⚠️ No view found</div>;
  const view = views[0];
  const targetEntityTypeName = view.essence.targetEntityType;

  const targetEntityType = entityTypes.find(
    (et) => et.essence.name === targetEntityTypeName
  );

  if (!targetEntityType) return <div>⚠️ No matching EntityType for view</div>;

  const traitIds = targetEntityType.essence.traits || [];
  const formTraits = traits.filter((t) => traitIds.includes(t.id));

  return (
    <form className="space-y-4 p-4">
      <h2 className="text-xl font-semibold">{view.essence.name}</h2>

      {formTraits.map((trait) => (
        <FieldInput
          key={trait.id}
          fieldName={trait.essence.name}
          inputType={trait.essence.type}
          value={""}
          onChange={(name, value) => {
            console.log(`[CHANGE] ${name} →`, value);
            // Later: update form state here
          }}
        />
      ))}

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Submit
      </button>
    </form>
  );
};

export default FormRenderer;

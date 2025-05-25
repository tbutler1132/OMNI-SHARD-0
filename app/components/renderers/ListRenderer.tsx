import { AnyEntity } from "@/types/entity";

type ListRendererProps<T extends AnyEntity> = {
  data: T[];
};

const ListRenderer = <T extends AnyEntity>({ data }: ListRendererProps<T>) => {
  return (
    <div className="space-y-4">
      {data.map((entity) => (
        <div key={entity.id} className="border p-4 rounded shadow">
          {Object.entries(entity.essence).map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong> <span>{renderValue(value)}</span>
            </div>
          ))}
          <br />
        </div>
      ))}
    </div>
  );
};

function renderValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}

export default ListRenderer;

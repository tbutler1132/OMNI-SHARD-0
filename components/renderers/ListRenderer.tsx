// components/renderers/ListRenderer.tsx

interface ListRendererProps {
  view: { fields: string[] }; //TODO: Define the proper type for view
  data: Record<string, unknown>[];
}

export function ListRenderer({ view, data }: ListRendererProps) {
  const fields = view.fields; // Array of field names to show

  return (
    <div className="space-y-4">
      {data.map((entity) => (
        <div key={entity.id as string} className="border p-4 rounded shadow">
          {fields.map((field: string) => (
            <div key={field} className="mb-2">
              <span className="font-semibold capitalize">{field}:</span>{" "}
              <span>{String(entity[field] ?? "")}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

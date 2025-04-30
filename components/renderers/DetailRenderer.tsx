import { View } from "@/types/ontology/view";

interface DetailRendererProps {
  view: View;
  data: Record<string, string | number | boolean | null | undefined>;
}

export function DetailRenderer({ view, data }: DetailRendererProps) {
  return (
    <div className="space-y-4 p-4">
      {view.fields.map((field) => {
        const value = data[field];
        const label = field.charAt(0).toUpperCase() + field.slice(1);

        return (
          <div key={field} className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">{label}</span>
            <span className="text-base text-gray-900">{String(value)}</span>
          </div>
        );
      })}
    </div>
  );
}

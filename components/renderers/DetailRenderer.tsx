import { View } from "@/types/ontology/view";
import styles from "./DetailRenderer.module.css";

interface DetailRendererProps {
  view: View;
  data: Record<string, string | number | boolean | null | undefined>;
}

export function DetailRenderer({ view, data }: DetailRendererProps) {
  return (
    <div className={styles.wrapper}>
      {view.fields.map((field) => {
        const value = data[field];
        const label = field.charAt(0).toUpperCase() + field.slice(1);

        return (
          <div key={field} className={styles.fieldBlock}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{String(value)}</span>
          </div>
        );
      })}
    </div>
  );
}

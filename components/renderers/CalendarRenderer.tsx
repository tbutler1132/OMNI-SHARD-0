import { View } from "@/types/ontology/view";
import styles from "./CalendarRenderer.module.css";
import Link from "next/link";
import { groupBy } from "lodash";

interface CalendarRendererProps {
  view: View;
  data: Record<string, string | number | boolean | null | undefined>[];
}

export function CalendarRenderer({ view, data }: CalendarRendererProps) {
  const groupedByDate = groupBy(data, (item) => {
    const raw = item["time"];
    if (!raw) return "(unscheduled)";

    let parsed: Date;

    if (typeof raw === "string") {
      parsed = new Date(raw);
    } else if (typeof raw === "object" && raw !== null) {
      parsed = raw;
    } else {
      parsed = new Date(String(raw));
    }

    return parsed.toISOString().split("T")[0];
  });

  return (
    <div className={styles.calendarWrapper}>
      {Object.entries(groupedByDate).map(([date, items]) => (
        <div key={date} className={styles.dayColumn}>
          <h3 className={styles.dateHeader}>{date}</h3>
          {items.map((item) => (
            <Link
              key={String(item.id)}
              href={`/${view.targetEntity}/${item.id}`}
              className={styles.eventCard}
            >
              {view.fields.map((field) => (
                <div key={field} className={styles.eventField}>
                  <strong>{field}:</strong> {String(item[field])}
                </div>
              ))}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

import { View } from "@/types/ontology/view";
import styles from "./CalendarGridRenderer.module.css";
import Link from "next/link";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
} from "date-fns";
import { groupBy } from "lodash";

interface CalendarGridRendererProps {
  view: View;
  data: Record<string, string | number | boolean | null | undefined>[];
  date?: Date; // optional anchor month
}

export function CalendarGridRenderer({
  view,
  data,
  date = new Date(),
}: CalendarGridRendererProps) {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 0 });

  const days: Date[] = [];
  let current = start;
  while (current <= end) {
    days.push(current);
    current = addDays(current, 1);
  }

  const groupedByDate = groupBy(data, (item) => {
    const raw = item["time"];
    const parsed = raw ? new Date(String(raw)) : null;
    return parsed ? format(parsed, "yyyy-MM-dd") : "(unscheduled)";
  });

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.headerRow}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className={styles.headerCell}>
            {d}
          </div>
        ))}
      </div>
      <div className={styles.gridBody}>
        {days.map((day) => {
          const key = format(day, "yyyy-MM-dd");
          const items = groupedByDate[key] || [];

          return (
            <div key={key} className={styles.dayCell}>
              <div className={styles.dateNumber}>{format(day, "d")}</div>
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
          );
        })}
      </div>
    </div>
  );
}

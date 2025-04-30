import styles from "./BoardRenderer.module.css";
import { groupBy } from "lodash";
import { View } from "@/types/ontology/view";

interface BoardRendererProps {
  view: View;
  data: Record<string, string | number | boolean | null | undefined>[];
}

export function BoardRenderer({ view, data }: BoardRendererProps) {
  const groupField = view.groupBy?.field;
  const subGroupField = view.subGroupBy?.field;

  const groupOrder = view.groupBy?.order || [];
  const groupLabels = view.groupBy?.labels || {};

  const subGroupOrder = view.subGroupBy?.order || [];
  const subGroupLabels = view.subGroupBy?.labels || {};

  const grouped = groupBy(
    data,
    (item) => item[groupField ?? ""] ?? "(unassigned)"
  );

  const renderCard = (
    item: Record<string, string | number | boolean | null | undefined>
  ) => (
    <div key={String(item.id)} className={styles.card}>
      {view.fields.map((field) => (
        <div key={field} className={styles.cardField}>
          <strong>{field}:</strong> {String(item[field])}
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.boardWrapper}>
      {(groupOrder.length > 0 ? groupOrder : Object.keys(grouped)).map(
        (groupKey) => {
          const items = grouped[groupKey] || [];
          const subGrouped = groupBy(
            items,
            (item) => item[subGroupField ?? ""] ?? "(unassigned)"
          );

          return (
            <div key={groupKey} className={styles.column}>
              <h2 className={styles.columnHeader}>
                {groupLabels[groupKey] ?? groupKey}
              </h2>

              {subGroupField ? (
                <div className={styles.subGroupWrapper}>
                  {(subGroupOrder.length > 0
                    ? subGroupOrder
                    : Object.keys(subGrouped)
                  ).map((subKey) => (
                    <div key={subKey} className={styles.subGroup}>
                      <h3 className={styles.subGroupHeader}>
                        {subGroupLabels[subKey] ?? subKey}
                      </h3>
                      {subGrouped[subKey]
                        ? subGrouped[subKey].map(renderCard)
                        : null}
                    </div>
                  ))}
                </div>
              ) : (
                <div>{items.map(renderCard)}</div>
              )}
            </div>
          );
        }
      )}
    </div>
  );
}

import { query } from "./db";
import { AnyEntity } from "@/types/entity";

type FilterValue = string | string[];
type Filters = Record<string, FilterValue>;

export async function loadEntities(
  type: string,
  filters?: Filters
): Promise<AnyEntity[]> {
  let queryText = `SELECT * FROM entity WHERE type = $1`;
  const queryParams: (string | string[])[] = [type];
  const filterClauses: string[] = [];

  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      const paramIndex = queryParams.length + 1;

      if (key === "id") {
        if (Array.isArray(value)) {
          queryText += ` AND id = ANY($${paramIndex})`;
          queryParams.push(value);
        } else {
          queryText += ` AND id = $${paramIndex}`;
          queryParams.push(value);
        }
      } else {
        if (Array.isArray(value)) {
          throw new Error(`Array filters are only supported for 'id'.`);
        }

        filterClauses.push(`essence->>'${key}' = $${paramIndex}`);
        queryParams.push(value);
      }
    }

    if (filterClauses.length > 0) {
      queryText += ` AND ` + filterClauses.join(" AND ");
    }
  }

  const rows = await query(queryText, queryParams);
  return rows;
}

export async function loadEntityById(id: string) {
  const rows = await query(`SELECT * FROM entity WHERE id = $1`, [id]);
  return rows;
}

import { query } from "./db";
import { AnyEntity } from "@/types/entity";

/**
 * @semantic Behavior
 * @id behavior-load-entities
 * @description Loads entities from the database.
 */
export async function loadEntities(
  type: string,
  filters?: Record<string, string>
): Promise<AnyEntity[]> {
  let queryText = `SELECT * FROM entity WHERE type = $1`;
  const queryParams: string[] = [type];

  if (filters) {
    const filterClauses = Object.entries(filters).map(([key, value]) => {
      const paramIndex = queryParams.length + 1;
      queryParams.push(value);
      return `essence->>'${key}' = $${paramIndex}`;
    });

    queryText += ` AND ` + filterClauses.join(" AND ");
  }

  const rows = await query(queryText, queryParams);
  return rows;
}

export async function loadEntityById(id: string) {
  const rows = await query(`SELECT * FROM entity WHERE id = $1`, [id]);
  return rows;
}

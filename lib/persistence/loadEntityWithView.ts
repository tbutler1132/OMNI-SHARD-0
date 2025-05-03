import { View } from "@/types/ontology/view";
import { query } from "@/lib/db";

function buildWhereClause(filters: View["filters"]): {
  sql: string;
  params: unknown[];
} {
  if (!filters || filters.length === 0) return { sql: "", params: [] };

  const conditions: string[] = [];
  const params: unknown[] = [];

  filters.forEach((f) => {
    const field = f.field;
    const paramIndex = `$${params.length + 1}`;

    switch (f.operator) {
      case "equals":
        conditions.push(`${field} = ${paramIndex}`);
        params.push(f.value);
        break;
      case "notEquals":
        conditions.push(`${field} != ${paramIndex}`);
        params.push(f.value);
        break;
      case "in":
        conditions.push(`${field} = ANY(${paramIndex})`);
        params.push(f.value);
        break;
      case "notIn":
        conditions.push(`NOT (${field} = ANY(${paramIndex}))`);
        params.push(f.value);
        break;
      case "isNull":
        conditions.push(`${field} IS NULL`);
        break;
      case "isNotNull":
        conditions.push(`${field} IS NOT NULL`);
        break;
      case "gt":
        conditions.push(`${field} > ${paramIndex}`);
        params.push(f.value);
        break;
      case "lt":
        conditions.push(`${field} < ${paramIndex}`);
        params.push(f.value);
        break;
      case "gte":
        conditions.push(`${field} >= ${paramIndex}`);
        params.push(f.value);
        break;
      case "lte":
        conditions.push(`${field} <= ${paramIndex}`);
        params.push(f.value);
        break;
      case "contains":
        conditions.push(`${field} ILIKE ${paramIndex}`);
        params.push(`%${f.value}%`);
        break;
      default:
        break;
    }
  });

  return {
    sql: `WHERE ${conditions.join(" AND ")}`,
    params,
  };
}

function buildOrderClause(sort: View["sort"]): string {
  if (!sort || sort.length === 0) return "";
  return `ORDER BY ` + sort.map((s) => `${s.field} ${s.order}`).join(", ");
}

export async function loadEntityWithView(view: View) {
  const table = view.targetEntity;
  const where = buildWhereClause(view.filters);
  const order = buildOrderClause(view.sort);

  const queryStr = `SELECT * FROM ${table} ${where.sql} ${order}`;
  const result = await query(queryStr, where.params);
  return result;
}

"use server";

import { query } from "@/lib/db";

export async function getReferenceOptions(entityType: string) {
  const rows = await query(
    `SELECT id, title FROM ${entityType.toLowerCase()} ORDER BY created_at DESC LIMIT 100`
  );
  return rows.map((row) => ({
    id: row.id,
    label: row.title ?? row.name ?? row.id,
  }));
}

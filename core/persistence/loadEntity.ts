import { query } from "./db";
import { View } from "@/types/view";

export const loadEntityById = async (id: string) => {
  const rows = await query(`SELECT * FROM entity WHERE id = $1`, [id]);
  return rows[0];
};

export const loadEntitiesWithView = async (view: View) => {
  const rows = await query(`SELECT * FROM entity WHERE type = $1`, [
    view.essence.targetEntityType,
  ]);
  return rows;
};

import { query } from "./db";
import { Entity } from "@/types/entity";

export const loadEntityById = async (id: string) => {
  const rows = await query(`SELECT * FROM entity WHERE id = $1`, [id]);
  return rows[0];
};

export const loadEntitiesWithView = async (view: Entity<"View">) => {
  const rows = await query(`SELECT * FROM entity WHERE type = $1`, [
    view.essence.targetEntityType,
  ]);
  return rows;
};

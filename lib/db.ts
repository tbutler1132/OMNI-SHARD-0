// lib/ontology/db.ts

import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Set this in your .env file
});

export async function query(text: string, params?: unknown[]) {
  const res = await pool.query(text, params);
  return res.rows;
}

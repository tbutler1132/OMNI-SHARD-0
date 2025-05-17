import { query } from "../core/db";
import views from "../data/entities/view/view.local.json"; // Adjust path as needed

async function importViews() {
  for (const view of views) {
    await query(
      `INSERT INTO views (id, content)
       VALUES ($1, $2)
       ON CONFLICT (id) DO UPDATE
       SET content = EXCLUDED.content, updated_at = now()`,
      [view.id, view]
    );
    console.log(`✅ Imported view: ${view.id}`);
  }

  console.log("✅ All views imported.");
}

importViews().catch((err) => {
  console.error("❌ Error importing views:", err);
  process.exit(1);
});

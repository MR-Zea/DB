import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { id } = req.query;

  const dbPath = path.join(process.cwd(), "db.json");
  const db = JSON.parse(fs.readFileSync(dbPath));

  const file = db.files.find(f => f.id == id);
  if (!file) return res.json({ error: "not found" });

  fs.unlinkSync(path.join(process.cwd(), "uploads", file.filename));

  db.files = db.files.filter(f => f.id != id);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.json({ success: true });
}

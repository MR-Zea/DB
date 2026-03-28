import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const db = JSON.parse(fs.readFileSync(path.join(process.cwd(), "db.json")));
  res.json(db.files);
}

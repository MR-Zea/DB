import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") return res.end("Only POST");

  const dbPath = path.join(process.cwd(), "db.json");
  const db = JSON.parse(fs.readFileSync(dbPath));

  const { name, data } = req.body;

  const filename = Date.now() + "-" + name;

  fs.writeFileSync(
    path.join(process.cwd(), "uploads", filename),
    Buffer.from(data, "base64")
  );

  const fileData = {
    id: Date.now(),
    name,
    filename,
    url: `/api/download?file=${filename}`
  };

  db.files.push(fileData);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.json({ direct_link: fileData.url });
}

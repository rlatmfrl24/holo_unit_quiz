import fs from "fs";

export async function GET(request: Request) {
  type Row = {
    [key: string]: string;
  };

  const fileData = await fs.promises.readFile(
    "public/data/hololive_units.csv",
    "utf-8"
  );
  const lines = fileData.trim().split("\n");
  const headers = lines[0].split(",");
  const rows: Row[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    const row: Row = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = values[j];
    }
    rows.push(row);
  }

  return new Response(JSON.stringify(rows));
}

import clientPromise from "@/utils/mongodb";
import { jsonToArray, parseCsv } from "../route";
import fs from "fs";

export async function GET(request: Request) {
  const client = await clientPromise;
  const db = client.db("holo_unit_quiz");
  await db.dropCollection("unit_collection");

  const fileData = await fs.promises.readFile(
    "public/data/hololive_units_20230327.csv",
    "utf-8"
  );

  const jsonData = await parseCsv(fileData);
  const arrayData = jsonToArray(jsonData);

  const collection = db.collection("unit_collection");
  await collection.insertMany(arrayData);

  return new Response("OK::" + arrayData.length);
}

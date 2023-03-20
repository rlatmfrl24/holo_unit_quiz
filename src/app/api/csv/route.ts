import fs from "fs";
import { parse } from "csv";
import { UnitType } from "@/app/typeDef";

const parseCsv = async (
  csvData: string
): Promise<{ [key: string]: UnitType }> => {
  return new Promise((resolve, reject) => {
    parse(csvData, { columns: true }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const jsonData: { [key: string]: UnitType } = {};
        for (const row of data) {
          const 멤버 = row.멤버
            .split(",")
            .map((member: string) => member.trim().replace(/\"/g, ""));
          const newData: UnitType = {
            code: row.코드,
            unitName: row.유닛명,
            members: 멤버,
            memberCount: 멤버.length,
            difficulty: row.난이도,
            answerVariation: row.비고.split(","),
            description: "",
          };
          jsonData[row.코드] = newData;
        }
        resolve(jsonData);
      }
    });
  });
};

export async function GET(request: Request) {
  const fileData = await fs.promises.readFile(
    "public/data/hololive_units.csv",
    "utf-8"
  );

  const jsonData = await parseCsv(fileData);

  return new Response(JSON.stringify(jsonData));
}

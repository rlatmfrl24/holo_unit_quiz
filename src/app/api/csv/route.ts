import fs from "fs";
import { parse } from "csv";
import { UnitType } from "@/utils/typeDef";

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
          const 멤버 = row.멤버.split(",").map((member: string) => {
            const memeberName = member.trim().replace(/\"/g, "");
            return getMemberCode(memeberName);
          });
          const 복수정답 = row.비고.split(",").filter((answer: string) => {
            return answer.trim().length > 0;
          });

          const newData: UnitType = {
            code: row.코드,
            unitName: row.유닛명,
            members: 멤버,
            memberCount: 멤버.length,
            difficulty: row.난이도,
            answerVariation: 복수정답,
            description: "",
          };
          jsonData[row.코드] = newData;
        }
        resolve(jsonData);
      }
    });
  });
};

const NameToCodeTable: Record<string, string> = {
  소라: "tokino_sora",
  로보코: "roboco_san",
  미코: "sakura_miko",
  스이세이: "hoshimachi_suisei",
  아즈키: "azki",
  멜: "yozora_mel",
  마츠리: "natsuiro_matsuri",
  하쨔마: "akai_haato",
  아키로제: "aki_rosenthal",
  후부키: "shirakami_fubuki",
  코로네: "inugami_korone",
  미오: "ookami_mio",
  오카유: "nekomata_okayu",
  아쿠아: "minato_aqua",
  아야메: "nakiri_ayame",
  초코: "yuzuki_choco",
  스바루: "oozora_subaru",
  시온: "murasaki_shion",
  페코라: "usada_pekora",
  후레아: "shiranui_flare",
  마린: "houshou_marine",
  노엘: "shirogane_noel",
  루시아: "uruha_rushia",
  코코: "kiryu_coco",
  카나타: "amane_kanata",
  토와: "tokoyami_towa",
  와타메: "tsunomaki_watame",
  루나: "himemori_luna",
  네네: "momosuzu_nene",
  보탄: "shishiro_botan",
  폴카: "omaru_polka",
  라미: "yukihana_lamy",
  라프라스: "la+_darkness",
  루이: "takane_lui",
  코요리: "hakui_koyori",
  클로에: "sakamata_chole",
  이로하: "kazama_iroha",
  구라: "gawr_gura",
  칼리: "mori_calliope",
  키아라: "takanashi_kiara",
  아메: "watson_amelia",
  이나: "ninomae_inanis",
  아이리스: "irys",
  벨즈: "hakos_bealz",
  파우나: "ceres_fauna",
  무메이: "nanashi_mumei",
  크로니: "ouro_kronii",
  사나: "tsukumo_sana",
  무나: "moona_hoshinova",
  이오피: "airani_iofifteen",
  리스: "ayunda_risu",
  레이네: "pavolia_reine",
  올리: "kureiji_olille",
  아냐: "anya_melfissa",
  코보: "kobo_kanaeru",
  카엘라: "kaela_kovalskia",
  제타: "vestia_zeta",
};

function getMemberCode(memberName: string): string {
  if (memberName in NameToCodeTable) {
    return NameToCodeTable[memberName].toString();
  } else {
    return "";
  }
}

function jsonToArray(jsonData: { [key: string]: UnitType }): UnitType[] {
  const arrayData: UnitType[] = [];
  for (const key in jsonData) {
    arrayData.push(jsonData[key]);
  }
  return arrayData;
}

export async function GET(request: Request) {
  const fileData = await fs.promises.readFile(
    "public/data/hololive_units.csv",
    "utf-8"
  );

  const jsonData = await parseCsv(fileData);
  const arrayData = jsonToArray(jsonData);

  return new Response(JSON.stringify(arrayData));
}

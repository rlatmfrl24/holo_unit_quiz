import Main from "@/components/main";
import clientPromise from "@/utils/mongodb";
import { MemberType, UnitType } from "@/utils/typeDef";

async function getMemberData(): Promise<MemberType[]> {
  const client = await clientPromise;
  const db = client.db("holo_unit_quiz");
  const memberData = db.collection("members");
  const memberListData = await memberData.find({}).toArray();
  const memberList = memberListData.map((member) => {
    return {
      id: member.id,
      name_kr: member.name_kr,
      belong: member.belong,
      belong_name: member.belong_name,
      color_primary: member.color_primary,
      color_secondary: member.color_secondary,
      color_third: member.color_third,
      oshi_mark: member.oshi_mark,
    };
  });

  return memberList;
}

async function getUnitData(): Promise<UnitType[]> {
  const client = await clientPromise;
  const db = client.db("holo_unit_quiz");
  const unitData = db.collection("unit_collection");
  const unitListData = await unitData.find({}).toArray();
  const unitList = unitListData.map((unit) => {
    return {
      code: unit.code,
      unitName: unit.unitName,
      members: unit.members,
      memberCount: unit.memberCount,
      difficulty: unit.difficulty,
      answerVariation: unit.answerVariation,
      description: unit.description,
    };
  });

  return unitList;
}

export default async function Home() {
  const memberData = await getMemberData();
  const unitData = await getUnitData();

  return (
    <main className="flex items-center justify-center h-screen">
      <Main memberData={memberData} unitData={unitData} />
    </main>
  );
}

import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

export type MemberType = {
  id: string;
  name_kr: string;
  belong: string;
  belong_name: string;
  color_primary: string;
  color_secondary: string;
  color_third: string;
  oshi_mark: string;
};

export interface UnitType {
  code: string;
  unitName: string;
  members: string[];
  memberCount: number;
  difficulty: number;
  answerVariation: string[];
  description: string;
}

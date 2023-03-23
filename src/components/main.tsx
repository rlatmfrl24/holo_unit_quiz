"use client";

import { useEffect } from "react";
import Intro from "./intro";
import Quiz from "./quiz";
import { useMemberDBStore, usePageStore, useUnitDBStore } from "./store";
import { NextPage } from "next";
import { MemberType, UnitType } from "@/utils/typeDef";
import Result from "./result";

const Main: NextPage<{
  memberData: MemberType[];
  unitData: UnitType[];
}> = ({ memberData, unitData }) => {
  const pageState = usePageStore((state) => state.page);
  const setPageState = usePageStore((state) => state.setPage);
  const setMemberData = useMemberDBStore((state) => state.setMemberDB);
  const setUnitData = useUnitDBStore((state) => state.setUnitDB);

  useEffect(() => {
    setUnitData(unitData);
    setMemberData(memberData);
  }, [memberData, setMemberData, setUnitData, unitData]);

  useEffect(() => {
    setPageState("intro");
  }, [setPageState]);

  function getPage(pageState: string) {
    switch (pageState) {
      case "intro":
        return <Intro />;
      case "quiz":
        return <Quiz />;
      case "result":
        return <Result />;
      default:
        return <>Error🙇‍♂️</>;
    }
  }

  return <>{getPage(pageState)}</>;
};

export default Main;

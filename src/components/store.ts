import { MemberType, UnitType } from "@/utils/typeDef";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface PageState {
  page: string;
  setPage: (by: string) => void;
}

interface MemeberDBState {
  memberDB: Record<string, MemberType>;
  setMemberDB: (by: MemberType[]) => void;
}

interface UnnitDBState {
  unitDB: Record<string, UnitType>;
  setUnitDB: (by: UnitType[]) => void;
}

const useMemberDBStore = create<MemeberDBState>()(
  devtools(
    persist(
      (set) => ({
        memberDB: {},
        setMemberDB: (by: MemberType[]) => {
          const newMemberDB: Record<string, MemberType> = {};
          for (const member of by) {
            newMemberDB[member.id] = member;
          }
          set((state) => ({ memberDB: newMemberDB }));
        },
      }),
      { name: "memberDB" }
    )
  )
);

const useUnitDBStore = create<UnnitDBState>()(
  devtools(
    persist(
      (set) => ({
        unitDB: {},
        setUnitDB: (by: UnitType[]) => {
          const newUnitDB: Record<string, UnitType> = {};
          for (const unit of by) {
            newUnitDB[unit.code] = unit;
          }
          set((state) => ({ unitDB: newUnitDB }));
        },
      }),
      { name: "unitDB" }
    )
  )
);

const usePageStore = create<PageState>()(
  devtools(
    persist(
      (set) => ({
        page: "intro",
        setPage: (by: string) => set((state) => ({ page: by })),
      }),
      { name: "page" }
    )
  )
);

export { usePageStore, useMemberDBStore, useUnitDBStore };

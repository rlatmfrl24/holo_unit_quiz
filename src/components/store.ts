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

interface QuizListState {
  quizList: UnitType[];
  setQuizList: (by: UnitType[]) => void;
}

interface AnswerListState {
  answerList: string[];
  setAnswerList: (by: string[]) => void;
}

interface AnswerTypeState {
  answerType: string;
  setAnswerType: (by: string) => void;
}

const useAnswerTypeStore = create<AnswerTypeState>()(
  devtools(
    persist(
      (set) => ({
        answerType: "subjective",
        setAnswerType: (by: string) => {
          set((state) => ({ answerType: by }));
        },
      }),
      { name: "answerType" }
    )
  )
);

const useAnswerListStore = create<AnswerListState>()(
  devtools(
    persist(
      (set) => ({
        answerList: [],
        setAnswerList: (by: string[]) => {
          set((state) => ({ answerList: by }));
        },
      }),
      { name: "answerList" }
    )
  )
);

const useQuizListStore = create<QuizListState>()(
  devtools(
    persist(
      (set) => ({
        quizList: [],
        setQuizList: (by: UnitType[]) => {
          set((state) => ({ quizList: by }));
        },
      }),
      { name: "quizList" }
    )
  )
);

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

export {
  usePageStore,
  useMemberDBStore,
  useUnitDBStore,
  useQuizListStore,
  useAnswerListStore,
  useAnswerTypeStore,
};

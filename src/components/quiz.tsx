"use client";

import { NextPage } from "next";
import { usePageStore, useQuizListStore } from "./store";
import { useEffect } from "react";

const FunctionButton: NextPage<{
  name: string;
  func: Function;
}> = ({ name, func }) => {
  return (
    <button
      className="
        bg-orange-500
        hover:bg-orange-600
        text-white
        font-bold
        py-2
        px-4
        rounded
        text-2xl
      "
      onClick={() => {
        func();
      }}
    >
      {name}
    </button>
  );
};

const Quiz = () => {
  const setPage = usePageStore((state) => state.setPage);
  const quizList = useQuizListStore((state) => state.quizList);

  useEffect(() => {
    console.log(quizList);
  }, [quizList]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="">Quiz</h1>

      <p>
        남은 문제: <span>1123</span>
      </p>
      <div aria-label="btn_group" className="flex flex-col gap-3">
        <FunctionButton name="넘어가기" func={() => setPage("intro")} />
        <FunctionButton name="결과확인" func={() => setPage("intro")} />
        <FunctionButton name="포기하기" func={() => setPage("intro")} />
      </div>
    </div>
  );
};

export default Quiz;

"use client";

import { NextPage } from "next";
import {
  useAnswerListStore,
  useAnswerTypeStore,
  useMemberDBStore,
  usePageStore,
  useQuizListStore,
  useUnitDBStore,
} from "./store";
import { useCallback, useEffect, useState } from "react";
import { UnitType } from "@/utils/typeDef";
import Image from "next/image";
import { getCollectCount } from "@/utils/util";

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
  const answerList = useAnswerListStore((state) => state.answerList);
  const setAnswerList = useAnswerListStore((state) => state.setAnswerList);
  const memberData = useMemberDBStore((state) => state.memberDB);
  const quizList = useQuizListStore((state) => state.quizList);
  const [currentQuiz, setCurrentQuiz] = useState<UnitType>();
  const [quizQueue, setQuizQueue] = useState<UnitType[]>([...quizList]);
  const answerType = useAnswerTypeStore((state) => state.answerType);
  const unitDB = useUnitDBStore((state) => state.unitDB);

  const getQuiz = useCallback(() => {
    const removedItem = quizQueue.splice(0, 1)[0];
    console.log(removedItem);
    console.log(quizQueue);
    setCurrentQuiz(removedItem);
  }, [quizQueue]);

  useEffect(() => {
    getQuiz();
  }, [getQuiz, quizQueue]);

  useEffect(() => {
    if (answerList.length === quizList.length) {
      setPage("result");
    }
  }, [answerList, quizList.length, setPage]);

  useEffect(() => {}, [quizList]);

  const getRandomVariation = (answerUnit: UnitType, cnt: number) => {
    const unitList = Object.values(unitDB);

    //get random units from unitList contains answerUnit
    const randomUnits = unitList
      .filter((unit) => unit.code !== answerUnit.code)
      .sort(() => Math.random() - 0.5)
      .slice(0, cnt - 1);

    //get random units from unitList not contains answerUnit

    // const randomUnits = unitList
    //   .filter((unit) => unit.code !== answerUnit.code)
    //   .sort(() => Math.random() - 0.5)
    //   .slice(0, cnt);

    return [...randomUnits, answerUnit].sort(() => Math.random() - 0.5);
  };

  return (
    <div className="flex flex-col items-center font-poppins">
      <h1 className="text-3xl font-bold py-4">Quiz</h1>

      <div>
        <p className="font-noto_kr">
          남은 문제: <span>{quizQueue.length + 1}</span>
        </p>
        <p className="font-noto_kr">
          맞춘 문제:{" "}
          <span>
            {getCollectCount(quizList, answerList)} / {quizList.length}
          </span>
        </p>
      </div>

      <div className="flex gap-2 py-3 px-3">
        {currentQuiz?.members.map((member, index) => {
          return (
            <div key={index} className="text-center">
              <Image
                alt={member}
                src={`/entry/${member}.png`}
                width={150}
                height={150}
              />
              <span className="font-noto_kr font-semibold">
                {memberData[member]?.name_kr}
              </span>
            </div>
          );
        })}
      </div>

      {answerType === "subjective" ? (
        <input
          className="
            bg-gray-200
            appearance-none
            border-2
            border-gray-200
            rounded
            w-64
            py-2
            px-4
            text-gray-700
            leading-tight
            focus:outline-none
            focus:bg-white
            focus:border-orange-500
            text-2xl
            my-3
            text-center
          "
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (e.currentTarget.value === "") {
                return;
              }

              setAnswerList([...answerList, e.currentTarget.value]);
              getQuiz();
              e.currentTarget.value = "";
            }
          }}
        />
      ) : (
        <div className="grid grid-cols-2 gap-1 my-3">
          {currentQuiz !== undefined
            ? getRandomVariation(currentQuiz, 6).map((unit, index) => {
                return (
                  <button
                    key={index}
                    className="
                      bg-sky-500
                      hover:bg-sky-600
                      text-white
                      font-bold
                      py-2
                      px-4
                      rounded
                      text-xl
                    "
                    onClick={() => {
                      setAnswerList([...answerList, unit.unitName]);
                      getQuiz();
                    }}
                  >
                    {unit.unitName}
                  </button>
                );
              })
            : null}
        </div>
      )}

      {/* 
      <input
        className="
        bg-gray-200
        appearance-none
        border-2
        border-gray-200
        rounded
        w-64
        py-2
        px-4
        text-gray-700
        leading-tight
        focus:outline-none
        focus:bg-white
        focus:border-orange-500
        text-2xl
        my-3
        text-center
      "
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (e.currentTarget.value === "") {
              return;
            }

            setAnswerList([...answerList, e.currentTarget.value]);
            getQuiz();
            e.currentTarget.value = "";
          }
        }}
      /> */}

      <div aria-label="btn_group" className="flex flex-col gap-3">
        <FunctionButton
          name="넘어가기"
          func={() => {
            setAnswerList([...answerList, ""]);
            getQuiz();
          }}
        />
        <FunctionButton name="결과확인" func={() => setPage("result")} />
        <FunctionButton
          name="포기하기"
          func={() => {
            setPage("intro");
            setAnswerList([]);
          }}
        />
      </div>
    </div>
  );
};

export default Quiz;

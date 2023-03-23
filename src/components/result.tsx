"use client";

import Image from "next/image";
import { useAnswerListStore, usePageStore, useQuizListStore } from "./store";
import { checkAnswer, getCollectCount } from "@/utils/util";

const Result = () => {
  const setPage = usePageStore((state) => state.setPage);
  const answerList = useAnswerListStore((state) => state.answerList);
  const setAnswerList = useAnswerListStore((state) => state.setAnswerList);
  const quizList = useQuizListStore((state) => state.quizList);

  return (
    <div className="flex flex-col items-center h-full py-3">
      <h1 className="font-poppins text-2xl font-bold">Result</h1>
      <h2 className="font-noto_kr text-xl font-semibold">
        총 {quizList.length} 문제 중 {getCollectCount(quizList, answerList)}개
        맞히셨습니다!
      </h2>
      <div className="overflow-auto max-h-full my-3 grid grid-cols-[auto_auto_auto_auto_auto] gap-2 font-noto_kr px-5">
        <div className="text-center font-semibold">문제번호</div>
        <div className="text-center font-semibold">멤버</div>
        <div className="text-center font-semibold">정답리스트</div>
        <div className="text-center font-semibold">입력한 답</div>
        <div className="text-center font-semibold">정답여부</div>
        <div className="col-span-5 border-b-2 border-black"></div>

        {quizList.map((quiz, index) => {
          return (
            <>
              <div className="text-center">{index + 1}</div>
              <div className="grid grid-cols-3">
                {quiz.members.map((member, index) => {
                  return (
                    <Image
                      alt={member}
                      key={index}
                      src={`/entry/${member}.png`}
                      width={50}
                      height={50}
                    />
                  );
                })}
              </div>
              <div className="flex justify-center items-center">
                {[...quiz.answerVariation, quiz.unitName].join(", ")}
              </div>
              <div className="flex justify-center items-center">
                {answerList[index]}
              </div>
              <div className="flex justify-center items-center font-semibold">
                {checkAnswer(quiz, answerList[index]) ? (
                  <span className="text-blue-600">정답</span>
                ) : (
                  <span className="text-red-500">오답</span>
                )}
              </div>
              <div className="col-span-5 border-b-2 border-black"></div>
            </>
          );
        })}
      </div>

      <button
        className="
        bg-blue-500
        hover:bg-blue-600
        text-white
        font-bold
        py-2
        px-4
        rounded
        text-2xl
      "
        onClick={() => {
          setPage("intro");
          setAnswerList([]);
        }}
      >
        다시 해보기
      </button>
    </div>
  );
};

export default Result;

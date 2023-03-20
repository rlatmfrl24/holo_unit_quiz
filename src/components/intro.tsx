"use client"; // this is a client-side only file
import SliderUnstyled, {
  SliderUnstyledThumbSlotProps,
  SliderUnstyledProps,
} from "@mui/base/SliderUnstyled";
import Link from "next/link";
import { useState } from "react";

const Intro = () => {
  const [difficulty, setDifficulty] = useState(1);
  const [quizCount, setQuizCount] = useState(10);

  return (
    <div className="flex flex-col w-full items-center font-noto_kr">
      <h1 className="text-4xl font-noto_kr font-bold my-3">
        홀로라이브 유닛 퀴즈
      </h1>
      <h2 className="w-fit text-xl font-semibold">난이도 설정</h2>
      <span className="text-3xl font-semibold">{difficulty}</span>
      <SliderUnstyled
        className="w-96 my-4"
        defaultValue={difficulty}
        step={1}
        min={1}
        max={5}
        onChange={(e, value) => {
          setDifficulty(value as number);
        }}
        marks
        slotProps={{
          thumb: {
            className:
              "ring-cyan-500 dark:ring-cyan-400 ring-2 w-4 h-4 -mt-1 -ml-2 flex items-center justify-center bg-white rounded-full shadow absolute",
          },
          root: {
            className: "w-96 relative inline-block h-2 cursor-pointer",
          },
          rail: {
            className:
              "bg-slate-100 dark:bg-slate-700 h-2 w-full rounded-full block absolute",
          },
          track: {
            className: "bg-cyan-500 dark:bg-cyan-400 h-2 absolute rounded-full",
          },
        }}
      />
      <h2 className="w-fit text-xl font-semibold">문제 숫자</h2>
      <span className="text-3xl font-semibold">{quizCount}</span>
      <button
        className="
        bg-orange-500
        hover:bg-orange-600
        text-white
        font-bold
        py-2
        px-4
        rounded
        my-4
        font-poppins
        text-2xl"
      >
        Start!
      </button>
      <div className="flex flex-col items-center border p-4 relative mt-5">
        <h2 className="font-poppins font-bold text-2xl absolute top-[-1rem] left-1/2 transform -translate-x-1/2 bg-white px-3">
          RULE
        </h2>
        <div className="grid grid-cols-[minmax(0,_30px)_1fr] w-fit">
          <p>1.</p>
          <p>정답입력은 한글로 띄어쓰기 없이 작성해주세요.</p>
          <p>2.</p>
          <p>
            영어 약자 유닛인 경우에는 영어 약자 유닛으로 입력하세요.
            <br />
            소문자도 인식합니다. (e.g. SMOK, smok)
          </p>
          <p>3.</p>
          <p>
            만약 잘못된 유닛명이나 추가해야하는 유닛명이 있다면,
            <br />
            <span className="font-semibold font-poppins text-orange-500">
              397love@gmail.com
            </span>
            로 제보해주시기 바랍니다.
          </p>
          <p>4.</p>
          <p>
            출제 기준은
            <Link
              href={`https://seesaawiki.jp/hololivetv/d/%a5%db%a5%ed%a5%e9%a5%a4%a5%d6%a1%da%a5%b3%a5%f3%a5%d3%a1%bf%a5%e6%a5%cb%a5%c3%a5%c8%cc%be%b0%ec%cd%f7%a1%db`}
            >
              <span className="font-semibold text-orange-500 underline ml-1">
                해당 사이트
              </span>
            </Link>
            를 기준으로 합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Intro;

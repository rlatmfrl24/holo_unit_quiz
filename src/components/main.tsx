"use client";

import { useState } from "react";
import Intro from "./intro";
import Quiz from "./quiz";
import { usePageStore } from "./store";

const Main = () => {
  const pageState = usePageStore((state) => state.page);

  function getPage(pageState: string) {
    switch (pageState) {
      case "intro":
        return <Intro />;
      case "quiz":
        return <Quiz />;
      default:
        break;
    }
  }

  return <>{getPage(pageState)}</>;
};

export default Main;

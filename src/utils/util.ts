import { UnitType } from "./typeDef";

function checkAnswer(quiz: UnitType, answer: string) {
  if (
    quiz.unitName.toUpperCase() === answer?.toUpperCase() ||
    quiz.answerVariation.includes(answer?.toUpperCase())
  ) {
    return true;
  }
  return false;
}

function getCollectCount(quizList: UnitType[], answerList: string[]) {
  let count = 0;
  quizList.forEach((quiz, index) => {
    console.log(quiz.unitName, answerList[index]);

    if (checkAnswer(quiz, answerList[index])) {
      count++;
    }
  });
  return count;
}

export { getCollectCount, checkAnswer };

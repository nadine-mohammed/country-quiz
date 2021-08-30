import React from "react";
import { useGlobalContext } from "../context";
import Score from "../components/score";
import Question from "../components/question";
const Quiz = () => {
  const { totalQuestionsNum, qNumber } = useGlobalContext();
  if (qNumber === totalQuestionsNum) {
    return <Score />;
  } else {
    return <Question />;
  }
};

export default Quiz;

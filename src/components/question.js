import React, { useEffect, useState } from "react";
import travelIcon from "../assets/tourist.png";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
const Question = () => {
  const [selectedOpIdx, setSelectedOpIdx] = useState(null);
  const {
    totalQuestionsNum,
    qNumber,
    setQnumber,
    question,
    flagSrc,
    options,
    isCorrect,
    setIsCorrect,
    correctAnswerIdx,
    setTotalScore,
  } = useGlobalContext();
  // ------------------------------------------------
  useEffect(() => {
    removeAnswersColorClasses();
    if (isCorrect === false) {
      document
        .getElementsByClassName("option-item")
        [selectedOpIdx].classList.add("wrong-answer");
      document
        .getElementsByClassName("option-item")
        [correctAnswerIdx].classList.add("correct-answer");
    } else if (isCorrect === true) {
      calculateScore();
      document
        .getElementsByClassName("option-item")
        [selectedOpIdx].classList.add("correct-answer");
    }
  }, [isCorrect]);

  const onChangeQuestion = () => {
    if (selectedOpIdx != null) {
      document.getElementsByClassName("next-btn")[0].style.display = "none";
      removeAnswersColorClasses();
      toggleOptsDisable(false);
      setSelectedOpIdx(null);
      setIsCorrect(null);
      setQnumber((prevIdx) => {
        let newQidx = prevIdx + 1;
        return newQidx;
      });
    }
  };

  const onSelectAnswer = (idx) => {
    document.getElementsByClassName("next-btn")[0].style.display = "block";
    toggleOptsDisable(true);
    checkAnswer(idx);
    setSelectedOpIdx(idx);
  };

  const checkAnswer = (idx) => {
    if (options[idx] === options[correctAnswerIdx]) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };
  const calculateScore = function () {
    if (isCorrect) {
      setTotalScore((score) => {
        let newScore = score + 1;
        return newScore;
      });
    }
  };

  const removeAnswersColorClasses = () => {
    let elements = document.getElementsByClassName("option-item");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("correct-answer");
      elements[i].classList.remove("wrong-answer");
    }
  };

  const toggleOptsDisable = (disableVal) => {
    let ops = document.getElementsByClassName("option-item");
    for (let i = 0; i < ops.length; i++) {
      ops[i].disabled = disableVal;
    }
  };
  const letters = ["A", "B", "C", "D"];
  return (
    <div className="quiz-container">
      <div className="quiz">
        <div className="quiz-header">
          {/* <h1 className="quiz-title">country quiz</h1> */}
          <div className="quiz-icon">
            <img
              src={travelIcon}
              alt="travel icon"
              className="quiz-icon-link"
            />
          </div>
        </div>

        <div className="quiz-form">
          <img
            src={flagSrc}
            className="flag"
            style={{ display: qNumber === 2 ? "block" : "none" }}
          />
          <h3 className="question"> {question}</h3>
          <div className="options">
            {options.map((option, idx) => {
              return (
                <button
                  key={idx}
                  className="option-item"
                  type="button"
                  onClick={() => {
                    onSelectAnswer(idx);
                  }}
                >
                  <div className="option-letter">{letters[idx]}</div>
                  <div className="option-text">{option}</div>
                </button>
              );
            })}
          </div>
        </div>
        <Link
          to="/quiz"
          className="next-btn"
          onClick={onChangeQuestion}
          style={{ display: "none" }}
        >
          {qNumber === totalQuestionsNum - 1 ? "Get Result" : "Next"}
        </Link>
      </div>
    </div>
  );
};

export default Question;

import React from "react";
import { useGlobalContext } from "../context";
import partyIcon from "../assets/party.png";
import { Link } from "react-router-dom";
const Score = () => {
  const { setQnumber, totalScore, setTotalScore, getQuestions } =
    useGlobalContext();
  return (
    <div className="get-started-container">
      <div className="get-started">
        <div className="party-img">
          <img src={partyIcon} alt="party icon" className="party-img-link" />
        </div>
        <h1 className="result">result</h1>
        <p className="result-txt">
          you got <span className="result-score">{totalScore}</span> correct
          answers
        </p>
        <Link
          to="/"
          className="try-btn"
          onClick={() => {
            setTotalScore(0);
            setQnumber(0);
            getQuestions();
          }}
        >
          Try Again
        </Link>
      </div>
    </div>
  );
};

export default Score;

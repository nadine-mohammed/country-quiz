import React from "react";
import travelIcon from "../assets/travel-map.png";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="get-started-container">
      <div className="get-started">
        <h1 className="start-title">country quiz</h1>
        <div className="travel-img">
          <img src={travelIcon} alt="travel icon" className="travel-img-link" />
        </div>
        <Link to="/quiz" className="start-btn">
          start test
        </Link>
      </div>
    </div>
  );
};

export default Home;

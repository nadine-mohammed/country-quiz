import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error-pg">
      <Link to="/" className="error-btn">
        Back to main page
      </Link>
    </div>
  );
};

export default ErrorPage;

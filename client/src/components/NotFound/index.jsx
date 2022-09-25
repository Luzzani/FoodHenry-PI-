import React from "react";
import "../RecipeCreate/RecipeCreate.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="create__container-denied">
      <Link to={"/home"}>
        <button className="create__button">Back to home</button>
      </Link>
      <h2 className="create__denied">NotFound</h2>
    </div>
  );
}

export default NotFound;

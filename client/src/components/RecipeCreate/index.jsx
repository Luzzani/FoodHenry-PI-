import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import "./RecipeCreate.css";

import Form from "./Form";
import LoadingSpinner from "../LoadingSpinner";

function RecipeCreate() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div
      className={
        isAuthenticated ? "create__container" : "create__container-denied"
      }
    >
      {isAuthenticated ? (
        <>
          <Link to={"/home"}>
            <button className="create__button create__button-back">
              Back to home
            </button>
          </Link>
          <h2 className="create__title">Create your own recipe</h2>
          <Form />
        </>
      ) : (
        <>
          <Link to={"/home"}>
            <button className="create__button ">Back to home</button>
          </Link>
          {isLoading ? <LoadingSpinner /> : <></>}
          <h2 className="create__denied">
            You must be logged in to upload your own recipes
          </h2>
        </>
      )}
    </div>
  );
}

export default RecipeCreate;

import { Link } from "react-router-dom";
import Form from "./Form";
import "./RecipeCreate.css";
import { useAuth0 } from "@auth0/auth0-react";

function RecipeCreate() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="create__container">
      {isAuthenticated ? (
        <>
          <Link to={"/home"}>
            <button className="create__button">Back to home</button>
          </Link>
          <h2 className="create__title">Create your own recipe</h2>
          <Form />
        </>
      ) : (
        <h2>You must be logged in to upload your own recipes</h2>
      )}
    </div>
  );
}

export default RecipeCreate;

import { Link } from "react-router-dom";
import Form from "./Form";
import "./RecipeCreate.css";

function RecipeCreate() {
  return (
    <div className="create__container">
      <Link to={"/home"}>
        <button className="create__button">Back to home</button>
      </Link>
      <h2 className="create__title">Create your own recipe</h2>
      <Form />
    </div>
  );
}

export default RecipeCreate;

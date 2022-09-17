import { Link } from "react-router-dom";
import Form from "./Form";

function RecipeCreate() {
  return (
    <div>
      <Link to={"/home"}>
        <button>Back to home</button>
      </Link>
      <Form />
      <h2>Create your own recipe</h2>
    </div>
  );
}

export default RecipeCreate;

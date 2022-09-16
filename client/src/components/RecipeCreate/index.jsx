import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getDiets } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function RecipeCreate() {
  const dispatch = useDispatch();
  const dietList = useSelector((state) => state.dietList);

  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    steps: [],
    image: "",
    dietTypes: [],
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div>
      <Link to={"/home"}>
        <button>Back to home</button>
      </Link>

      <h2>Create your own recipe</h2>

      <form>
        <input placeholder="name" value={input.name} />
        <label>
          Healt Score: <input type="number" value={input.healthScore} />
        </label>
        <input type="text" placeholder="image url" value={input.image} />
        <input placeholder="recipe steps" value={input.steps} />
        {dietList.map((e) => {
          return (
            <label key={e.id}>
              {e.name}
              <input type="checkbox" name={e.name} value={e.name} />
            </label>
          );
        })}
        <textarea placeholder="summary" value={input.summary} />
        <button>Send</button>
      </form>
    </div>
  );
}

export default RecipeCreate;

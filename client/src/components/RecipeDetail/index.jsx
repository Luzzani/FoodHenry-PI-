import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetail, prevPag } from "../../redux/actions";
import { Link } from "react-router-dom";

function RecipeDetail(props) {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipeDetail);
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getDetail(id));

    return () => {
      dispatch(prevPag());
    };
  }, [dispatch, id]);

  return (
    <div>
      <Link to={"/home"}>
        <button
          onClick={() => {
            props.history.goBack();
          }}
        >
          Back
        </button>
      </Link>
      <h2>{recipe.name}</h2>
      <div>
        <img src={recipe.image} alt={recipe.name} />
        <div>
          <span>{recipe.healthScore}</span>
          <span>{recipe.dishTypes}</span>
          <ol>
            {recipe.steps?.map((e) => {
              return <li key={e.number}>{e.step}</li>;
            })}
          </ol>
        </div>
      </div>
      <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
    </div>
  );
}

export default RecipeDetail;

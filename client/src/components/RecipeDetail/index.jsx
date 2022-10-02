import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDetail,
  cleanPag,
  deleteRecipe,
  setPageNumPrev,
  getRecipes,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import "./RecipeDetail.css";
import "../Home/Home.css";

import LoadingSpinner from "../LoadingSpinner";
import NotFound from "../NotFound";

function RecipeDetail(props) {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipeDetail);
  const id = props.match.params.id;
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(cleanPag());
    };
  }, [dispatch, id]);

  const deleteHandle = (id) => {
    dispatch(deleteRecipe(id));
    dispatch(setPageNumPrev(1));
    dispatch(getRecipes());

    alert("recipe detele successfully");
  };

  return (
    <div className={recipe.name === "Recipe not found" ? "" : "detail__container"}>
      {!recipe.name ? (
        <LoadingSpinner className="detail__spinner" />
      ) : (
        <div
          className={
            recipe.name === "Recipe not found" ? "" : "detail__content"
          }
        >
          {recipe.name === "Recipe not found" ? (
            <NotFound />
          ) : (
            <>
              {isAuthenticated && id.length > 10 ? (
                <Link to={"/home"} className="detail__content-link">
                  <button
                    className="filter__button"
                    onClick={() => {
                      deleteHandle(id);
                    }}
                  >
                    Delete
                  </button>
                </Link>
              ) : (
                <></>
              )}
              <Link to={"/home"} className="detail__content-link">
                <button
                  className="filter__button"
                  onClick={() => {
                    props.history.goBack();
                  }}
                >
                  Back
                </button>
              </Link>
              <h1 className="detail__content-title">{recipe.name}</h1>
              {typeof recipe.diets[0] === "object" ? (
                <span className="detail__content-diet">
                  Diet Types:{" "}
                  {recipe.diets?.map((e) => {
                    return e.name + ", ";
                  })}
                </span>
              ) : (
                <span className="detail__content-diet">
                  Diet Types:{" "}
                  {recipe.diets?.map((e) => {
                    return e + ", ";
                  })}
                </span>
              )}
              <img
                className="detail__content-image"
                src={recipe.image}
                alt={recipe.name}
              />
              <p
                className="detail__content-summary"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              ></p>
              <ol className="detail__content-stepscontainer">
                {recipe.steps ? (
                  recipe.steps.map((e) => {
                    return (
                      <li
                        className="detail__content-steps"
                        key={Math.random() + e.number}
                      >
                        <p>
                          <span>Step number {e.number}:</span> <br /> {e.step}
                        </p>
                        <ul>
                          <h4>Ingredients: </h4>
                          {e.ingredients?.length ? (
                            e.ingredients.map((e) => {
                              return (
                                <li key={e.id + Math.random()}>{e.name}</li>
                              );
                            })
                          ) : (
                            <li>No ingredients</li>
                          )}
                        </ul>
                      </li>
                    );
                  })
                ) : (
                  <p>This recipe does not have step by step</p>
                )}
              </ol>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default RecipeDetail;

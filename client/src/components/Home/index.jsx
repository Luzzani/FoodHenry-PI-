import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, setPageNumPrev } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

import "./Home.css";

import Card from "./Card";
import LoadingSpinner from "../LoadingSpinner";
import Paginated from "./Paginated";
import Filters from "./Filters";
import LogoutButton from "../Logbuttons/LogoutButton";
import LoginButton from "../Logbuttons/LoginButton";

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const recipes = useSelector((state) => state.recipes);
  const prevPage = useSelector((state) => state.prevPage);
  const { isAuthenticated } = useAuth0();

  const [alphabetical, setAlphabetical] = useState(true);
  const [healthScore, setHealthScore] = useState(true);

  //Paginado
  const [currentPage, setCurrentPage] = useState(prevPage);
  const recipePerPeage = 9;
  const lastRecipeIndex = currentPage * recipePerPeage;
  const fisrtRecipeIndex = lastRecipeIndex - recipePerPeage;
  const currentRecipe = recipes.slice(fisrtRecipeIndex, lastRecipeIndex);

  useEffect(() => {
    if (!recipes.length) {
      dispatch(getRecipes());
    }
  }, [recipes, dispatch]);

  const paginatedHandler = (pageNum) => {
    setCurrentPage(pageNum);
    dispatch(setPageNumPrev(pageNum));
  };

  return (
    <section className="home__container">
      <div className="home__container-buttons">
        <Link to={"/"}>
          <button className="home__button-back filter__button">
            Return to the principal Page
          </button>
        </Link>
        {!isAuthenticated ? (
          <LoginButton
            className={"home__button-back filter__button"}
            content={"Login"}
          />
        ) : (
          <LogoutButton className={"home__button-back filter__button"} />
        )}
      </div>
      <div>
        <Filters
          setCurrentPage={setCurrentPage}
          alphabetical={alphabetical}
          setAlphabetical={setAlphabetical}
          healthScore={healthScore}
          setHealthScore={setHealthScore}
        />
        <Paginated
          recipesPerPage={recipePerPeage}
          allRecipes={recipes}
          paginatedHandler={paginatedHandler}
        />
      </div>
      {!recipes.length ? (
        <LoadingSpinner />
      ) : (
        <div className="card__container">
          {!recipes[0].error ? (
            currentRecipe?.map((e) => {
              return (
                <Card
                  key={e.id}
                  name={e.name}
                  healthScore={e.healthScore}
                  image={e.image}
                  id={e.id}
                />
              );
            })
          ) : (
            <p className="card__container-error">
              {recipes[0].error} recipe not found{" "}
              <Link to={"/home"}>
                <button
                  className="filter__button"
                  onClick={() => {
                    history.go(0);
                  }}
                >
                  Back
                </button>
              </Link>
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default Home;

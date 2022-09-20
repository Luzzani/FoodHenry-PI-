import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/actions";
import Card from "./Card";
import "./Home.css";
import LoadingSpinner from "../LoadingSpinner";
import Paginated from "./Paginated";
import Filters from "./Filters";

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const recipes = useSelector((state) => state.recipes);

  // estado para controlar el ordenamiento, creado en este componente para conseguir que se renderice correctamente
  const [alphabetical, setAlphabetical] = useState(true);
  const [healthScore, setHealthScore] = useState(true);
  //Paginado
  // pagina actual inicializada en 1 y funcion actualizadora de la pagina actual
  const [currentPage, setCurrentPage] = useState(1);
  // personajes por pagina inicializado en 9
  const recipePerPeage = 9;
  // indice de la ultima receta
  const lastRecipeIndex = currentPage * recipePerPeage;
  // indice de la primer receta
  const fisrtRecipeIndex = lastRecipeIndex - recipePerPeage;
  //array con los 9 elementos correspondientes
  const currentRecipe = recipes.slice(fisrtRecipeIndex, lastRecipeIndex);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  // setear la pagina en el numero que elija el usuario
  const paginatedHandler = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <section className="home__container">
      <Link to={"/"}>
        <button className="home__button-back filter__button">
          Return to the principal Page
        </button>
      </Link>
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
            currentRecipe.map((e) => {
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

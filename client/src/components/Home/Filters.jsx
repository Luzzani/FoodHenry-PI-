import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterAlphabetically,
  filterScore,
  setPageNumPrev,
} from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

import "./Home.css";

import SearchBar from "./SearchBar";
import SelectFilter from "./SelectFilter";

function Filters(props) {
  const { isAuthenticated } = useAuth0();

  const {
    setCurrentPage,
    alphabetical,
    setAlphabetical,
    healthScore,
    setHealthScore,
  } = props;

  const dispatch = useDispatch();

  const filterAlphabeticalHandler = () => {
    dispatch(filterAlphabetically(alphabetical));
    setCurrentPage(1);
    dispatch(setPageNumPrev(1));
    setAlphabetical((prevState) => !prevState);
  };

  const filterHealthScore = () => {
    dispatch(filterScore(healthScore));
    dispatch(setPageNumPrev(1));
    setCurrentPage(1);
    setHealthScore((prevState) => !prevState);
  };

  return (
    <div className="filter__contianer">
      {isAuthenticated ? (
        <Link to={"/createRecipe"}>
          <button className="filter__button card__hover-effect">
            Create Recipe
          </button>
        </Link>
      ) : (
        <></>
      )}
      <SearchBar setCurrentPage={setCurrentPage} />
      <SelectFilter setCurrentPage={setCurrentPage} />
      <div className="filters__buttons">
        <div>
          {alphabetical ? (
            <button
              className="filter__button card__hover-effect"
              onClick={filterAlphabeticalHandler}
            >
              From A to Z
            </button>
          ) : (
            <button
              className="filter__button card__hover-effect"
              onClick={filterAlphabeticalHandler}
            >
              From Z to A
            </button>
          )}
        </div>
        <div>
          {healthScore ? (
            <button
              className="filter__button card__hover-effect"
              onClick={filterHealthScore}
            >
              Highest health score
            </button>
          ) : (
            <button
              className="filter__button card__hover-effect"
              onClick={filterHealthScore}
            >
              Lowest health score
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filters;

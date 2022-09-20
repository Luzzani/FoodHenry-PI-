import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { filterAlphabetically, filterScore } from "../../redux/actions";
import SearchBar from "./SearchBar";
import "./Home.css";
import SelectFilter from "./SelectFilter";

function Filters(props) {
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
    setAlphabetical((prevState) => !prevState);
  };

  const filterHealthScore = () => {
    dispatch(filterScore(healthScore));
    setCurrentPage(1);
    setHealthScore((prevState) => !prevState);
  };

  return (
    <div className="filter__contianer">
      <Link to={"/createRecipe"}>
        <button className="filter__button">Create Recipe</button>
      </Link>
      <SearchBar setCurrentPage={setCurrentPage} />
      <SelectFilter setCurrentPage={setCurrentPage} />
      <div className="filters__buttons">
        <div>
          {alphabetical ? (
            <button
              className="filter__button"
              onClick={filterAlphabeticalHandler}
            >
              From A to Z
            </button>
          ) : (
            <button
              className="filter__button"
              onClick={filterAlphabeticalHandler}
            >
              From Z to A
            </button>
          )}
        </div>
        <div>
          {healthScore ? (
            <button className="filter__button" onClick={filterHealthScore}>
              Highest health score
            </button>
          ) : (
            <button className="filter__button" onClick={filterHealthScore}>
              Lowest health score
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filters;

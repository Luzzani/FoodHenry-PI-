import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { filterAlphabetically, filterScore } from "../../redux/actions";
import SearchBar from "./SearchBar";
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
    <div>
      <Link to={"/createRecipe"}>Create Recipe</Link>
      <SearchBar />
      <SelectFilter setCurrentPage={setCurrentPage} />;
      <div>
        {alphabetical ? (
          <button onClick={filterAlphabeticalHandler}>From A to Z</button>
        ) : (
          <button onClick={filterAlphabeticalHandler}>From Z to A</button>
        )}
      </div>
      <div>
        {healthScore ? (
          <button onClick={filterHealthScore}>Highest health score</button>
        ) : (
          <button onClick={filterHealthScore}>Lowest health score</button>
        )}
      </div>
    </div>
  );
}

export default Filters;

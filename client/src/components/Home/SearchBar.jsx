import { useState } from "react";
import { useDispatch } from "react-redux";
import "./Home.css";
import { getRecipeByName, setPageNumPrev } from "../../redux/actions";

function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState("");

  const searchHandler = () => {
    dispatch(getRecipeByName(inputSearch));
    setCurrentPage(1);
    setPageNumPrev(1)
    setInputSearch("");
  };

  return (
    <div className="search__container">
      <input
        className="filter__button search__input"
        value={inputSearch}
        type="search"
        placeholder="Search by name..."
        onChange={(e) => {
          setInputSearch(e.target.value);
        }}
      />
      <button className="filter__button search__button" onClick={() => searchHandler()}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;

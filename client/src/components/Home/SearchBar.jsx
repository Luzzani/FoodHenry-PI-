import { useState } from "react";
import { useDispatch } from "react-redux";

import { getRecipeByName } from "../../redux/actions";

function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState("");

  const searchHandler = () => {
    dispatch(getRecipeByName(inputSearch));
    setCurrentPage(1);
    setInputSearch("");
  };

  return (
    <div>
      <input
        className="filter__button"
        value={inputSearch}
        type="search"
        placeholder="Search by name..."
        onChange={(e) => {
          setInputSearch(e.target.value);
        }}
      />
      <button className="filter__button" onClick={() => searchHandler()}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;

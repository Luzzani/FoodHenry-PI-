import { useState } from "react";
import { useDispatch } from "react-redux";

import { getRecipeByName } from "../../redux/actions";

function SearchBar() {
    const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState("");

  const searchHandler = () => {
    dispatch(getRecipeByName(inputSearch));
    setInputSearch('')
  };

  return (
    <div>
      <input
        value={inputSearch}
        type="search"
        placeholder="Search by name..."
        onChange={(e) => {
          setInputSearch(e.target.value);
        }}
      />
      <button onClick={() => searchHandler()}>Search</button>
    </div>
  );
}

export default SearchBar;

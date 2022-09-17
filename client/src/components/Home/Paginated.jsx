import React from "react";
import { useDispatch } from "react-redux";
import { prevPaginated } from "../../redux/actions";

function Paginated({ recipesPerPage, allRecipes, paginatedHandler }) {
  const dispatch = useDispatch();

  const prevPag = (num) => {
    paginatedHandler(num);
    dispatch(prevPaginated(num));
  };

  const pageNum = [];

  for (let i = 0; i < Math.ceil(allRecipes.length / recipesPerPage); i++) {
    pageNum.push(i + 1);
  }

  return (
    <ul>
      {pageNum &&
        pageNum.map((num) => {
          return <li key={num}>{<button onClick={() => prevPag(num)}>{num}</button>}</li>;
        })}
    </ul>
  );
}

export default Paginated;

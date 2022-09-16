import React from "react";

function Paginated({ recipesPerPage, allRecipes, paginatedHandler }) {
  const pageNum = [];

  for (let i = 0; i < Math.ceil(allRecipes.length / recipesPerPage); i++) {
    pageNum.push(i + 1);
  }


  return (
    <ul>
      {pageNum &&
        pageNum.map((num) => {
          return (
            <li key={num}>
              {<button onClick={() => paginatedHandler(num)}>{num}</button>}
            </li>
          );
        })}
    </ul>
  );
}

export default Paginated;

import "./Home.css";

function Paginated({ recipesPerPage, allRecipes, paginatedHandler }) {

 const prevPag = (num) => {
    paginatedHandler(num);
  };

  const pageNum = [];

  for (let i = 0; i < Math.ceil(allRecipes.length / recipesPerPage); i++) {
    pageNum.push(i + 1);
  }

  return (
    <ul className="paginated__container">
      {pageNum &&
        pageNum.map((num) => {
          return (
            <li key={num}>
              {
                <button
                  className="paginated__number"
                  onClick={() => prevPag(num)}
                >
                  {num}
                </button>
              }
            </li>
          );
        })}
    </ul>
  );
}

export default Paginated;

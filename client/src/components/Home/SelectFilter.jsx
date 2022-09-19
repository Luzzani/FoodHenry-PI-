import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterRecipesByDiet, getDiets } from "../../redux/actions";

function SelectFilter({ setCurrentPage }) {
  const dispatch = useDispatch();
  const listDiets = useSelector((state) => state.dietList);

  useEffect(() => {
    if (listDiets.length === 0) {
      dispatch(getDiets());
    }
  }, [dispatch, listDiets]);

  const dietFilterHandler = (e) => {
    dispatch(filterRecipesByDiet(e.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <select className="filter__button" onChange={(e) => dietFilterHandler(e)}>
        <option value="" disabled selected>
          Diet Types
        </option>
        <option value="all diet">All diet</option>
        {listDiets?.map((e) => (
          <option key={e.id} value={e.name}>
            {e.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectFilter;

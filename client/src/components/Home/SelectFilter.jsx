import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterRecipesByDiet,
  getDiets,
  setPageNumPrev,
} from "../../redux/actions";

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
    dispatch(setPageNumPrev(1));
    setCurrentPage(1);
  };

  return (
    <>
      <select
        className="filter__button select__button"
        onChange={(e) => dietFilterHandler(e)}
      >
        <option value="all diet">All diet</option>
        {listDiets &&
          listDiets.map((e) => (
            <option key={e.id} value={e.name}>
              {e.name}
            </option>
          ))}
      </select>
    </>
  );
}

export default SelectFilter;

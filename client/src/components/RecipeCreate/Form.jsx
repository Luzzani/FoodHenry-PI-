import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  postRecipe,
  getDiets,
  setPageNumPrev,
  getRecipes,
} from "../../redux/actions";

import "./RecipeCreate.css";
import StepsForm from "./StepsForm";

import { validate } from "../../utils/utilsFunctions";

function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const dietList = useSelector((state) => state.dietList);
  const [errors, setErrors] = useState("");
  const [send, setSend] = useState(false);
  const [steps, setSteps] = useState([]);
  const [noMoreSteps, setNoMoreSteps] = useState(true);
  const [showSteps, setShowSteps] = useState(false);

  const [newRecipe, setNewRecipe] = useState({
    name: "",
    summary: "",
    steps: "",
    image: "",
    healthScore: 0,
    dietTypes: [],
  });
console.log({newRecipe});
  useEffect(() => {
    dispatch(getDiets());

    return () => {
      dispatch(getRecipes());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setNewRecipe((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });

    if (send) {
      setErrors(validate(newRecipe));
    }
  };

  const handleCheckbox = (e) => {
    let updatedList = [...newRecipe.dietTypes];

    e.target.checked
      ? (updatedList = [...newRecipe.dietTypes, e.target.value])
      : updatedList.splice(newRecipe.dietTypes.indexOf(e.target.value), 1);

    setNewRecipe({
      ...newRecipe,
      dietTypes: updatedList,
    });

    if (send) setErrors(validate(newRecipe));
  };

  const finishedStepHandle = (e, steps) => {
    e.preventDefault();
    setNewRecipe({
      ...newRecipe,
      steps: steps,
    });
    setNoMoreSteps((prevState) => !prevState);
    setShowSteps(false);
  };

  const handleSubmit = (e, steps) => {
    e.preventDefault();

    setErrors(validate(newRecipe));

    if (
      newRecipe.name.trim().length < 1 ||
      newRecipe.summary.trim().length < 0 ||
      newRecipe.steps === "" ||
      newRecipe.dietTypes.length === 0 ||
      newRecipe.healthScore < 1 ||
      newRecipe.healthScore > 100
    ) {
      return setSend(true);
    }
    dispatch(setPageNumPrev(1));
    dispatch(postRecipe({ ...newRecipe, steps: steps }));

    alert("Recipe created successfully");

    history.push("/");
  };

  return (
    <form className="form__container" onSubmit={(e) => handleSubmit(e, steps)}>
      <label htmlFor="name">
        Recipe name:
        <input
          id="name"
          placeholder="name"
          name="name"
          value={newRecipe.name}
          onChange={(e) => handleChange(e)}
        />
      </label>
      {errors.name && <span>{errors.name}</span>}
      <label htmlFor="number">
        Healt Score:
        <input
          id="number"
          type="number"
          name="healthScore"
          value={newRecipe.healthScore}
          onChange={(e) => handleChange(e)}
        />
      </label>
      {errors.healthScore && <span>{errors.healthScore}</span>}
      <label htmlFor="image">
        Url image:
        <input
          id="image"
          type="text"
          name="image"
          placeholder="image url"
          value={newRecipe.image}
          onChange={(e) => handleChange(e)}
        />
      </label>
      {noMoreSteps ? (
        <StepsForm
          setSteps={setSteps}
          setShowSteps={setShowSteps}
          showSteps={showSteps}
        />
      ) : (
        <></>
      )}
      {errors.steps && <span>{errors.steps}</span>}
      {showSteps ? (
        <ul className="form__steps-list">
          {steps.length > 0 &&
            steps.map((e) => {
              return (
                <li key={e.number + e.step}>
                  {e.step}
                  <ul>
                    {e.ingredients?.map((el) => (
                      <li key={el.id}>{el.name}</li>
                    ))}
                  </ul>
                </li>
              );
            })}
        </ul>
      ) : (
        <></>
      )}

      <button
        className="form__steps-button"
        onClick={(e) => finishedStepHandle(e, steps)}
      >
        No more steps
      </button>
      <label>
        Diet types:
        <div className="form__diet-types">
          {dietList?.map((e) => {
            return (
              <label className="check__label" key={e.id}>
                {e.name + " "}
                <input
                  type="checkbox"
                  name={e.name}
                  value={e.name}
                  onChange={(e) => handleCheckbox(e)}
                />
                <span className="check"></span>
              </label>
            );
          })}
          {errors.dietTypes && <span>{errors.dietTypes}</span>}
        </div>
      </label>
      <textarea
        className="form__summary"
        placeholder="summary"
        name="summary"
        value={newRecipe.summary}
        onChange={(e) => handleChange(e)}
      />
      {errors.summary && <span>{errors.summary}</span>}
      <button className="form__steps-button" type="submit">
        Send
      </button>
    </form>
  );
}

export default Form;

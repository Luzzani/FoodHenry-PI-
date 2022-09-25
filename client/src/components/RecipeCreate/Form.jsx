import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { postRecipe, getDiets } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "../../utils/utilsFunctions";
import "./RecipeCreate.css";
import StepsForm from "./StepsForm";

function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const dietList = useSelector((state) => state.dietList);
  const [errors, setErrors] = useState("");
  const [send, setSend] = useState(false);
  const [steps, setSteps] = useState([]);
  const [noMoreSteps, setNoMoreSteps] = useState(true);

  const [input, setInput] = useState({
    name: "",
    summary: "",
    steps: "",
    image: "",
    healthScore: 0,
    dietTypes: [],
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
    if (send) {
      setErrors(validate(input));
    }
  };

  const handleCheckbox = (e) => {
    let updatedList = [...input.dietTypes];
    e.target.checked
      ? (updatedList = [...input.dietTypes, e.target.value])
      : updatedList.splice(input.dietTypes.indexOf(e.target.value), 1);

    setInput({
      ...input,
      dietTypes: updatedList,
    });

    if (send) setErrors(validate(input));
  };

  const finishedStepHandle = (steps) => {
    setNoMoreSteps((prevState) => !prevState);
    setInput({
      ...input,
      steps: steps,
    });
  };

  const handleSubmit = (e, steps) => {
    e.preventDefault();

    setErrors(validate(input));

    if (
      input.name === "" ||
      input.summary === "" ||
      input.steps === "" ||
      input.dietTypes.length === 0 ||
      input.healthScore < 1 ||
      input.healthScore > 100
    ) {
      return setSend(true);
    }

    dispatch(postRecipe({ ...input, steps: steps }));
    console.log({ ...input, steps });

    alert("Recipe created successfully");

    history.push("/home");
  };

  return (
    <form className="form__container" onSubmit={(e) => handleSubmit(e, steps)}>
      {noMoreSteps ? <StepsForm setSteps={setSteps} /> : <></>}
      {errors.steps && <span>{errors.steps}</span>}
      <button
        className="form__steps-button"
        onClick={() => finishedStepHandle(steps)}
      >
        No more steps
      </button>
      <label htmlFor="name">
        Recipe name:
        <input
          id="name"
          placeholder="name"
          name="name"
          value={input.name}
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
          value={input.healthScore}
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
          value={input.image}
          onChange={(e) => handleChange(e)}
        />
      </label>
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
        value={input.summary}
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

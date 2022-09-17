import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { postRecipe, getDiets } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "../../utils/utilsFunctions";

function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const dietList = useSelector((state) => state.dietList);
  const [errors, setErrors] = useState("");
  const [send, setSend] = useState(false);

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
    setInput({
      ...input,
      [e.target.name]: e.target.value,
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

  const handleSubmit = (e) => {
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

    let stepByStep = input.steps.split(",");
    let steps = stepByStep.map((e, i) => {
      return { number: i + 1, step: e };
    });

    dispatch(postRecipe({ ...input, steps: steps }));

    alert("Recipe created successfully");

    history.push("/home");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        placeholder="name"
        name="name"
        value={input.name}
        onChange={(e) => handleChange(e)}
      />
      {errors.name && <p>{errors.name}</p>}
      <label>
        Healt Score:{" "}
        <input
          type="number"
          name="healthScore"
          value={input.healthScore}
          onChange={(e) => handleChange(e)}
        />
      </label>
      {errors.healthScore && <p>{errors.healthScore}</p>}
      <input
        type="text"
        name="image"
        placeholder="image url"
        value={input.image}
        onChange={(e) => handleChange(e)}
      />
      <input
        placeholder="recipe steps"
        name="steps"
        value={input.steps}
        onChange={(e) => handleChange(e)}
      />
      {errors.steps && <p>{errors.steps}</p>}
      {dietList.map((e) => {
        return (
          <label key={e.id}>
            {e.name}
            <input
              type="checkbox"
              name={e.name}
              value={e.name}
              onChange={(e) => handleCheckbox(e)}
            />
          </label>
        );
      })}
      {errors.dietTypes && <p>{errors.dietTypes}</p>}
      <textarea
        placeholder="summary"
        name="summary"
        value={input.summary}
        onChange={(e) => handleChange(e)}
      />
      {errors.summary && <p>{errors.summary}</p>}
      <button type="submit">Send</button>
    </form>
  );
}

export default Form;

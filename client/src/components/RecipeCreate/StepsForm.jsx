import { useState } from "react";
import "./RecipeCreate.css";

function StepsForm({ setSteps, setShowSteps, showSteps }) {
  const [stepObjet, setStepObject] = useState({
    step: "",
    ingredients: [],
    number: 1,
  });

  const [ingredient, setIngredient] = useState("");
  const [validateIngredient, setValidateIngredient] = useState(false);

  const stepHandler = (e, ingredient) => {
    if (e.target.name === "step") {
      setStepObject((prevState) => {
        return {
          ...prevState,
          step: e.target.value,
        };
      });
    } else {
      if (ingredient.trim().length === 0) return;

      setStepObject((prevState) => {
        let auxList = [...prevState.ingredients];

        if (
          stepObjet.ingredients?.find(
            (e) => e.name.toLowerCase() === ingredient.toLowerCase()
          )
        ) {
          setIngredient("");
          return { ...prevState };
        }

        return {
          ...prevState,
          ingredients: [
            ...auxList,
            { name: ingredient, id: `${Math.random()}${ingredient}` },
          ],
        };
      });
      setIngredient("");
    }
  };

  const addStepHandle = () => {
    if (stepObjet.step.trim() !== "") {
      setValidateIngredient(true);
    }
  };

  const cleanIngredientHandler = (name) => {
    const updatedList = stepObjet.ingredients?.filter((e) => e.name !== name);

    setStepObject((prevState) => {
      return {
        ...prevState,
        ingredients: updatedList,
      };
    });
  };

  const setStepsHandler = () => {
    setValidateIngredient(false);

    setStepObject((prevState) => {
      return { ...prevState, number: prevState.number + 1 };
    });

    setSteps((prevState) => {
      return [...prevState, { ...stepObjet }];
    });

    setStepObject((prevState) => {
      return {
        ...prevState,
        step: "",
        ingredients: [],
      };
    });
  };

  return (
    <>
      {validateIngredient ? (
        <>
          <label>
            Ingredients for the step:
            <input
              value={ingredient}
              type="text"
              placeholder="ingredient"
              name="ingredients"
              onChange={(e) => setIngredient(e.target.value)}
            />
            <button
              className="form__steps-button"
              onClick={(e) => stepHandler(e, ingredient)}
            >
              Add Ingredient
            </button>
            <button className="form__steps-button" onClick={setStepsHandler}>
              Finished
            </button>
          </label>
          <ul className="form__steps-list">
            {stepObjet.ingredients?.map((e) => {
              return (
                <li key={e.id}>
                  {e.name}{" "}
                  <button
                    className="form__steps-button"
                    onClick={() => cleanIngredientHandler(e.name)}
                  >
                    X
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <label>
          Step by Step:
          <input
            type="text"
            placeholder="step"
            name="step"
            onChange={(e) => stepHandler(e)}
          />
          <button className="form__steps-button" onClick={addStepHandle}>
            Add Step
          </button>
          <button
            className="form__steps-button"
            onClick={() => setShowSteps((prevState) => !prevState)}
          >
            {!showSteps ? <>Show Steps</> : <>Hide Steps</>}
          </button>
        </label>
      )}
    </>
  );
}

export default StepsForm;

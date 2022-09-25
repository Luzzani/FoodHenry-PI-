import { useState } from "react";
import "./RecipeCreate.css";

function StepsForm({ setSteps }) {
  const [stepObjet, setStepObject] = useState({
    step: "",
    ingredients: [],
    number: 1,
  });
  const [ingredient, setIngredient] = useState("");
  const [validateIngredient, setValidateIngredient] = useState(false);

  console.log({
    ingredient,
    validateIngredient,
    stepObjet,
  });

  const stepHandler = (e, ingredient) => {
    if (e.target.name === "step") {
      setStepObject((prevState) => {
        return {
          ...prevState,
          step: e.target.value,
        };
      });
    } else {
      if (ingredient.trim() === "") return;
      setStepObject((prevState) => {
        console.log({ prevState });
        let auxList = [...prevState.ingredients];
        if (
          ingredient &&
          stepObjet.ingredients.find((e) => e.name === ingredient)
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
          <ul>
            {stepObjet.ingredients?.map((e) => {
              return (
                <li key={e.id}>
                  {e.name}
                  <button>X</button>
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
        </label>
      )}
    </>
  );
}

export default StepsForm;

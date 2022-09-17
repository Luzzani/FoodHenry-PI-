

export const validate = (input) => {
  let errors = {};

  if (input.name === "") {
    errors.name = `You must enter a name`;
  }
  if (input.summary === "") {
    errors.summary = `You must enter a summary`;
  }
  if (input.steps === "") {
    errors.steps = `You must enter at least one step`;
  }
  if (input.healthScore < 1 || input.healthScore > 100) {
    errors.steps = `You must enter a number between 1 and 100`;
  }
  if (!input.dietTypes.length) {
    errors.dietTypes = `You must select at least one diet type`;
  }

  return errors;
};

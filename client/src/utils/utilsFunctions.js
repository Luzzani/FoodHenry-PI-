export const validate = (input) => {
  let errors = {};

  if (input.name.trim().length < 1) {
    errors.name = `You must enter a name`;
  }
  if (input.summary.trim().length < 1) {
    errors.summary = `You must enter a summary`;
  }
  if (input.steps === "") {
    errors.steps = `You must enter at least one step`;
  }
  if (input.healthScore < 1 || input.healthScore > 100) {
    errors.healthScore = `You must enter a number between 1 and 100`;
  }
  if (!input.dietTypes.length) {
    errors.dietTypes = `You must select at least one diet type`;
  }

  return errors;
};


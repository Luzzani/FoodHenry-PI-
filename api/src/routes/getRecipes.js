const { Router } = require("express");
const {
  getApiInfoById,
  getDbInfoById,
  getAllInfo,
} = require("../routesFunction");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  let allInfo = await getAllInfo();

  if (name) {
    try {
      let filteredRecipe = await allInfo.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );

      filteredRecipe.length
        ? res.status(200).send(filteredRecipe)
        : res.status(404).send("Recipe not found");
    } catch (error) {
      return res.status(400).send("Something went wrong");
    }
  } else {
    res.send(allInfo);
  }
});

router.get("/:idRecipe", async (req, res) => {
  const { idRecipe } = req.params;
  try {
    if (idRecipe.length > 10) {
      let recipeDb = await getDbInfoById(idRecipe);
      return res.status(200).send(recipeDb);
    }

    let recipeApi = await getApiInfoById(idRecipe);
    let recipeDetail = {
      image: recipeApi.data.image,
      name: recipeApi.data.title,
      dishTypes: recipeApi.data.dishTypes,
      diet: recipeApi.data.diet,
      summary: recipeApi.data.summary,
      score: recipeApi.data.score,
      healthScore: recipeApi.data.healthScore,
      steps: recipeApi.data.analyzedInstructions[0]?.steps.map((e) => {
        return {
          number: e.number,
          step: e.step,
        };
      }),
    };

    return res.status(200).send(recipeDetail);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }

});

module.exports = router;

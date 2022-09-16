const { Router } = require("express");
const { Recipe, Diet } = require("../db");

const router = Router();

router.post("/", async (req, res) => {
  const { name, summary, healthScore, steps, image, dietTypes } = req.body;
  if ((!name || !summary || !healthScore || !steps || !dietTypes))
    return res.status(400).send("Missing data");

  const newRecipe = await Recipe.create({
    name,
    summary,
    healthScore,
    steps,
    image,
  });

  let getDiet = await Diet.findAll({
    where: {
      name: dietTypes,
    },
  });
  
  newRecipe.addDiet(getDiet);
  return res.status(200).send(newRecipe);

});

module.exports = router;

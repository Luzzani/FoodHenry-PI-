const { Router } = require("express");
const { Recipe } = require("../db");
const router = Router();

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Recipe.destroy({
    where: {
      id,
    },
  })
    .then(() => {
      res.send("Recipe deleted");
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;

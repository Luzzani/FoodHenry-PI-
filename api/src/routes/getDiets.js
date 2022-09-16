const { Router } = require("express");
const { Diet } = require("../db");
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
  let diet = await Diet.findAll();
  res.send(diet);
});

module.exports = router;

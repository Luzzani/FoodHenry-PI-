const server = require("./src/app.js");

const { conn, Diet } = require("./src/db.js");
const { PORT } = process.env;

const dietsDb = [
  "dairy free",
  "gluten free",
  "ketogenic",
  "lacto ovo vegetarian",
  "fodmap friendly",
  "paleolithic",
  "pescatarian",
  "primal",
  "vegan",
  "whole 30",
];
// Syncing all the models at once.
conn
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
    });
  })
  .then(() => {
    dietsDb.map((e) => Diet.findOrCreate({ where: { name: e } }));
  });

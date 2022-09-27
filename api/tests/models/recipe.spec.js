const { Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Recipe.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Recipe.create({ name: "Milanesa a la napolitana" });
      });
    });

    describe("summary", () => {
      it("should throw an error if summary is null", (done) => {
        Recipe.create({})
          .then(() => done(new Error("It requires a valid summary")))
          .catch(() => done());
      });
      it("should work when its a valid summary", () => {
        Recipe.create({ summary: "Descripcion de la comida..." });
      });
    });

    describe("healthScore", () => {
      it("should throw an error if healthScore is null", (done) => {
        Recipe.create({})
          .then(() => done(new Error("It requires a valid healthScore")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Recipe.create({ healthScore: 98 });
      });

      it("should throw an error if healthScore is less than 1 or greater than 100 ", () => {
        Recipe.create({ healthScore: 106 })
          .then(() => done(new Error("It requires a valid healthScore")))
          .catch(() => done());

        });
    });

    describe("id", () => {
      it("should throw an error if id is null", (done) => {
        Recipe.create({})
          .then(() => done(new Error("It requires a valid id")))
          .catch(() => done());
      });
      it("should work when its a valid id", () => {
        Recipe.create({ id: 3215263443 });
      });
    });
  });
});

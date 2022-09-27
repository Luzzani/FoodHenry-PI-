/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");

const agent = session(app);
const recipe = {
  name: "Milanea a la napolitana",
  summary: "una buena milanesa que te alegra el corazon",
  healthScore: 89,
};

describe("Recipe routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Recipe.sync({ force: true }).then(() => Recipe.create(recipe))
  );

  describe("GET /api/recipes", () => {
    it("should get 200", () => agent.get("/api/recipes").expect(200));
  });

  it("responde con un error si la receta no existe", () => {
    agent
      .get("/api/recipes/recetabionica")
      .expect(404)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        expect(res.body).to.eql({ error: "La receta no existe" });
      });
  });
});

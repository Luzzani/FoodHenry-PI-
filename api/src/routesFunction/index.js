const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY3 } = process.env;

//

const getInfoApi = async () => {
  const apiInfo = await axios.get(
    //`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY3}&number=100&addRecipeInformation=true`
  );
  const apiData = await apiInfo.data.results.map((e) => {
    return {
      id: e.id,
      name: e.title,
      summary: e.summary,
      healthScore: e.healthScore,
      image: e.image,
      diets: e.diets,
      steps: e.analyzedInstructions[0]?.steps.map((e) => {
        return {
          number: e.number,
          step: e.step,
          ingredients: e.ingredients,
        };
      }),
    };
  });
  return apiData;
};

const getInfoDB = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
    },
  });
};

const getApiInfoById = async (id) => {
  return await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY3}`
  );
};

const getDbInfoById = async (id) => {
  return await Recipe.findByPk(id, {
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllInfo = async () => {
  const apiInfo = await getInfoApi();
  const dbInfo = await getInfoDB();
  const allInfo = apiInfo.concat(dbInfo);

  return allInfo;
};

module.exports = {
  getAllInfo,
  getDbInfoById,
  getApiInfoById,
  getInfoDB,
  getInfoApi,
};

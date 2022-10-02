import axios from "axios";


import {
  GET_ALL_RECIPE,
  GET_RECIPE_NAME,
  GET_RECIPE_DETAIL,
  CREATE_RECIPE,
  ORDER_RECIPE,
  ORDER_HEALTH_SCORE,
  GET_LIST_DIETS,
  FILTER_DIETS,
  BACK_PAGE,
  RETURN_PAGE,
  DELETE_RECIPE,
} from "./actionsConst";

export function getRecipes() {
  return (dispatch) => {
    axios
      .get(`${axios.defaults.baseURL}/api/recipes`)
      .then((response) => {
        return dispatch({ type: GET_ALL_RECIPE, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getDiets() {
  return (dispatch) => {
    axios
      .get(`${axios.defaults.baseURL}/api/diets`)
      .then((response) => {
        return dispatch({ type: GET_LIST_DIETS, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function filterRecipesByDiet(value) {
  return {
    type: FILTER_DIETS,
    payload: value,
  };
}

export function filterAlphabetically(value) {
  return {
    type: ORDER_RECIPE,
    payload: value,
  };
}

export function filterScore(value) {
  return {
    type: ORDER_HEALTH_SCORE,
    payload: value,
  };
}

export function getRecipeByName(name) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `${axios.defaults.baseURL}/api/recipes?name=${name}`
      );
      return dispatch({
        type: GET_RECIPE_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: GET_RECIPE_NAME,
        payload: [{ error: name }],
      });
    }
  };
}

export function postRecipe(recipe) {
  return async function (dispatch) {
    const response = await axios.post(
      `${axios.defaults.baseURL}/api/recipes`,
      recipe
    );
    console.log(response);
    return dispatch({ type: CREATE_RECIPE });
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`${axios.defaults.baseURL}/api/recipes/${id}`);
      return dispatch({
        type: GET_RECIPE_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: GET_RECIPE_DETAIL,
        payload: { name: "Recipe not found" },
      });
    }
  };
}

export function cleanPag() {
  return { type: BACK_PAGE, payload: {} };
}

export function setPageNumPrev(prevNum) {
  return {
    type: RETURN_PAGE,
    payload: prevNum,
  };
}

export function deleteRecipe(id) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${axios.defaults.baseURL}/api/recipes/${id}`
      );
      dispatch({ type: DELETE_RECIPE, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

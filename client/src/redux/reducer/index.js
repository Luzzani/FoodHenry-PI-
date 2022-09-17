import {
  GET_ALL_RECIPE,
  FILTER_DIETS,
  GET_LIST_DIETS,
  ORDER_RECIPE,
  ORDER_HEALTH_SCORE,
  GET_RECIPE_NAME,
  CREATE_RECIPE,
  GET_RECIPE_DETAIL,
 BACK_PAGE,
 PREVPAGINATED
} from "../actions/actionsConst";

const initialState = {
  prevPaginated: 0,
  recipes: [],
  allRecipes: [],
  dietList: [],
  recipeDetail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPE:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case GET_LIST_DIETS:
      return {
        ...state,
        dietList: action.payload,
      };

    case FILTER_DIETS:
      const allRecipes = state.allRecipes;
      const filteredByDiet =
        action.payload === "all diet"
          ? allRecipes
          : allRecipes.filter((e) => e.diets?.includes(action.payload));

      return {
        ...state,
        recipes: filteredByDiet,
      };

    case ORDER_RECIPE:
      const filteredRecipes = state.recipes.sort((a, b) => {
        if (action.payload) {
          if (a.name < b.name) return -1;
          if (b.name < a.name) return 1;
          return 0;
        } else {
          if (b.name < a.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        }
      });

      return {
        ...state,
        recipes: filteredRecipes,
      };

    case ORDER_HEALTH_SCORE:
      const filteredRecipesScore = state.recipes.sort((a, b) => {
        if (!action.payload) {
          if (a.healthScore < b.healthScore) return -1;
          if (b.healthScore < a.healthScore) return 1;
          return 0;
        } else {
          if (b.healthScore < a.healthScore) return -1;
          if (a.healthScore < b.healthScore) return 1;
          return 0;
        }
      });

      return {
        ...state,
        recipes: filteredRecipesScore,
      };

    case GET_RECIPE_NAME:
      return {
        ...state,
        recipes: action.payload,
      };

    case CREATE_RECIPE:
      return {
        ...state,
      };

    case GET_RECIPE_DETAIL:
      console.log(action.payload);
      return {
        ...state,
        recipeDetail: action.payload,
      };

      case BACK_PAGE: return {
        ...state, 
        recipeDetail: action.payload
        
      }

      case PREVPAGINATED: return {
        ...state, 
        prevPaginated: action.payload
      }

    default:
      return state;
  }
}

export default rootReducer;

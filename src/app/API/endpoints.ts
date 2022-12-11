import { IRecipe } from './../interfaces/recipeInterface';
export const API_URL = "http://localhost:3030";//GET

export const endpoints = {
  //REGULAR + MODIFICATIONS***************
  API_DETAILS: (id: string | number) => `/details/${id}`,//GET req
  API_EDIT: (id: string | number, value: IRecipe) => `/edit/${id}`,//PUT req
  API_DELETE: (id: string | number) => `/delete/${id}`,//DELETE req
  API_LIKE: (id: string | number) => `/like/${id}`,//GET req
  API_GET_USER: (id: string | number) => `/user-get/${id}`,//GET req
  API_EDIT_USER_IMAGE: (id: string | number) => `/user-edit/${id}`,//PUT req
  //AUTH**********************************
  API_REGISTER: `/auth/register`,//POST req
  API_LOGIN: `/auth/login`,//POST req
  API_LOGOUT: `/auth/logout`,//GET req
  //RECIPE********************************
  API_BROWSE: `/recipe/browse`,//GET req
  API_MYRECIPES: `/recipe/myRecipes`,//GET req
  API_MACROS: `/recipe/macros`,//GET req
  API_ADD: `/recipe/add`,//POST req
  // *************************************
}

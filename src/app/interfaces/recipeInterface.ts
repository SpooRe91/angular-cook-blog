export interface IRecipe {
  name: string,
  image: string,
  portions: number,
  difficulty: string,
  ingredients: string,
  fullRecipe: string
  createdAt: string,
  isDeleted?: boolean,
  owner?: string
  ownerName?: string,
  updatedAt?: string,
  __v?: number,
  _id: string
}

export interface IRecipeForm {
  name: string,
  image: string,
  portions: number,
  difficulty: string,
  ingredients: string,
  fullRecipe: string
}

export interface IEditRecipe {
  name: string,
  image: string,
  portions: number,
  difficulty: string,
  ingredients: string,
  fullRecipe: string
  createdAt: string,
  isDeleted?: boolean,
  owner?: string
  ownerName?: string,
  updatedAt?: string,
  __v?: number,
  _id?: string
}


export interface IRecipe {
  createdAt: {
    type: String,
  },
  difficulty: {
    type: String,
  },
  fullRecipe: {
    type: String,
  },
  image: {
    type: String,
  },
  ingredients: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
  }
  name: {
    type: String,
  },
  owner: {
    type: String,
  },
  ownerName: {
    type: String,
  },
  portions: {
    type: Number,
  },
  updatedAt: {
    type: String,
  },
  __v: {
    type: Number,
  }
  _id: {
    type: String,
  }
}

export interface ICreateRecipe {
  name: string,
  image: string,
  portions: number,
  difficulty: string,
  ingredients: string,
  fullRecipe: string
}


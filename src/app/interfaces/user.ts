export interface IUser {
  email?: string,
  id?: string,
  image?: string,
  token?: string
}

export interface IUserAuth {
  email: string,
  password: string,
  rePassword?: string
}


export interface IUser {
  email?: string,
  id?: string,
  token?: string,
  updatedAt?: string,
}

export interface IUserAuth {
  email: string,
  password: string,
  rePassword?: string
}


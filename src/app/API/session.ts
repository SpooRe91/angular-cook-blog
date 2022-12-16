import { IUser } from './../interfaces/user';
export const setSession = ({ email, id, token }: IUser) => {

  const user = { email, id, token };
  sessionStorage.setItem("User", JSON.stringify(user));
  localStorage.setItem("User", JSON.stringify(user));
}

export const getSession = () => {
  const session = sessionStorage.getItem('User')
  const local = localStorage.getItem('User');
  return (
    session ? JSON.parse(session) : null,
    local ? JSON.parse(local) : null
  );
}

export const logoutSession = () => {
  sessionStorage.removeItem('User');
  localStorage.removeItem('User');
}

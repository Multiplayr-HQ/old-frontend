import cookie from 'js-cookie';
export const addUserToLocalStorage = (data) => {
  localStorage.setItem('user', JSON.stringify(data));
  // setToken(data.token);
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};
export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user');
  const user = result ? JSON.parse(result) : null;
  return user;
};

const setToken = (token) => {
  cookie.set('token', token);
};

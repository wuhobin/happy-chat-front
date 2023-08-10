const TokenKey = 'token'

export function setToken(token) {
  localStorage.setItem(TokenKey, token);
}

export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function removeToken() {
  localStorage.removeItem(TokenKey);
}



const USER_KEY = 'userInfo'; // 根据实际情况定义存储的键名

export function setUserInfo(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUserInfo() {
  const userJson = localStorage.getItem(USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
}

export function removeUser() {
  localStorage.removeItem(USER_KEY);
}
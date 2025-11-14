// Mock authentication service
const FAKE_USER = { username: "admin", password: "admin123" };
const TOKEN_KEY = "mock_token";

export const login = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === FAKE_USER.username && password === FAKE_USER.password) {
        const token = "fake-jwt-token"; // mock token
        localStorage.setItem(TOKEN_KEY, token);
        const user = { username };
        localStorage.setItem('mock_user', JSON.stringify(user));
        resolve({ user, token });
      } else {
        reject("Invalid username or password");
      }
    }, 1000); // simulate network delay
  });
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('mock_user');
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Mock token refresh
export const refreshToken = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const token = "fake-jwt-token-refreshed";
      localStorage.setItem(TOKEN_KEY, token);
      resolve(token);
    }, 500);
  });
};

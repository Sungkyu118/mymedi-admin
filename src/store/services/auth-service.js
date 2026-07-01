import axios from "axios";
import { API_BASE_URL } from "../../env";

const AUTH_TOKEN_KEY = "vue-authenticate.vueauth_access_token";

function getStoredToken() {
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

function setAuthorizationHeader(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete axios.defaults.headers.common.Authorization;
}

function persistToken(token) {
  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  setAuthorizationHeader(token);
}

function clearToken() {
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  setAuthorizationHeader(null);
}

function extractAccessToken(payload) {
  const responseData = payload && payload.data;
  const responseAttributes = responseData && responseData.attributes;
  const responseMeta = payload && payload.meta;

  return (
    (payload && payload.access_token) ||
    (payload && payload.token) ||
    (responseData && responseData.access_token) ||
    (responseAttributes && responseAttributes.access_token) ||
    (responseMeta && responseMeta.access_token) ||
    null
  );
}

async function authenticate(url, user, requestOptions = {}) {
  const response = await axios.post(`${API_BASE_URL}${url}`, user, requestOptions);
  const accessToken = extractAccessToken(response.data);

  if (!accessToken) {
    throw new Error("Authentication response did not include an access token.");
  }

  persistToken(accessToken);
  return response;
}

function initialize() {
  setAuthorizationHeader(getStoredToken());
}

function isAuthenticated() {
  return Boolean(getStoredToken());
}

function login(user, requestOptions) {
  return authenticate("/login", user, requestOptions);
}

function register(user, requestOptions) {
  return authenticate("/register", user, requestOptions);
}

function logout() {
  clearToken();
  return Promise.resolve();
}

export default {
  initialize,
  isAuthenticated,
  login,
  register,
  logout,
};

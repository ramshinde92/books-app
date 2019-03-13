import { BASE_URL, AUTH_REQUEST_BODY } from "../constants";

const authService = {
  isAuthenticated: !!localStorage.getItem("isAuthenticated"),
  authenticate() {
    return fetch(`${BASE_URL}/auth`, AUTH_REQUEST_BODY)
      .then(_ => true)
      .catch(_ => false);
  },
  async subscription() {
    try {
      const response = await fetch(`${BASE_URL}/me`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Unable to fetch subscription");
    }
  },
  get() {
    return this.isAuthenticated;
  },
  setAuthenticated() {
    localStorage.setItem("isAuthenticated", true);
    this.isAuthenticated = true;
  },
  unset() {
    localStorage.clear();
    this.isAuthenticated = false;
  }
};

export default authService;

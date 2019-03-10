const authService = {
  isAuthenticated: !!localStorage.getItem("isAuthenticated"),
  authenticate() {
    return fetch("https://ancient-springs-73658.herokuapp.com/auth", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(_ => true)
      .catch(_ => false);
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

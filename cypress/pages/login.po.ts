const LoginPage = {
  usernameInput: "[data-test=username]",
  passwordInput: "[data-test=password]",
  loginButton: "[data-test=login-button]",

  login() {
    cy.visit("/");
    cy.get(this.usernameInput).type("standard_user");
    cy.get(this.passwordInput).type("secret_sauce");
    cy.get(this.loginButton).click();
  },
};

export default LoginPage;

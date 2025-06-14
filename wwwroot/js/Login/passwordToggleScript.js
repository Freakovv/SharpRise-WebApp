document.addEventListener("DOMContentLoaded", function () {
  // Переключение видимости пароля
  const toggleLoginPassword = document.getElementById("toggleLoginPassword");
  const loginPassword = document.getElementById("loginPassword");
  const toggleRegisterPassword = document.getElementById(
    "toggleRegisterPassword"
  );
  const registerPassword = document.getElementById("registerPassword");
  toggleLoginPassword.addEventListener("click", function () {
    const type =
      loginPassword.getAttribute("type") === "password" ? "text" : "password";
    loginPassword.setAttribute("type", type);
    toggleLoginPassword.querySelector("i").className =
      type === "password" ? "ri-eye-off-line" : "ri-eye-line";
  });
  toggleRegisterPassword.addEventListener("click", function () {
    const type =
      registerPassword.getAttribute("type") === "password"
        ? "text"
        : "password";
    registerPassword.setAttribute("type", type);
    toggleRegisterPassword.querySelector("i").className =
      type === "password" ? "ri-eye-off-line" : "ri-eye-line";
  });
});

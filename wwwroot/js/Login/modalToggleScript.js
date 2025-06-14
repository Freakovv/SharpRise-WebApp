document.addEventListener("DOMContentLoaded", function () {
  // Элементы модальных окон
  const loginModal = document.getElementById("loginModal");
  const termsModal = document.getElementById("termsModal");
  const registerModal = document.getElementById("registerModal");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const closeLoginModal = document.getElementById("closeLoginModal");
  const closeRegisterModal = document.getElementById("closeRegisterModal");
  const switchToRegister = document.getElementById("switchToRegister");
  const switchToLogin = document.getElementById("switchToLogin");
  // Открытие модальных окон
  loginBtn.addEventListener("click", () => {
    loginModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });
  registerBtn.addEventListener("click", () => {
    registerModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });
  // Закрытие модальных окон
  closeLoginModal.addEventListener("click", () => {
    loginModal.classList.add("hidden");
    document.body.style.overflow = "";
  });
  closeRegisterModal.addEventListener("click", () => {
    registerModal.classList.add("hidden");
    document.body.style.overflow = "";
  });
  // Переключение между модальными окнами
  switchToRegister.addEventListener("click", () => {
    loginModal.classList.add("hidden");
    registerModal.classList.remove("hidden");
  });
  switchToLogin.addEventListener("click", () => {
    registerModal.classList.add("hidden");
    loginModal.classList.remove("hidden");
  });
  // Закрытие модальных окон при клике вне их области
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      loginModal.classList.add("hidden");
      registerModal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  });
  // Обработка модального окна условий использования
  const termsLink = document.getElementById("termsLink");
  const closeTermsModal = document.getElementById("closeTermsModal");
  const closeTermsBtn = document.getElementById("closeTermsBtn");
  termsLink.addEventListener("click", (e) => {
    e.preventDefault();
    termsModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });
  closeTermsModal.addEventListener("click", () => {
    termsModal.classList.add("hidden");
    document.body.style.overflow = "";
  });
  closeTermsBtn.addEventListener("click", () => {
    termsModal.classList.add("hidden");
    document.body.style.overflow = "";
  });
});

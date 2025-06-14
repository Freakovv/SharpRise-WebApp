document.addEventListener("DOMContentLoaded", function () {
  // Функции для работы с модальными окнами
  function openModal(modal) {
    if (modal) {
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }

  // Обработчики для модальных окон
  function setupModalHandlers() {
    // Получаем актуальные ссылки на элементы
    const loginModal = document.getElementById("loginModal");
    const termsModal = document.getElementById("termsModal");
    const registerModal = document.getElementById("registerModal");

    // Обработчики для кнопок в основном layout
    document
      .getElementById("loginBtn")
      ?.addEventListener("click", () => openModal(loginModal));
    document
      .getElementById("registerBtn")
      ?.addEventListener("click", () => openModal(registerModal));

    // Обработчики для кнопок закрытия
    document
      .getElementById("closeLoginModal")
      ?.addEventListener("click", () => closeModal(loginModal));
    document
      .getElementById("closeRegisterModal")
      ?.addEventListener("click", () => closeModal(registerModal));

    // Переключение между окнами
    document
      .getElementById("switchToRegister")
      ?.addEventListener("click", () => {
        closeModal(loginModal);
        openModal(registerModal);
      });

    document.getElementById("switchToLogin")?.addEventListener("click", () => {
      closeModal(registerModal);
      openModal(loginModal);
    });

    // Обработка модального окна условий использования
    document.getElementById("termsLink")?.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(termsModal);
    });

    document
      .getElementById("closeTermsModal")
      ?.addEventListener("click", () => closeModal(termsModal));
    document
      .getElementById("closeTermsBtn")
      ?.addEventListener("click", () => closeModal(termsModal));

    // Закрытие по клику вне модального окна
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        closeModal(loginModal);
        closeModal(registerModal);
        closeModal(termsModal);
      }
    });
  }

  // Инициализация обработчиков при загрузке
  setupModalHandlers();

  // Если модальные окна подгружаются динамически (AJAX)
  // можно использовать MutationObserver для отслеживания изменений DOM
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length) {
        setupModalHandlers(); // Переинициализируем обработчики
      }
    });
  });

  // Начинаем наблюдение за изменениями в body
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Дополнительные функции для работы с формами
  // Переключение видимости пароля
  document
    .getElementById("toggleLoginPassword")
    ?.addEventListener("click", function () {
      const passwordInput = document.getElementById("loginPassword");
      if (passwordInput) {
        const type =
          passwordInput.getAttribute("type") === "password"
            ? "text"
            : "password";
        passwordInput.setAttribute("type", type);
        this.querySelector("i").classList.toggle("ri-eye-line");
        this.querySelector("i").classList.toggle("ri-eye-off-line");
      }
    });

  document
    .getElementById("toggleRegisterPassword")
    ?.addEventListener("click", function () {
      const passwordInput = document.getElementById("registerPassword");
      if (passwordInput) {
        const type =
          passwordInput.getAttribute("type") === "password"
            ? "text"
            : "password";
        passwordInput.setAttribute("type", type);
        this.querySelector("i").classList.toggle("ri-eye-line");
        this.querySelector("i").classList.toggle("ri-eye-off-line");
      }
    });

  // Валидация силы пароля
  document
    .getElementById("registerPassword")
    ?.addEventListener("input", function () {
      const password = this.value;
      const strengthBar = document.getElementById("passwordStrength");
      const strengthText = document.getElementById("passwordStrengthText");

      if (!strengthBar || !strengthText) return;

      let strength = 0;
      if (password.length >= 8) strength += 1;
      if (password.match(/[a-z]/)) strength += 1;
      if (password.match(/[A-Z]/)) strength += 1;
      if (password.match(/[0-9]/)) strength += 1;
      if (password.match(/[^a-zA-Z0-9]/)) strength += 1;

      switch (strength) {
        case 0:
        case 1:
          strengthBar.style.width = "20%";
          strengthBar.style.backgroundColor = "#ef4444";
          strengthText.textContent = "Слабый пароль";
          break;
        case 2:
          strengthBar.style.width = "40%";
          strengthBar.style.backgroundColor = "#f97316";
          strengthText.textContent = "Средний пароль";
          break;
        case 3:
          strengthBar.style.width = "60%";
          strengthBar.style.backgroundColor = "#f59e0b";
          strengthText.textContent = "Нормальный пароль";
          break;
        case 4:
          strengthBar.style.width = "80%";
          strengthBar.style.backgroundColor = "#10b981";
          strengthText.textContent = "Сильный пароль";
          break;
        case 5:
          strengthBar.style.width = "100%";
          strengthBar.style.backgroundColor = "#10b981";
          strengthText.textContent = "Очень сильный пароль";
          break;
      }
    });
});

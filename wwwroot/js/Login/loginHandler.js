document.addEventListener("DOMContentLoaded", function () {
  // Инициализация чекбокса "Запомнить меня"
  const rememberMeCheckbox = document.getElementById("rememberMe");
  const customCheckbox = document.getElementById("rememberMeCustomCheckbox");
  const checkboxIndicator = document.getElementById(
    "rememberMeCheckboxIndicator"
  );

  if (customCheckbox && rememberMeCheckbox && checkboxIndicator) {
    customCheckbox.addEventListener("click", function () {
      rememberMeCheckbox.checked = !rememberMeCheckbox.checked;
      updateCheckboxAppearance();
    });

    function updateCheckboxAppearance() {
      if (rememberMeCheckbox.checked) {
        checkboxIndicator.classList.remove("hidden");
        customCheckbox.classList.add("border-primary");
      } else {
        checkboxIndicator.classList.add("hidden");
        customCheckbox.classList.remove("border-primary");
      }
    }

    // Инициализация состояния
    updateCheckboxAppearance();
  }

  // Удаляем дублирующее уведомление из HTML, если оно есть
  const existingNotification = document.getElementById("notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Создаем новое уведомление
  const notification = document.createElement("div");
  notification.id = "notification";
  notification.className = "fixed bottom-4 right-4 hidden z-50";
  notification.innerHTML = `
    <div class="notification-content bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
      <i class="ri-checkbox-circle-fill mr-2"></i>
      <span id="notification-message"></span>
    </div>
  `;
  document.body.appendChild(notification);
  // Обработчик отправки формы
  document
    .getElementById("loginForm")
    ?.addEventListener("submit", async function (e) {
      e.preventDefault();

      const form = e.target;
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;

      // Валидация
      if (!validateLoginForm()) {
        return;
      }

      // Показываем загрузку
      submitButton.disabled = true;
      submitButton.innerHTML =
        'Вход... <i class="ri-loader-4-line animate-spin"></i>';

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            RequestVerificationToken: form.querySelector(
              'input[name="__RequestVerificationToken"]'
            ).value,
          },
        });

        const result = await response.json();

        if (result.success) {
          showNotification("Вход выполнен успешно!", true);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          showLoginErrors(result.errors || { "": ["Неверные учетные данные"] });
          showNotification("Ошибка входа", false);
        }
      } catch (error) {
        console.error("Ошибка:", error);
        showNotification("Произошла ошибка при входе", false);
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
      }
    });

  // Функция показа уведомления
  function showNotification(message, isSuccess) {
    const notification = document.getElementById("notification");
    const messageElement = document.getElementById("notification-message");
    const notificationContent = notification.querySelector("div");

    // Обновляем стили и содержимое
    notificationContent.className = isSuccess
      ? "bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center"
      : "bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center";

    messageElement.textContent = message;

    // Показываем уведомление с анимацией
    notification.classList.remove("hidden");
    setTimeout(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateY(0)";
    }, 10);

    // Скрываем через 3 секунды
    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateY(20px)";
      setTimeout(() => {
        notification.classList.add("hidden");
      }, 300);
    }, 3000);
  }

  // Валидация формы
  function validateLoginForm() {
    let isValid = true;
    clearLoginErrors();

    const username = document.querySelector(
      '#loginForm input[name="UsernameOrEmail"]'
    );
    const password = document.querySelector(
      '#loginForm input[name="Password"]'
    );

    if (!username.value.trim()) {
      showError(username, "Введите email или имя пользователя");
      isValid = false;
    }

    if (!password.value.trim()) {
      showError(password, "Введите пароль");
      isValid = false;
    }

    return isValid;
  }

  // Показать ошибку
  function showError(input, message) {
    // Создаем элемент для ошибки, если его нет
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains("error-message")) {
      errorElement = document.createElement("div");
      errorElement.className = "error-message text-red-500 text-xs mt-1";
      input.parentNode.insertBefore(errorElement, input.nextSibling);
    }

    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
    input.classList.add("border", "border-red-500");
  }

  // Очистить ошибки
  function clearLoginErrors() {
    document.querySelectorAll("#loginForm .error-message").forEach((el) => {
      el.textContent = "";
      el.classList.add("hidden");
    });
    document.querySelectorAll("#loginForm .border-red-500").forEach((el) => {
      el.classList.remove("border", "border-red-500");
    });
  }

  // Показать ошибки сервера
  function showLoginErrors(errors) {
    clearLoginErrors();
    for (const [field, messages] of Object.entries(errors)) {
      const input = field
        ? document.querySelector(`#loginForm input[name="${field}"]`)
        : document.querySelector("#loginForm");

      if (input) {
        const message = Array.isArray(messages) ? messages.join(" ") : messages;
        showError(input, message);
      }
    }
  }

  // Инициализация анимации уведомления
  const notificationStyle = document.createElement("style");
  notificationStyle.textContent = `
      #notification {
        transition: all 0.3s ease;
        transform: translateY(20px);
        opacity: 0;
      }
      #notification.show {
        transform: translateY(0);
        opacity: 1;
      }
    `;
  document.head.appendChild(notificationStyle);
});

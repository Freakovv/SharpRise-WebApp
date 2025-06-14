document
  .getElementById("registerForm")
  ?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    // Валидация полей перед отправкой
    if (!validateRegisterForm()) {
      return;
    }

    // Показываем индикатор загрузки
    submitButton.disabled = true;
    submitButton.innerHTML =
      'Регистрация... <i class="ri-loader-4-line animate-spin"></i>';

    try {
      const formData = new FormData(form);
      const roleSelect = document.getElementById("userRole");
      formData.append("userRole", roleSelect.value);

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
        document.getElementById("registerModal").classList.add("hidden");
        document.body.style.overflow = "";
        alert("Регистрация прошла успешно!");
        window.location.href = "/";
      } else {
        showServerErrors(result.errors);
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при отправке формы");
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  });

// Функция валидации формы
function validateRegisterForm() {
  let isValid = true;
  const email = document.querySelector('#registerForm input[name="Email"]');
  const username = document.querySelector(
    '#registerForm input[name="Username"]'
  );
  const password = document.querySelector(
    '#registerForm input[name="Password"]'
  );
  const confirmPassword = document.querySelector(
    '#registerForm input[name="ConfirmPassword"]'
  );
  const termsAgree = document.getElementById("termsAgree");

  // Очищаем предыдущие ошибки
  clearValidationErrors();

  // Валидация email
  if (!email.value) {
    showError(email, "Email обязателен для заполнения");
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    showError(email, "Введите корректный email");
    isValid = false;
  }

  // Валидация имени пользователя
  if (!username.value) {
    showError(username, "Имя пользователя обязательно");
    isValid = false;
  } else if (username.value.length < 3 || username.value.length > 30) {
    showError(username, "Имя пользователя должно быть от 3 до 30 символов");
    isValid = false;
  }

  // Валидация пароля
  if (!password.value) {
    showError(password, "Пароль обязателен");
    isValid = false;
  } else if (password.value.length < 8) {
    showError(password, "Пароль должен содержать минимум 8 символов");
    isValid = false;
  }

  // Подтверждение пароля
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, "Пароли не совпадают");
    isValid = false;
  }

  // Проверка согласия с условиями
  if (!termsAgree.checked) {
    const termsError = document.createElement("div");
    termsError.className = "text-red-500 text-xs mt-1";
    termsError.textContent = "Необходимо принять условия использования";
    document.getElementById("termsCustomCheckbox").after(termsError);
    isValid = false;
  }

  return isValid;
}

// Показать ошибку валидации
function showError(input, message) {
  const errorElement = document.createElement("div");
  errorElement.className = "text-red-500 text-xs mt-1";
  errorElement.textContent = message;
  input.parentNode.insertBefore(errorElement, input.nextSibling);
  input.classList.add("border", "border-red-500");
}

// Очистить ошибки валидации
function clearValidationErrors() {
  document.querySelectorAll(".text-red-500").forEach((el) => el.remove());
  document
    .querySelectorAll(".border-red-500")
    .forEach((el) => el.classList.remove("border", "border-red-500"));
}

// Показать ошибки с сервера
function showServerErrors(errors) {
  clearValidationErrors();

  if (!errors) {
    alert("Произошла неизвестная ошибка");
    return;
  }

  for (const [field, messages] of Object.entries(errors)) {
    const input = document.querySelector(`#registerForm [name="${field}"]`);
    if (input) {
      showError(input, messages.join(", "));
    } else {
      alert(`${field}: ${messages.join(", ")}`);
    }
  }
}

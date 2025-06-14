document.addEventListener("DOMContentLoaded", function () {
  // Кастомные чекбоксы
  const rememberMe = document.getElementById("rememberMe");
  const customCheckbox = document.getElementById("customCheckbox");
  const checkboxIndicator = document.getElementById("checkboxIndicator");

  const termsAgree = document.getElementById("termsAgree");
  const termsCustomCheckbox = document.getElementById("termsCustomCheckbox");
  const termsCheckboxIndicator = document.getElementById(
    "termsCheckboxIndicator"
  );

  // Обработчик для "Запомнить меня"
  if (customCheckbox && rememberMe) {
    customCheckbox.addEventListener("click", function () {
      rememberMe.checked = !rememberMe.checked;
      updateCheckboxVisual(rememberMe.checked, checkboxIndicator);
    });

    // Инициализация состояния
    updateCheckboxVisual(rememberMe.checked, checkboxIndicator);
  }

  // Обработчик для согласия с условиями
  if (termsCustomCheckbox && termsAgree) {
    termsCustomCheckbox.addEventListener("click", function () {
      termsAgree.checked = !termsAgree.checked;
      updateCheckboxVisual(termsAgree.checked, termsCheckboxIndicator);

      // Очищаем ошибку при изменении состояния
      const errorElement = document.querySelector(
        '[data-valmsg-for="TermsAgree"]'
      );
      if (errorElement) {
        errorElement.textContent = "";
        errorElement.classList.add("hidden");
      }
    });

    // Инициализация состояния
    updateCheckboxVisual(termsAgree.checked, termsCheckboxIndicator);
  }

  // Функция для обновления визуального состояния чекбокса
  function updateCheckboxVisual(isChecked, indicatorElement) {
    if (isChecked) {
      indicatorElement.classList.remove("hidden");
    } else {
      indicatorElement.classList.add("hidden");
    }
  }
});

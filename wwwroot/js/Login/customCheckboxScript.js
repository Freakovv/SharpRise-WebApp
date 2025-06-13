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
  customCheckbox.addEventListener("click", function () {
    rememberMe.checked = !rememberMe.checked;
    if (rememberMe.checked) {
      checkboxIndicator.classList.remove("hidden");
    } else {
      checkboxIndicator.classList.add("hidden");
    }
  });
  termsCustomCheckbox.addEventListener("click", function () {
    termsAgree.checked = !termsAgree.checked;
    if (termsAgree.checked) {
      termsCheckboxIndicator.classList.remove("hidden");
    } else {
      termsCheckboxIndicator.classList.add("hidden");
    }
  });
});

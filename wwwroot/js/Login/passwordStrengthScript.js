document.addEventListener("DOMContentLoaded", function () {
  // Индикатор силы пароля
  const registerPassword = document.getElementById("registerPassword");
  const passwordStrength = document.getElementById("passwordStrength");
  const passwordStrengthText = document.getElementById("passwordStrengthText");
  const confirmPassword = document.getElementById("confirmPassword");
  registerPassword.addEventListener("input", function () {
    const password = registerPassword.value;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.match(/[^A-Za-z0-9]/)) strength += 25;
    passwordStrength.style.width = strength + "%";
    if (strength <= 25) {
      passwordStrength.className =
        "h-full bg-red-500 transition-all duration-300";
      passwordStrengthText.textContent = "Слабый пароль";
    } else if (strength <= 50) {
      passwordStrength.className =
        "h-full bg-yellow-500 transition-all duration-300";
      passwordStrengthText.textContent = "Средний пароль";
    } else if (strength <= 75) {
      passwordStrength.className =
        "h-full bg-blue-500 transition-all duration-300";
      passwordStrengthText.textContent = "Хороший пароль";
    } else {
      passwordStrength.className =
        "h-full bg-green-500 transition-all duration-300";
      passwordStrengthText.textContent = "Сильный пароль";
    }
    if (password === "") {
      passwordStrength.style.width = "0%";
      passwordStrengthText.textContent = "Минимум 8 символов";
    }
  });
  confirmPassword.addEventListener("input", function () {
    if (confirmPassword.value === registerPassword.value) {
      confirmPassword.classList.remove("border-red-500");
      confirmPassword.classList.add("border-green-500");
    } else {
      confirmPassword.classList.remove("border-green-500");
      confirmPassword.classList.add("border-red-500");
    }
    if (confirmPassword.value === "") {
      confirmPassword.classList.remove("border-red-500");
      confirmPassword.classList.remove("border-green-500");
    }
  });
});

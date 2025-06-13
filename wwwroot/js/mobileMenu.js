document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".ri-menu-line").parentElement;
  const mobileMenu = document.createElement("div");
  mobileMenu.className =
    "fixed inset-0 bg-white z-50 flex flex-col p-6 transform translate-x-full transition-transform duration-300 ease-in-out";
  mobileMenu.innerHTML = `
<div class="flex justify-between items-center mb-8">
<a href="#" class="text-3xl font-['JetBrains_Mono'] text-primary tracking-tight">&lt;SharpRise/&gt;</a>
<button class="w-10 h-10 flex items-center justify-center text-gray-700">
<i class="ri-close-line ri-lg"></i>
</button>
</div>
<div class="flex flex-col space-y-6">
<a href="#" class="text-gray-700 hover:text-primary font-medium text-lg">Обучение</a>
<a href="#" class="text-gray-700 hover:text-primary font-medium text-lg">Группы</a>
<a href="#" class="text-gray-700 hover:text-primary font-medium text-lg">Задачи</a>
<a href="#" class="text-gray-700 hover:text-primary font-medium text-lg">Документация</a>
</div>
<div class="mt-auto flex flex-col space-y-4">
<a href="#" class="text-center text-gray-800 hover:text-primary font-medium py-2">Войти</a>
<button class="bg-primary text-white px-5 py-3 !rounded-button whitespace-nowrap hover:bg-opacity-90 transition-all">Регистрация</button>
</div>
`;
  document.body.appendChild(mobileMenu);
  menuButton.addEventListener("click", function () {
    mobileMenu.classList.remove("translate-x-full");
    document.body.style.overflow = "hidden";
  });
  const closeButton = mobileMenu.querySelector(".ri-close-line").parentElement;
  closeButton.addEventListener("click", function () {
    mobileMenu.classList.add("translate-x-full");
    document.body.style.overflow = "";
  });
});

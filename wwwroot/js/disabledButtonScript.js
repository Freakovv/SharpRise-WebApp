document.addEventListener("DOMContentLoaded", function () {
  const disabledButton = document.querySelector(".disabled-button");
  if (!disabledButton) {
    console.error("Кнопка с классом disabled-button не найдена");
    return;
  }

  disabledButton.addEventListener("click", function (e) {
    e.preventDefault();

    const oldTooltip = this.querySelector(".custom-tooltip");
    if (oldTooltip) oldTooltip.remove();

    const tooltip = document.createElement("div");
    tooltip.className =
      "custom-tooltip absolute bg-gray-800 text-white text-sm px-3 py-1 rounded whitespace-nowrap";
    tooltip.style.bottom = "calc(100% + 10px)";
    tooltip.style.left = "50%";
    tooltip.style.transform = "translateX(-50%)";
    tooltip.textContent = "Десктопное приложение пока в разработке";

    this.style.position = "relative";
    this.appendChild(tooltip);

    setTimeout(() => tooltip.classList.add("opacity-0"), 10);
    setTimeout(() => {
      tooltip.classList.remove("opacity-0");
      setTimeout(() => {
        tooltip.classList.add("opacity-0");
        setTimeout(() => tooltip.remove(), 300);
      }, 2000);
    }, 10);
  });
});

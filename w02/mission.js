const themeSelector = document.getElementById("theme");
const logo = document.querySelector("footer img");

function changeTheme() {
  const isDark = themeSelector.value === "dark";
  document.body.classList.toggle("dark", isDark);
  logo.src = isDark ? "byui-logo_white.png" : "byui-logo_blue.webp";
}

themeSelector.addEventListener("change", changeTheme);

window.addEventListener("DOMContentLoaded", () => {
  changeTheme();
});
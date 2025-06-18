// main.js

document.querySelector(".search-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const searchInput = document.getElementById("search").value.trim();
    if (searchInput) {
      alert(`Searching for recipes matching: ${searchInput}`);
    }
  });
  
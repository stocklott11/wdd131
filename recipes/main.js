import recipes from './recipes.mjs';

// Random number function
function random(num) {
	return Math.floor(Math.random() * num);
}

// Get a random recipe from a list
function getRandomListEntry(list) {
	return list[random(list.length)];
}

// Generate tag HTML
function tagsTemplate(tags) {
	return tags.map(tag => `<span class="tag">${tag}</span>`).join('');
}

// Generate star rating HTML
function ratingTemplate(rating) {
	let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
	for (let i = 1; i <= 5; i++) {
		html += `<span aria-hidden="true" class="${i <= rating ? 'icon-star' : 'icon-star-empty'}">${i <= rating ? '⭐' : '☆'}</span>`;
	}
	html += `</span>`;
	return html;
}

// Create HTML template for a single recipe
function recipeTemplate(recipe) {
	return `
    <section class="recipe">
        <img src="${recipe.image}" alt="${recipe.name}">
        <div class="recipe-details">
            <div class="tags">
                ${tagsTemplate(recipe.tags)}
            </div>
            <h2>${recipe.name}</h2>
            ${ratingTemplate(recipe.rating)}
            <p class="description">${recipe.description}</p>
        </div>
    </section>`;
}

// Render a list of recipes to the DOM
function renderRecipes(recipeList) {
	const main = document.querySelector('main');
	main.innerHTML = `
	<form class="search-form">
		<label for="search">Find a recipe</label>
		<input type="text" id="search" placeholder="Find a recipe">
		<button type="submit"><img src="images/search.svg" alt="Search"></button>
	</form>
	${recipeList.map(recipeTemplate).join('')}
	`;
	attachSearchListener(); // Reattach search event
}

// Search filter logic
function filterRecipes(query) {
	return recipes
		.filter(recipe =>
			recipe.name.toLowerCase().includes(query) ||
			recipe.description.toLowerCase().includes(query) ||
			recipe.tags.find(tag => tag.toLowerCase().includes(query)) ||
			recipe.recipeIngredient.find(ing => ing.toLowerCase().includes(query))
		)
		.sort((a, b) => a.name.localeCompare(b.name));
}

// Handle search event
function searchHandler(e) {
	e.preventDefault();
	const query = document.querySelector('#search').value.toLowerCase().trim();
	const filtered = filterRecipes(query);
	renderRecipes(filtered);
}

// Attach search event
function attachSearchListener() {
	const form = document.querySelector('.search-form');
	if (form) {
		form.addEventListener('submit', searchHandler);
	}
}

// Init on page load
function init() {
	const randomRecipe = getRandomListEntry(recipes);
	renderRecipes([randomRecipe]);
}

init();

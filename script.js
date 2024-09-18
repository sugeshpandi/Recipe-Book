// Fetch recipes from API and log the response
async function fetchRecipes() {
          try {
                    const response = await fetch('https://dummyjson.com/recipes');
                    const data = await response.json();
                    console.log(data); // Log the response to inspect its structure
                    // Adjust based on actual response structure
                    return data.recipes || data; // Ensure the correct property is accessed
          } catch (error) {
                    console.error('Error fetching recipes:', error);
                    return [];
          }
}

// Display recipes
async function displayRecipes(recipes = []) {
          const recipeList = document.getElementById('recipeList');
          recipeList.innerHTML = '';
          recipes.forEach(recipe => {
                    console.log(recipe); // Log each recipe to inspect its structure
                    const recipeCard = document.createElement('div');
                    recipeCard.classList.add('col-md-4');
                    recipeCard.innerHTML = `
                  <div class="card mb-4">
                      <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                      <div class="card-body">
                          <h5 class="card-title">${recipe.name}</h5>
                          <p class="card-text">Preparation Time :${recipe.prepTimeMinutes} min</p>
                          <button class="btn btn-primary" data-toggle="modal" data-target="#recipeModal" onclick="showRecipeDetails(${recipe.id})">View Details</button>
                      </div>
                  </div>
              `;
                    recipeList.appendChild(recipeCard);
          });
}

// Show recipe details in modal
async function showRecipeDetails(id) {
          const recipes = await fetchRecipes();
          const recipe = recipes.find(r => r.id === id);
          if (!recipe) {
                    console.error('Recipe not found');
                    return;
          }
          const recipeDetails = document.getElementById('recipeDetails');
          recipeDetails.innerHTML = `
              <h5>${recipe.name}</h5>
              <p><strong>Meal Type:</strong> ${recipe.mealType}</p>
              <p><strong>Rating:</strong> ${recipe.rating}</p>
          `;
}

// Search recipes
async function searchRecipes() {
          const searchInput = document.getElementById('search').value.toLowerCase();
          const recipes = await fetchRecipes();
          const filteredRecipes = recipes.filter(recipe =>
                    recipe.title.toLowerCase().includes(searchInput) ||
                    recipe.description.toLowerCase().includes(searchInput)
          );
          displayRecipes(filteredRecipes);
}

// Initialize display
document.addEventListener('DOMContentLoaded', async () => {
          const recipes = await fetchRecipes();
          displayRecipes(recipes);
});

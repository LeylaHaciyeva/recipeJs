


let favouriteContainer = document.getElementById("fav-meals")

getRandomMeal();
fetchFavMeals()

async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const randomMeal = await respData.meals[0];
  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const respData = await resp.json();
  const meal = respData.meals[0];
  return meal;
}

function addMeal(mealData, random = false) {
  const meals = document.getElementById("meals");
  const meal = document.createElement("div");
  meal.classList.add("meal");
  meal.innerHTML = `
  <div class = "meal-header">
  ${random ? `<span class="random">Random recipe </span>` : null}
          <img src = "${mealData.strMealThumb}" alt = "${mealData.strMeal}" >
    </div> 
    <div class="meal-body">
    <h4>${mealData.strMeal}</h4> 
    <button class="fav-btn" ><i class="fa fa-heart"></i></button >
    </div>
    `;

  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealLS(mealData.idMeal);
      btn.classList.add("active");
    }
    favouriteContainer.innerHTML = ''
    fetchFavMeals()
  });
  meals.appendChild(meal);

}

function addMealLS(mealId) {
  const mealIds = getMealLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
  const mealIds = getMealLS();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
  const mealIds = getMealLS();
  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    meal = await getMealById(mealId);
    addMealFav(meal);
  }
}

function addMealFav(mealData) {
  const favMeal = document.createElement("li");
  favMeal.innerHTML=`
            <img src = "${mealData.strMealThumb}" alt="${mealData.strMeal}">
            <span>${mealData.strMeal}</span>
            ` ;
  favouriteContainer.appendChild(favMeal);
}


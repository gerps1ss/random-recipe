const input = document.getElementById("ingredientsInput");
const searchBtn = document.getElementById("searchBtn");
const exampleButtons = document.querySelectorAll(".examples button");

if (input && searchBtn) {
  searchBtn.addEventListener("click", () => {
    const ingredients = input.value.trim();

    if (ingredients === "") {
      alert("Введите ингредиенты");
    } else {
      alert("Ищем рецепт из: " + ingredients);
    }
  });

  exampleButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (button.textContent !== "...") {
        if (input.value === "") {
          input.value = button.textContent;
        } else {
          input.value += ", " + button.textContent;
        }
      }
    });
  });
}

const allRecipesBtn = document.getElementById("allRecipes");
const timeFilter = document.getElementById("timeFilter");
const difficultyFilter = document.getElementById("difficultyFilter");
const ingredientsFilter = document.getElementById("ingredientsFilter");
const sortFilter = document.getElementById("sortFilter");
const recipesGrid = document.querySelector(".recipes-grid");
const recipesCount = document.querySelector(".recipes-count");
const pagination = document.querySelector(".pagination");

if (recipesGrid) {
  const recipeCards = Array.from(document.querySelectorAll(".recipe-card"));
  const recipesPerPage = 6;
  let currentPage = 1;
  let filteredCards = [...recipeCards];

  function filterAndSortRecipes() {
    filteredCards = [...recipeCards];

    const selectedTime = timeFilter.value;
    const selectedDifficulty = difficultyFilter.value;
    const selectedIngredient = ingredientsFilter.value;
    const selectedSort = sortFilter.value;

    filteredCards = filteredCards.filter(card => {
      const time = Number(card.dataset.time);
      const difficulty = card.dataset.difficulty;
      const ingredients = card.dataset.ingredients.toLowerCase();

      if (selectedTime !== "all" && time > Number(selectedTime)) return false;
      if (selectedDifficulty !== "all" && difficulty !== selectedDifficulty) return false;
      if (selectedIngredient !== "all" && !ingredients.includes(selectedIngredient)) return false;

      return true;
    });

    if (selectedSort === "new") {
      filteredCards.sort((a, b) => Number(b.dataset.date) - Number(a.dataset.date));
    }

    if (selectedSort === "old") {
      filteredCards.sort((a, b) => Number(a.dataset.date) - Number(b.dataset.date));
    }

    if (selectedSort === "time") {
      filteredCards.sort((a, b) => Number(a.dataset.time) - Number(b.dataset.time));
    }

    currentPage = 1;
    showPage();
  }

  function showPage() {
    recipesGrid.innerHTML = "";

    const start = (currentPage - 1) * recipesPerPage;
    const end = start + recipesPerPage;
    const pageCards = filteredCards.slice(start, end);

    pageCards.forEach(card => {
      recipesGrid.appendChild(card);
    });

    recipesCount.textContent = "Мы подобрали " + filteredCards.length + " рецептов";

    renderPagination();
  }

  function renderPagination() {
    pagination.innerHTML = "";

    const pagesCount = Math.ceil(filteredCards.length / recipesPerPage);

    for (let i = 1; i <= pagesCount; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.textContent = i;

      if (i === currentPage) {
        pageBtn.classList.add("page-active");
      }

      pageBtn.addEventListener("click", () => {
        currentPage = i;
        showPage();
      });

      pagination.appendChild(pageBtn);
    }
  }

  timeFilter.addEventListener("change", filterAndSortRecipes);
  difficultyFilter.addEventListener("change", filterAndSortRecipes);
  ingredientsFilter.addEventListener("change", filterAndSortRecipes);
  sortFilter.addEventListener("change", filterAndSortRecipes);

  allRecipesBtn.addEventListener("click", () => {
    timeFilter.value = "all";
    difficultyFilter.value = "all";
    ingredientsFilter.value = "all";
    sortFilter.value = "new";
    filterAndSortRecipes();
  });

  filterAndSortRecipes();
}

const hearts = document.querySelectorAll(".heart");

hearts.forEach(heart => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("favorite");
  });
});

const openLogin = document.getElementById("openLogin");
const closeLogin = document.getElementById("closeLogin");
const loginModal = document.getElementById("loginModal");
const showPassword = document.getElementById("showPassword");
const passwordInput = document.getElementById("passwordInput");

if (openLogin && closeLogin && loginModal) {
  openLogin.addEventListener("click", (event) => {
    event.preventDefault();
    loginModal.classList.add("active");
  });

  closeLogin.addEventListener("click", () => {
    loginModal.classList.remove("active");
  });

  loginModal.addEventListener("click", (event) => {
    if (event.target === loginModal) {
      loginModal.classList.remove("active");
    }
  });
}

if (showPassword && passwordInput) {
  showPassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });
}
const loadCategory = async () => {
  try {
    const url = "https://taxi-kitchen-api.vercel.app/api/v1/categories";
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.categories);
  } catch (err) {
    console.log(err);
  }
};

const displayCategory = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((category) => {
    categoryContainer.innerHTML += `
    <div
          class="hover:bg-yellow-600 mb-1 bg-white  hover:text-black font-semibold rounded-xl flex items-center gap-3 p-1" onclick="loadFoods(${category.id})"
        >
          <img
            src="${category.categoryImg}"
            class="w-[50px]"
            alt=""
          />
          <p>${category.categoryName}</p>
        </div>
    
    `;
  });
};
const loadFoods = async (id) => {
  try {
    const url = ` https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayFoods(data.foods);
  } catch (error) {
    console.log(error);
  }
};
const displayFoods = (foods) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  foods.forEach((food) => {
    console.log(food)
    cardContainer.innerHTML += `
    <div class="bg-yellow-50 flex shadow-sm rounded-xl gap-3 p-3">
            <div class="img flex-1">
              <img
                src="${food.foodImg}"
                class="w-[200px] h-[160px] rounded-xl object-cover"
                alt=""
              />
            </div>
            <div class="flex-2">
              <h1 class="font-bold text-2xl">
                ${food.title}
              </h1>
              <div class="badge badge-warning text-xl mt-2">${food.category}</div>
              <div class="divider divider-end">
                <p class="font-bold text-lg">$ <span>${food.price}</span> BDT</p>
              </div>
              <button class="btn btn-warning">Add to cart</button>
            </div>
          </div>
    
    `;
  });
};

const randomFoods = async() => {
  try {
    const url = " https://taxi-kitchen-api.vercel.app/api/v1/foods/random"
    const res = await fetch(url)
    const data =await res.json()
    displayFoods(data.foods)
  } catch (error) {
    console.log(error)
  }
}

loadCategory();
randomFoods()
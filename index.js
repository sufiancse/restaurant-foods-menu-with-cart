let addToCart = [];

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
          class="hover:bg-yellow-600 mb-1 bg-white  hover:text-black font-semibold rounded-xl flex items-center gap-3 p-1 cat-btns" onclick="loadFoods(${category.id})" id="cat-btn-${category.id}"
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
  const catBtn = document.querySelectorAll(".cat-btns");
  catBtn.forEach((btn) => btn.classList.remove("active"));

  document.getElementById("spinner").classList.remove("hidden");
  document.getElementById("card-container").classList.add("hidden");

  try {
    const url = ` https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    const catBtns = document.getElementById(`cat-btn-${id}`);
    catBtns.classList.add("active");

    displayFoods(data.foods);
  } catch (error) {
    console.log(error);
  }
};
const displayFoods = (foods) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  foods.forEach((food) => {
    // console.log(food)
    cardContainer.innerHTML += `
    <div class="bg-yellow-50 flex shadow-sm rounded-xl gap-3 p-3">
            <div class="img flex-1">
              <img
                src="${food.foodImg}"
                class="w-[200px] h-[160px] rounded-xl object-cover food-img"
                alt=""
              />
            </div>
            <div class="flex-2">
              <h1 class="font-bold text-2xl food-title">
                ${food.title}
              </h1>
              <div class="badge badge-warning text-xl mt-2">${food.category}</div>
              <div class="divider divider-end">
                <p class="font-bold text-lg">$ <span class="food-price">${food.price}</span> BDT</p>
              </div>
              <button id="${food.id}" onclick="loadCart(this)" class="btn btn-warning">Add to cart</button>
            </div>
          </div>
    
    `;
  });
  document.getElementById("spinner").classList.add("hidden");
  document.getElementById("card-container").classList.remove("hidden");
};

const randomFoods = async () => {
  try {
    const url = " https://taxi-kitchen-api.vercel.app/api/v1/foods/random";
    const res = await fetch(url);
    const data = await res.json();
    displayFoods(data.foods);
  } catch (error) {
    console.log(error);
  }
};
const loadCart = (cart) => {
  const card = cart.parentNode.parentNode;
  const title = card.querySelector(".food-title").innerText;
  const price = Number(card.querySelector(".food-price").innerText);
  const img = card.querySelector(".food-img").src;
  const id = cart.id;
  // console.log(cart.id)
  let quantity = 1;
  const isExist = addToCart.find((cart) => cart.id == id);
  if (isExist) {
    isExist.quantity += 1;
  } else {
    addToCart.push({
      id: id,
      img: img,
      title: title,
      price: price,
      quantity: quantity,
    });
  }
  displayCart(addToCart);
};

const displayCart = (carts) => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";
  let total = 0;

  for (const cart of carts) {
    const itemsTotal = cart.price * cart.quantity;
    total = total + itemsTotal;

    cartContainer.innerHTML += `
    <div
          class="flex justify-between items-center bg-yellow-100 p-4 rounded-xl mb-2"
        >
          <div>
            <img
              src="${cart.img}"
              class="w-15 rounded-xl"
              alt=""
            />
            <h1 class="font-bold mt-2">${cart.title}</h1>
          </div>
          <div class="flex flex-col gap-4">
          <span onclick="deleteCart(${cart.id})" class="cursor-pointer ml-auto"> ❌ </span>
          <p>TK <span>${cart.price}</span> x <span id="quantity">${cart.quantity}</span></p>
          </div>
        </div>

    `;
  }
  
  if (total === 0) {
    document.getElementById("total-container").classList.add("hidden");
    document.getElementById("inner-cart").classList.remove('hidden')
  } else {
    document.getElementById("total-container").classList.remove("hidden");
     document.getElementById("inner-cart").classList.add('hidden')
  }
  document.getElementById("cart-total").innerText = total;
  
};

const deleteCart = (id) => {
  const itemIndex = addToCart.findIndex((cart) => cart.id == id);
  if (itemIndex !== -1) {
    if (addToCart[itemIndex].quantity > 1) {
      addToCart[itemIndex].quantity -= 1;
    } else {
      addToCart.splice(itemIndex, 1);
    }
  }
  displayCart(addToCart);
  console.log(addToCart)
};



loadCategory();
randomFoods();

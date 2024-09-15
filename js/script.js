///////////////////Start Header/////////////////////////////////////
userName = document.querySelector(".box-userName span");
secondLookUser = document.querySelector(".sec-look-user");
firstLookUser = document.querySelector(".first-look-user");
signUp = document.querySelector(".box-signOut i");
cartDrowIcon = document.querySelector(".sec-look-user .box-shop i");
cartDrow = cartDrow = document.querySelector(".cart-drow");

let i = 1;
cartDrowIcon.addEventListener("click", function () {
  i++;
  if (i % 2 === 0) {
    cartDrow.style.display = "block";
  } else {
    cartDrow.style.display = "none";
  }
});

if (localStorage.getItem("userName")) {
  firstLookUser.remove();
  secondLookUser.style.display = "flex";
  userName.innerHTML = localStorage.getItem("userName");
}
signUp.addEventListener("click", function (R) {
  R.preventDefault();
  localStorage.clear();
  alert("You are logged out ");
  setTimeout(() => {
    window.location = "login.html";
  }, 1000);
});
/////////////////////End Header////////////////////////////////////

/////////////////////Start products page////////////////////////////////////
///////////////////////Start Cart/////////////////////////////////////////////////////

let allProduct = document.querySelector("#product");
function drawItems() {
  let print = product.map((item) => {
    return `
                <div class="box">
                    <div class="image">
                        <img src="${item.imgUrl}" alt="">
                    </div>
                    <div class="info">
                        <p>Name: <span>${item.title}</span></p>
                        <p>Category: <span>${item.category}</span></p>
                        <p>Price: <span class="span-price">${
                          item.price
                        }$</span></p>
                    </div>
                    <div class="btn-box">
                        <i style="color:${
                          item.liked2 == true ? "red" : ""
                        }"  class="fa-solid fa-cart-arrow-down" data-price="100,0" id="add-car"  onClick="addToCart(${
      item.id
    })"></i>
                        <i style="color:${
                          item.liked == true ? "red" : ""
                        }" id="add-fiv" class="fa-regular fa-heart" onClick="addToFav(${
      item.id
    })"></i>
                    </div>
                </div>
        `;
  });
  allProduct.innerHTML = print.join("");
}
drawItems();

let counterCar = document.querySelector(".box-shop-edit .counterCar");
let cartProductP = document.querySelector(".cart-drow .cart-drow-copy");
let addedItem = localStorage.getItem("ProductInCart")
  ? JSON.parse(localStorage.getItem("ProductInCart"))
  : [];

if (addedItem) {
  addedItem.map((item) => {
    cartProductP.innerHTML += `
             <div class="item" id="item-${item.id}">
                <p>${item.title}</p>
             <div class="icon">
                 <h5 id="count-${item.id}">${item.count}</h5>
                 <i  onClick="updateCartItem(${item.id}, 1)" class="fa-solid fa-plus"></i>
                 <i  onClick="updateCartItem(${item.id}, -1)" class="fa-solid fa-minus"></i>
             </div>                          
            </div>
            `;
  });
  updateCartCount();
}

function addToCart(id) {
  if (localStorage.getItem("email")) {
    let chosenItem = product.find((item) => item.id === id);
    if (addedItem.some((item) => item.id === id)) {
      updateCartItem(id, 1);
    } else {
      chosenItem.count = 1;
      addedItem = [...addedItem, chosenItem];
      cartProductP.innerHTML += `
             <div class="item" id="item-${id}">
                <p>${chosenItem.title}</p>
             <div class="icon">
                 <h5 id="count-${id}">${chosenItem.count}</h5>
                 <i  onClick="updateCartItem(${id}, 1)" class="fa-solid fa-plus"></i>
                 <i  onClick="updateCartItem(${id}, -1)" class="fa-solid fa-minus"></i>
             </div>                          
            </div>
            `;
    }
    localStorage.setItem("ProductInCart", JSON.stringify(addedItem));
    updateCartCount();
    product.map((item) => {
      if (item.id === chosenItem.id) {
        item.liked2 = true;
      }
    });
    localStorage.setItem("product", JSON.stringify(product));
    drawItems(product);

    // Send the price to another page
    let price = chosenItem.price;
    let currentTotalPrice = localStorage.getItem("totalPrice") || 0;
    let newTotalPrice = parseInt(currentTotalPrice) + price;
    localStorage.setItem("totalPrice", newTotalPrice.toString());
  } else {
    window.location = "login.html";
  }
}

function updateCartItem(id, change) {
  let item = addedItem.find((item) => item.id === id);
  item.count += change;
  if (item.count <= 0) {
    removeCartItem(id);
  } else {
    document.getElementById(`count-${id}`).innerText = item.count;
  }
  localStorage.setItem("ProductInCart", JSON.stringify(addedItem));
  // Update totalPrice
  let newTotalPrice = 0;
  addedItem.forEach((item) => {
    newTotalPrice += item.price * item.count;
  });
  localStorage.setItem("totalPrice", newTotalPrice.toString());
  updateCartCount();
}

function removeCartItem(id) {
  addedItem = addedItem.filter((item) => item.id !== id);
  document.getElementById(`item-${id}`).remove();
  updateCartCount();
}

function updateCartCount() {
  let productsLength = document.querySelectorAll(
    ".cart-drow-copy .item"
  ).length;
  counterCar.style.display = productsLength > 0 ? "block" : "none";
  counterCar.innerHTML = productsLength;
}
///////////////////////End Cart/////////////////////////////////////////////////////
function getUniqueArr(arr, filterId) {
  let unique = arr
    .map((item) => item[filterId])
    .map((item, i, final) => final.indexOf(item) === i && i)
    .filter((item) => arr[item])
    .map((item) => arr[item]);
  return unique;
}
////////////////////Start Fav//////////////////////////////////////////////////////
let addedItemFav = localStorage.getItem("ProductInFav")
  ? JSON.parse(localStorage.getItem("ProductInFav"))
  : [];
if (localStorage.getItem("email")) {
  function addToFav(id) {
    let chooseItem = product.find((item) => item.id === id);
    chooseItem.liked = true;
    addedItemFav = [...addedItemFav, chooseItem];
    let uniqueProducts = getUniqueArr(addedItemFav, "id");
    localStorage.setItem("ProductInFav", JSON.stringify(uniqueProducts));
    product.map((item) => {
      if (item.id === chooseItem.id) {
        item.liked = true;
      }
    });
    localStorage.setItem("product", JSON.stringify(product));
    drawItems(product);
  }
} else {
  function addToFav() {
    window.location = "login.html";
  }
}
////////////////////End Fav//////////////////////////////////////////////////////
/////////////////////End products page////////////////////////////////////

////////////////////Start Search///////////////////////////////////////////////
const searchType = document.getElementById("search-type");
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("change", () => {
  const searchValue = searchInput.value.trim();
  const searchTypeValue = searchType.value;

  if (searchValue === "") {
    return;
  }

  localStorage.setItem("searchValue", searchValue);
  localStorage.setItem("searchTypeValue", searchTypeValue);

  setTimeout(() => {
    window.location = "search.html";
  });
});
////////////////////End Search///////////////////////////////////////////////

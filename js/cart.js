///////////////////Start Cart/////////////////////////////////////////////////////

let allProduct = document.querySelector("#product");
let noProducts = document.querySelector(".noProducts");

function drawCartProduct(allproducts = []) {
  if (JSON.parse(localStorage.getItem("ProductInCart")).length == 0) {
    noProducts.style.display = "block";
  }

  let product =
    JSON.parse(localStorage.getItem("ProductInCart")) || allproducts;
  let print = product.map((item) => {
    return `
      <div class="box">
        <div class="box-top">
          <div class="image">
            <img src="${item.imgUrl}" alt="">
          </div>
          <div class="info">
            <p>Name: <span>${item.title}</span></p>
            <p>Category: <span>${item.category}</span></p>
            <p>Price: <span class="span-price">${item.price}</span></p>
          </div>
        </div>
        <div class="btn-box">
          <button id="add-car" onclick="removeToCart(${item.id})">Remove From Cart</button>
          <h5 id="quantity-${item.id}">${item.count}</h5>
          <div class="icon">
            <i class="fa-solid fa-plus" onclick="incrementQuantity(${item.id})"></i>
            <i class="fa-solid fa-minus" onclick="decrementQuantity(${item.id})"></i>
          </div>
        </div>
      </div>
    `;
  });
  allProduct.innerHTML = print.join("");
}
drawCartProduct();

function incrementQuantity(id) {
  let product = JSON.parse(localStorage.getItem("ProductInCart")).find(
    (item) => item.id === id
  );
  product.count++;
  document.getElementById(`quantity-${id}`).innerHTML = product.count;
  let updatedProducts = JSON.parse(localStorage.getItem("ProductInCart"));
  updatedProducts.find((item) => item.id === id).count = product.count;
  localStorage.setItem("ProductInCart", JSON.stringify(updatedProducts));
  drawCartProduct();
  updateTotalPrice();
}

function decrementQuantity(id) {
  let product = JSON.parse(localStorage.getItem("ProductInCart")).find(
    (item) => item.id === id
  );
  if (product.count > 1) {
    product.count--;
    document.getElementById(`quantity-${id}`).innerHTML = product.count;
    let updatedProducts = JSON.parse(localStorage.getItem("ProductInCart"));
    updatedProducts.find((item) => item.id === id).count = product.count;
    localStorage.setItem("ProductInCart", JSON.stringify(updatedProducts));
    drawCartProduct();
    updateTotalPrice();
  }
}

function removeToCart(id) {
  let ProductInCart = localStorage.getItem("ProductInCart");
  if (ProductInCart) {
    let items = JSON.parse(ProductInCart);
    let filteredItems = items.filter((item) => item.id !== id);
    localStorage.setItem("ProductInCart", JSON.stringify(filteredItems));
    drawCartProduct(filteredItems);
    updateTotalPrice();
  }
}
///////////////////////End Cart/////////////////////////////////////////////////////

/////////////////////////Start Fav//////////////////////////////////////////////////
let allProductFav = document.querySelector("#owl-demo");

function drawCartProduct2(allproductsFav = []) {
  let product =
    JSON.parse(localStorage.getItem("ProductInFav")) || allproductsFav;
  let print = product.map((item) => {
    return `
            <div class="box">
                <div class="box-top">
                    <div class="image">
                        <img src="${item.imgUrl}" alt="">
                    </div>
                    <div class="info">
                        <p>Name: <span>${item.title}</span></p>
                        <p>Category: <span>${item.category}</span></p>
                    </div>
                </div>
                <div class="btn-box">
                    <i onclick="removeToFav(${item.id})" class="fa-regular fa-heart"></i>
                </div>
            </div>
        `;
  });
  allProductFav.innerHTML = print.join("");
}
drawCartProduct2();

function removeToFav(id) {
  let ProductInFav = localStorage.getItem("ProductInFav");
  if (ProductInFav) {
    let items2 = JSON.parse(ProductInFav);
    let filteredItems2 = items2.filter((item) => item.id !== id);
    localStorage.setItem("ProductInFav", JSON.stringify(filteredItems2));
    drawCartProduct2(filteredItems2);
    location.reload();
  }
}
/////////////////////////End Fav//////////////////////////////////////////////////
if (localStorage.getItem("totalPrice")) {
  let oldTotal = localStorage.getItem("totalPrice");
  document.getElementById("totalPrice").innerHTML = `$${oldTotal}`;
  document.getElementById("totalPrice1").innerHTML = `$${oldTotal}`;
}

function updateTotalPrice() {
  let total = 0;
  let products = JSON.parse(localStorage.getItem("ProductInCart"));
  if (products) {
    products.forEach((item) => {
      total += item.price * item.count;
    });
  }
  localStorage.setItem("totalPrice", total);
  document.getElementById("totalPrice").innerHTML = `$${total}`;
  document.getElementById("totalPrice1").innerHTML = `$${total}`;
}

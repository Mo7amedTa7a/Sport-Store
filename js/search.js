let searchProducts = document.querySelector(".search-products");
let searchValue = localStorage.getItem("searchValue");
let searchTypeValue = localStorage.getItem("searchTypeValue");
let result = "";

if (searchTypeValue === "category") {
  result = product
    .filter((item) => item.category.includes(searchValue))
    .map(
      (item) => `
                <div class="box">
                    <div class="image">
                        <img src="${item.imgUrl}" alt="">
                    </div>
                    <div class="info">
                        <p>Name: <span>${item.title}</span></p>
                        <p>Category: <span>${item.category}</span></p>
                        <p>Price: <span class="span-price">100$</span></p>
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
        `
    )
    .join("");
} else if (searchTypeValue === "title") {
  result = product
    .filter((item) => item.title.includes(searchValue))
    .map(
      (item) => `
        <div class="box">
                    <div class="image">
                        <img src="${item.imgUrl}" alt="">
                    </div>
                    <div class="info">
                        <p>Name: <span>${item.title}</span></p>
                        <p>Category: <span>${item.category}</span></p>
                        <p>Price: <span class="span-price">100$</span></p>
                    </div>
                    <div class="btn-box">
                        <i style="color:${
                          item.liked2 == true ? "red" : ""
                        }"  class="fa-solid fa-cart-arrow-down" data-price="100,0" id="add-car"  onClick="addToCart(${
        item.id
      })"></i>
                        <i style="color:${
                          item.liked3 == true ? "red" : ""
                        }" id="add-fiv" class="fa-regular fa-heart" onClick="addToFav(${
        item.id
      })"></i>
                    </div>
                </div>
        `
    )
    .join("");
}
if (result === "") {
  result = "there are no results available";
}
searchProducts.innerHTML = result;

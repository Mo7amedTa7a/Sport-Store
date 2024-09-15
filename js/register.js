let userName = document.querySelector("#userName");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let signUp = document.querySelector("#sign-up");
let loading = document.querySelector(".spinner-border");

signUp.addEventListener("click", function (R) {
  loading.style.visibility = "visible";
  signUp.style.color = "white";
  R.preventDefault();
  if (userName.value == "" || email.value == "" || password.value == "") {
    setTimeout(() => {
      loading.style.visibility = "hidden";
      signUp.style.color = "black";
      alert("Please complete the data");
    }, 1000);
  } else {
    localStorage.setItem("userName", userName.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);
    setTimeout(() => {
      signUp.style.color = "black";
      window.location = "login.html";
      loading.style.visibility = "hidden";
    }, 2000);
  }
});

let email = document.querySelector("#email");
let password = document.querySelector("#password");
let signIn = document.querySelector("#sign-in");
let loading = document.querySelector(".spinner-border");

let getEmail = localStorage.getItem("email");
let getPassword = localStorage.getItem("password");

signIn.addEventListener("click", function (R) {
  loading.style.visibility = "visible";
  signIn.style.color = "white";
  R.preventDefault();
  if (email.value == "" || password.value == "") {
    setTimeout(() => {
      loading.style.visibility = "hidden";
      signIn.style.color = "black";
      alert("Please complete the data");
    }, 1000);
  } else {
    if (
      email.value === getEmail &&
      getEmail.trim() &&
      password.value === getPassword &&
      getPassword.trim()
    ) {
      setTimeout(() => {
        loading.style.visibility = "hidden";
        signIn.style.color = "black";
        window.location = "index.html";
      }, 2000);
    } else {
      setTimeout(() => {
        loading.style.visibility = "hidden";
        signIn.style.color = "black";
        alert("Email and password are wrong");
      }, 1500);
    }
  }
});

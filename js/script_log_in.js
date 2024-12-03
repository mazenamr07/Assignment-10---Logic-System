/* ---------------------------- Global Variables ---------------------------- */
const emailRegex = /^\w+@\w+\.\w+$/i;

var button = document.querySelector("button");
var errMSG = document.querySelector("#errMSG");
var inputs = document.querySelectorAll(".input input");
var inputContainers = document.querySelectorAll(".input");

/* ---------------------------------- Logic --------------------------------- */
// Input Styling
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("focus", function () {
    inputContainers[i].classList.add("focused");
  });
  inputs[i].addEventListener("blur", function () {
    inputContainers[i].classList.remove("focused");
  });
}

// Email Validation
var emailValid = false;
var email = "";

inputs[0].addEventListener("blur", function () {
  email = inputs[0].value.toLowerCase();

  if (!checkMail(email)) {
    errMSG.innerHTML = "email can't be in this format";
    errMSG.classList.replace("d-none", "d-block");
    emailValid = false;
  } else {
    if (errMSG.classList.contains("d-block")) {
      errMSG.classList.replace("d-block", "d-none");
    }
    emailValid = true;
  }
});

// Button Press Validation
var userName = "";

button.addEventListener("click", function () {
  // Initialize Local Storage
  if (localStorage.getItem("users") === null) {
    localStorage.setItem("users", JSON.stringify([]));
  }

  if (fieldsEmpty(inputs)) {
    errMSG.innerHTML = "you must enter all fields";
    errMSG.classList.replace("d-none", "d-block");
  } else if (!emailValid) {
    errMSG.innerHTML = "email can't be in this format";
    errMSG.classList.replace("d-none", "d-block");
  } else {
    var user = {
      email: inputs[0].value.toLowerCase(),
      password: inputs[1].value,
    };

    if (isValidUser(user) === true) {
      // Login
      localStorage.setItem(
        "authorizedUser",
        JSON.stringify({
          name: userName,
          email: user.email,
        })
      );

      // Redirect Page
      window.location.replace("index.html");
    } else {
      errMSG.innerHTML = isValidUser(user);
      errMSG.classList.replace("d-none", "d-block");
    }
  }
});

/* -------------------------------- Functions ------------------------------- */
function fieldsEmpty(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].value == "") {
      return true;
    }
  }
  return false;
}

function checkMail(string) {
  return emailRegex.test(string);
}

function isValidUser(user) {
  var users = JSON.parse(localStorage.getItem("users"));
  for (let i = 0; i < users.length; i++) {
    if (user.email == users[i].email) {
      if (user.password == users[i].password) {
        userName = users[i].name;
        return true;
      }
      return "incorrect email or password";
    }
  }
  return "user doesn't exist";
}

/* ---------------------------- Global Variables ---------------------------- */
const emailRegex = /^\w+@\w+\.\w+$/i;

var button = document.querySelector("button");
var errMSG = document.querySelector("#errMSG");
var inputs = document.querySelectorAll(".input input");
var inputContainers = document.querySelectorAll(".input");

/* ---------------------------------- Logic --------------------------------- */
// Initialize Local Storage
if (localStorage.getItem("users") === null) {
  localStorage.setItem("users", JSON.stringify([]));
}

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

inputs[1].addEventListener("blur", function () {
  email = inputs[1].value;

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
button.addEventListener("click", function () {
  if (fieldsEmpty(inputs)) {
    errMSG.innerHTML = "you must enter all fields";
    errMSG.classList.replace("d-none", "d-block");
  } else if (userExists(email)) {
    errMSG.innerHTML = "user already exists";
    errMSG.classList.replace("d-none", "d-block");
  } else if (!emailValid) {
    errMSG.innerHTML = "email can't be in this format";
    errMSG.classList.replace("d-none", "d-block");
  } else {
    var user = {
      name: inputs[0].value,
      email: inputs[1].value,
      password: inputs[2].value,
    };

    var localData = localStorage.getItem("users");
    var localJSON = JSON.parse(localData);
    localJSON.push(user);
    localStorage.setItem("users", JSON.stringify(localJSON));

    // Redirect Page
    window.location.replace("index.html")
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

function userExists(userEmail) {
  var users = JSON.parse(localStorage.getItem("users"));
  for (let i = 0; i < users.length; i++) {
    if (userEmail == users[i].email) {
      return true;
    }
  }
  return false;
}

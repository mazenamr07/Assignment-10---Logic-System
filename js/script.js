/* -------------------------------- Variables ------------------------------- */
const regex = /^\w+@\w+\.\w+$/i;

var button = document.querySelector("button");
var errMSG = document.getElementById("errMSG");
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
  return regex.test(string);
}

function userExists(userEmail) {
  if (localStorage.getItem(userEmail) == null) {
    return false;
  }
  return true;
}

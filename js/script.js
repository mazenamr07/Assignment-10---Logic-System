/* -------------------------------- Variables ------------------------------- */
const regex = /^\w+@\w+\.\w+$/i;

var button = document.querySelector("button");
var errMSG = document.getElementById("errMSG");

/* ---------------------------------- Logic --------------------------------- */
button.addEventListener("click", function () {
  var inputList = [
    document.querySelector("input:nth-of-type(1)"), // Email
    document.querySelector("input:nth-of-type(2)"), // Password
  ];
  var user = {
    email: inputList[0].value,
    password: inputList[1].value,
  };
  errMSG.classList.replace("d-none", "d-block");

  if (fieldsEmpty(inputList)) {
    errMSG.innerHTML = "All inputs are required";
  } else if (!checkMail(user.email)) {
    errMSG.innerHTML = "Email cannot be in this format";
  } else if (!userExists(user.email)) {
    errMSG.innerHTML = "Email doesn't exist";
  } else {
    var userJSON = JSON.stringify(user);
    localStorage.setItem(user.email, userJSON);

    // redirect page
    window.location.href = "index.html";
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
  return regex.test(string);
}

function userExists(userEmail) {
  if (localStorage.getItem(userEmail) == null) {
    return false;
  }
  return true;
}

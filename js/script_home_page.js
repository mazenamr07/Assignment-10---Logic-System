/* ---------------------------- Global Variables ---------------------------- */
var authorizedUser = localStorage.getItem("authorizedUser");
var homeCover = document.querySelector("#home-cover");
var button = document.querySelector("button");

/* ---------------------------------- Logic --------------------------------- */
// Redirect unauthorized access
if (authorizedUser === null) {
  window.location.replace("log_in.html");
}

// Removing the cover
setTimeout(() => {
  homeCover.classList.replace("d-block", "d-none");
}, 400);

button.addEventListener("click", function () {
  localStorage.removeItem("authorizedUser");

  // Redirect Page
  window.location.replace("log_in.html");
});

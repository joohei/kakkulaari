const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".mobile-nav");
const body = document.body;

hamburger.addEventListener("click", function () {
  this.classList.toggle("is-active");
  menu.classList.toggle("is-active");
  body.classList.toggle("is-active");
});

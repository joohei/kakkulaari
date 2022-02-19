const hamburger = document.querySelector(".hamburger")
const menu = document.querySelector(".mobile-nav")

hamburger.addEventListener("click", function () {
  this.classList.toggle("is-active")
  menu.classList.toggle("is-active")
})

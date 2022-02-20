const searchInput = document.querySelector("[data-search]")
const searchImg = document.getElementsByTagName("img");

searchInput.addEventListener("input", function (e) {
  const value = e.target.value.toLowerCase();
  for (let image of searchImg) {
    tagList = image.getAttribute("tags").split(",")
    for (let tag of tagList) {
      if (tag.includes(value)) {
        image.classList.add("show");
        image.classList.remove("hide");
        break;
      }
      else {
        image.classList.add("hide");
        image.classList.remove("show");
      }
    }
  }
})

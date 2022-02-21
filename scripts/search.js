const searchInput = document.querySelector("[data-search]");
const searchImg = document.getElementsByTagName("img");
const filterList = document.getElementsByClassName("item");
for (let filter of filterList) {
  if (filter.getAttribute("dataClass") == "all") {
    var allFilter = filter;
    break;
  }
}

searchInput.addEventListener("input", function (e) {
  var currentFilter = document.querySelector(".item.is-active");
  currentFilter.classList.remove("is-active");
  allFilter.classList.add("is-active");
  var value = e.target.value.toLowerCase();
  for (let image of searchImg) {
    tagList = image.getAttribute("tags").split(",");
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
});

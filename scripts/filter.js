const filterItem = document.querySelector(".filters");
const filterImg = document.getElementsByTagName("img")

window.onload = function () {
  filterItem.onclick = function (selectedItem) {
    if (selectedItem.target.classList.contains("item")) {
      filterItem.querySelector(".is-active").classList.remove("is-active");
      selectedItem.target.classList.add("is-active");
      let filterName = selectedItem.target.getAttribute("dataclass")
      for (let image of filterImg) {
        let filterImages = image.getAttribute("dataclass");
        if (filterImages == filterName || filterName =="all") {
          image.classList.add("show")
        }
        else {
          image.classList.add("hide")
          image.classList.remove("show")
        }}}}}

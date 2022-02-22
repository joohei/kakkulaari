async function getMedia() {
  const loader = document.querySelector(".loader-container");
  let filterItem = document.querySelector(".item.is-active")
  let searchInput = document.getElementById("search").value;
  if (searchInput == "") {
    var filter = filterItem.getAttribute("dataclass")
  }
  else {
    var filter = searchInput.toLowerCase()
  }
  let data = await fetch('API.json')
    .then(function (response) {
      return response.json();
    })
  for (let i in data.data) {
    let img = document.createElement("img");
    let imgUrl = data.data[i].media_url;
    let imgId = imgUrl.split("?").join("/").split("/")[5];
    let caption = data.data[i].caption
    img.src = imgUrl;
    img.alt = "Instagram API photo";
    hashtags = caption.split("#").slice(1);
    tags = document.createAttribute("tags");
    tags.value = hashtags.join("").split(/  | \n| /)
    img.setAttributeNode(tags)
    dataClass = document.createAttribute("dataclass");
    if (hashtags.join("").split(/  | \n| /).includes("sweetpastry")) {
      dataClass.value = "sweet";
    }
    else if (hashtags.join("").split(/  | \n| /).includes("saltypastry")) {
      dataClass.value = "salty";
    }
    img.setAttributeNode(dataClass);
    img.classList.add("animate");
    if (filter == dataClass.value || filter == "all") {
      img.classList.add("show")
    }
    else {
      let tags = img.getAttribute("tags").split(",")
      for (let tag of tags) {
        if (tag.includes(filter)) {
          img.classList.add("show");
          img.classList.remove("hide");
          break;
        }
        else {
          img.classList.add("hide");
          img.classList.remove("show");
        }
      }
    }
    let gallery = document.getElementsByClassName("gallery")[0];
    gallery.appendChild(img);
  }
}

getMedia();

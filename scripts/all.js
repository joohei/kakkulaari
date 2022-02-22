async function getMedia() { // a function that fetches image links from API.json and appends to parent

  // defining filter parameters
  let filterItem = document.querySelector(".item.is-active"); // defining the currently active filter
  let searchInput = document.getElementById("search").value; // defining search bar value

  // creating elements and attributes
  let img = document.createElement("img"); // creating image element
  let tags = document.createAttribute("tags"); // creating attribute for image elements
  let gallery = document.getElementsByClassName("gallery")[0]; // getting parent item
  dataClass = document.createAttribute("dataclass"); // creating attribute for image elements

  if (searchInput == "") { // checks whether the search input is empty
    var filter = filterItem.getAttribute("dataclass") // if so use the default filter
  } else {
    var filter = searchInput.toLowerCase() // otherwise use the search bar value
  }

  let data = await fetch('API.json') // fetching data from API.json
    .then(function(response) {
      return response.json();
    })

  for (let i in data.data) { // looping over the array of data, creating image elements and sorting them

    // defining basic info
    let imgUrl = data.data[i].media_url; // defining image url
    let caption = data.data[i].caption; // defining image caption
    img.src = imgUrl; // assigning the url to image element
    img.alt = "Instagram API photo"; // setting alternative text

    // formatting hastags and sorting image based on it
    hashtags = caption.split("#").slice(1); // formatting caption to extract only hashtags
    hashtags = hashtags.join("").split(/  | \n| /); // formatting hastags into an array
    tags.value = hashtags; // giving the tags attribute the value of "hashtags"
    if (hashtags.includes("sweetpastry")) { // checking whether image belongs to sweet...
      dataClass.value = "sweet";
    } else if (hashtags.includes("saltypastry")) { // ...or salty pastries
      dataClass.value = "salty"; // and assgning the value
    }

    // setting attributes
    img.setAttributeNode(tags);
    img.setAttributeNode(dataClass);

    // adding animation to image
    img.classList.add("animate");

    if (filter == dataClass.value || filter == "all") { // if current filter matches images group, show image
      img.classList.add("show")
    } else { // otherwise check if...
      let tags = img.getAttribute("tags").split(",") // ...formatted tags...
      for (let tag of tags) {
        if (tag.includes(filter)) { // ...include the filter
          img.classList.add("show"); // and if so then show the image
          img.classList.remove("hide");
          break; // and break out of loop
        } else { // if it doesn't exist
          img.classList.add("hide"); // hide the image
          img.classList.remove("show");
        }
      }
    }
    gallery.appendChild(img); // lastly appending image to parent item
  }
}

getMedia(); // run the script
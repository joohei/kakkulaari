function createModals(caption, date, id) { // a function that creates modals (description popups) for each image

  // creating elements and defining existing ones
  let body = document.body // defining body
  let modalContainer = document.createElement("div"); // creating the container that contains bot the modal and the overlay
  let modal = document.createElement("div"); // creating the modal
  let modalHeader = document.createElement("div"); // container for header elements
  let modalHeadline = document.createElement("h1"); // modal headline
  let closeBtn = document.createElement("button"); // button for closing the modal
  let modalContent = document.createElement("div"); // container for modal text
  let modalDesc = document.createElement("p"); // modal text
  let newLine = document.createElement("br"); // newline \n
  let modalTags = document.createElement("p"); // modal hashtags
  let modalDate = document.createElement("h5"); // release date of image

  // adding necessary attributes and text to each modal piece
  modalContainer.classList.add("modal-container"); // class for CSS
  modalContainer.setAttribute("id", id); // id for identifying which image it's connected to
  modal.classList.add("modal"); // class for CSS
  modalHeader.classList.add("modal-header"); // class for CSS
  modalHeadline.classList.add("modal-title"); // class for CSS
  modalHeadline.textContent = "kuvaus"; // modal headline
  closeBtn.classList.add("close-btn"); // class for CSS
  closeBtn.innerHTML = "&times;"; // button x symbol
  closeBtn.setAttribute("onclick", `closeModal("${id}")`) // adding functionality to close button
  modalContent.classList.add("modal-content"); // class for CSS
  modalDesc.classList.add("modal-text"); // class for CSS
  modalDesc.textContent = caption.split("#")[0]; // modal text (splitting from hashtags)
  modalTags.classList.add("modal-text"); // class for CSS
  modalTags.textContent = "#" + caption.split("#").slice(1).join("#"); // modal hashtags (sorting to only hastags)
  modalDate.classList.add("modal-date"); // class for CSS
  modalDate.textContent = date; // image release date

  // appending everything together and lastly to the parent element
  modalHeader.appendChild(modalHeadline);
  modalHeader.appendChild(closeBtn);
  modalContent.appendChild(modalDesc);
  modalContent.appendChild(newLine);
  modalContent.appendChild(modalTags);
  modalContent.appendChild(modalDate);
  modal.appendChild(modalHeader);
  modal.appendChild(modalContent);
  modalContainer.appendChild(modal);
  body.appendChild(modalContainer);
}

function openModal(modalId) { // a function that adds open class to modal so it shows

  let modal = document.getElementById(modalId); // deifing modal
  let body = document.body // defining body
  modal.classList.add("active"); // adding class
  body.classList.add("is-active"); // adding class
}

function closeModal(modalId) { // a function that removes open class from modal so it hides

  let modal = document.getElementById(modalId); // defining modal
  let body = document.body // defining body
  modal.classList.remove("active"); // removing class
  body.classList.remove("is-active"); // removing class
}

async function getMedia() { // a function that fetches image links from API.json and appends to parent

  // defining filter parameters
  let filterItem = document.querySelector(".item.is-active"); // defining the currently active filter
  let searchInput = document.getElementById("search").value; // defining search bar value

  if (searchInput == "") { // checks whether the search input is empty
    var filter = filterItem.getAttribute("dataclass") // if so use the default filter
  } else {
    var filter = searchInput.toLowerCase() // otherwise use the search bar value
  }

  let data = await fetch('API.json') // fetching data from API.json
    .then(function(response) {
      return response.json();
    })

  const gallery = document.getElementsByClassName("gallery")[0]; // getting parent item

  for (let i in data.data) { // looping over the array of data, creating image elements and sorting them

    // creating elements and attributes
    let img = document.createElement("img"); // creating image element
    let tags = document.createAttribute("tags"); // creating attribute for image elements
    dataClass = document.createAttribute("dataclass"); // creating attribute for image elements

    // defining basic info
    let imgName = data.data[i].media_url.split("/").join("?").split("?")[5]; // defining image file name
    let caption = data.data[i].caption; // defining image caption
    let date = data.data[i].timestamp.substring(0, 10); // extracting date out of API.json
    let imgId = data.data[i].id.toString(); // defining image id

    // formatting release date
    date = date.split('-'); // first splitting days, months and years
    date = `${date[2]}.${date[1]}.${date[0]}`; // then reordering to finnish format
    date = "Julkaistu: " + date; // final text

    img.src = "../images/" + imgName; // assigning the source to image element
    img.alt = ""; // setting alternative text
    img.setAttribute("img-id", imgId); // setting image id
    img.setAttribute("onclick", `openModal("${imgId}")`)

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
    createModals(caption, date, imgId) // and creating modal for the image (description popup)
  }
}

getMedia(); // run the script
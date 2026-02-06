const howMany = 5

async function getMedia() {
  let data = await fetch('scripts/API.json')
    .then(function(response) {
      return response.json();
    })
  for (let i = 0; i < howMany; i++) {
    let header = document.createElement("h5")
    let date = data.data[i].timestamp.substring(0, 10);
    date = date.split('-');
    date = `${date[2]}.${date[1]}.${date[0]}`;
    date = document.createTextNode("Julkaistu: " + date);
    header.appendChild(date);
    let img = document.createElement("img");
    // Extract filename from URL and use local images instead of expired Instagram CDN URLs
    let imgName = data.data[i].media_url.split("/").join("?").split("?")[5];
    img.src = "images/" + imgName;
    img.alt = data.data[i].caption.split("#")[0].trim(); // Use caption as alt text
    let caption = document.createElement("p");
    let text = document.createTextNode(data.data[i].caption);
    caption.appendChild(text);
    let article = document.getElementsByClassName("img-content")[0];
    article.appendChild(header);
    article.appendChild(img);
    article.appendChild(caption);
  }
}

getMedia();
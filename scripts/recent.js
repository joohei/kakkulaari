const howMany = 5

async function getMedia() {
  let data = await fetch('API.json')
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
    let imgUrl = data.data[i].media_url
    img.src = imgUrl;
    img.alt = "Instagram API photo";
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
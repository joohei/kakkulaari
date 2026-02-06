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
    let mediaUrl = data.data[i].media_url || '';
    let imgName = mediaUrl.split('/').pop().split('?')[0]; // Get last path segment, remove query params
    img.src = imgName ? "images/" + imgName : "images/placeholder";
    let caption = data.data[i].caption || '';
    img.alt = caption.split("#")[0].trim() || "Leivonnainen"; // Use caption as alt text, fallback if empty
    let captionEl = document.createElement("p");
    let text = document.createTextNode(caption);
    captionEl.appendChild(text);
    let article = document.getElementsByClassName("img-content")[0];
    article.appendChild(header);
    article.appendChild(img);
    article.appendChild(captionEl);
  }
}

getMedia();
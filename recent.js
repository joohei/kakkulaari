const accessToken = "IGQVJWWnRyVXhkNlVWckk2Rkd2dThNeW5VQUhNZAGhLNTFEcWl1c0JCMFBSRTk3X0FVSDY4RFljZAjRZAVnRrYU5aV2pEV2lIblZA4RWlxQUg3enZAWS2JOYXcxZAmRZAbmFSdjVENktXaldaSHRHSGhLYkh4VAZDZD";

let dataUrl = `https://graph.instagram.com/me/media?fields=media_url,caption, timestamp&access_token=${accessToken}`;

async function getMedia(dataUrl) {
  let response = await fetch(dataUrl);
  let data = await response.json();
  for (let i = 0; i < 4; i++) {
    let header = document.createElement("h5")
    let date = data.data[i].timestamp.substring(0, 10);
    date = date.split('-');
    date = `${date[2]}.${date[1]}.${date[0]}`;
    date = document.createTextNode("Julkaistu: " + date);
    header.appendChild(date);
    let img = document.createElement("img");
    let imgUrl = data.data[i].media_url
    img.src = imgUrl;
    img.alt = data.data[i].caption;
    let caption = document.createElement("p");
    let text = document.createTextNode(data.data[i].caption);
    caption.appendChild(text);
    let article = document.getElementsByClassName("img-content")[0];
    article.appendChild(header);
    article.appendChild(img);
    article.appendChild(caption);
  }
}

getMedia(dataUrl);

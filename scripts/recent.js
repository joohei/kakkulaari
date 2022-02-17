const accessToken = "IGQVJWWnRyVXhkNlVWckk2Rkd2dThNeW5VQUhNZAGhLNTFEcWl1c0JCMFBSRTk3X0FVSDY4RFljZAjRZAVnRrYU5aV2pEV2lIblZA4RWlxQUg3enZAWS2JOYXcxZAmRZAbmFSdjVENktXaldaSHRHSGhLYkh4VAZDZD";

let dataUrl = `https://graph.instagram.com/me/media?fields=media_url,caption, timestamp&access_token=${accessToken}`;

async function getMedia(dataUrl) {
  let response = await fetch(dataUrl);
  let data = await response.json();
  for (let i = 0; i < 4; i++) {
    let br = document.createElement("br");
    let img = document.createElement("img");
    let imgUrl = data.data[i].media_url
    img.src = imgUrl;
    img.alt = data.data[i].caption;
    let date = data.data[i].timestamp.substring(0, 10);
    date = date.split('-');
    date = `${date[2]}.${date[1]}.${date[0]}`;
    date = document.createTextNode("Julkaistu: " + date);
    let caption = document.createTextNode(data.data[i].caption);
    let recent = document.getElementsByClassName("recent")[0];
    recent.appendChild(br)
    recent.appendChild(date);
    recent.appendChild(img);
    recent.appendChild(caption);
    recent.appendChild(br)
  }
}

getMedia(dataUrl);

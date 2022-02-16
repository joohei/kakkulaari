const accessToken = "IGQVJWWnRyVXhkNlVWckk2Rkd2dThNeW5VQUhNZAGhLNTFEcWl1c0JCMFBSRTk3X0FVSDY4RFljZAjRZAVnRrYU5aV2pEV2lIblZA4RWlxQUg3enZAWS2JOYXcxZAmRZAbmFSdjVENktXaldaSHRHSGhLYkh4VAZDZD";

let dataUrl = `https://graph.instagram.com/me/media?fields=media_url,caption&access_token=${accessToken}`;

async function getMedia(dataUrl) {
  let response = await fetch(dataUrl);
  let data = await response.json();
  let img = document.createElement("img");
  let imgUrl = data.data[0].media_url
  img.src = imgUrl;
  img.alt = data.data[0].caption;
  let recent = document.getElementsByClassName("recent")[0];
  recent.appendChild(img);
}

getMedia(dataUrl);

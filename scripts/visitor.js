const hitUrl = "https://api.countapi.xyz/get/kakkulaari/mollamersu";
const visitorCounter = document.querySelector(".visitor-counter")

async function newVisitor(hitUrl, visitorCounter) {
  let response = await fetch(hitUrl);
  let data = await response.json()
  let visitorNumber = data.value
  console.log(visitorNumber)
}

newVisitor(hitUrl, visitorCounter)

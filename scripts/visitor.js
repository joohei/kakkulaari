const hitUrl = "https://api.countapi.xyz/hit/kakkulaari/mollamersu";
const visitorCounter = document.querySelector(".visitor-counter")

async function newVisitor(hitUrl, visitorCounter) {
  let response = await fetch(hitUrl);
  let data = await response.json();
  let visitorNumber = data.value;
  visitorCounter.innerText = `Sivulla vierailtu ${visitorNumber} kertaa`;
}

newVisitor(hitUrl, visitorCounter)

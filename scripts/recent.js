const howMany = 5;

async function getMedia() {
  const data = await fetch("scripts/API.json").then((r) => r.json());
  const container = document.querySelector(".img-content");
  if (!container || !data || !data.data) return;

  const posts = [];
  for (let i = 0; i < Math.min(howMany, data.data.length); i++) {
    const item = data.data[i];
    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("h5");
    header.textContent = `Julkaistu: ${item.timestamp.substring(0, 10).split("-").reverse().join(".")}`;

    const img = document.createElement("img");
    img.loading = "lazy";
    img.decoding = "async";
    const mediaUrl = item.media_url || "";
    const imgName = mediaUrl.split("/").pop().split("?")[0] || "";
    img.src = imgName ? `images/${imgName}` : "images/placeholder.png";
    img.onerror = () => {
      if (!img.dataset._errored) {
        img.dataset._errored = "1";
        img.src = "images/placeholder.png";
      }
    };
    img.alt = (item.caption || "").split("#")[0].trim() || "Leivonnainen";

    const captionEl = document.createElement("p");
    captionEl.textContent = item.caption || "";

    post.append(header, img, captionEl);
    posts.push(post);
  }

  function colsCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function balanceMasonry() {
    container.classList.add("js-masonry");
    container.innerHTML = "";
    const cols = colsCount();
    const columns = Array.from({ length: cols }, () => {
      const c = document.createElement("div");
      c.className = "masonry-column";
      container.appendChild(c);
      return c;
    });
    for (const p of posts) {
      let shortest = columns[0];
      for (const c of columns)
        if (c.offsetHeight < shortest.offsetHeight) shortest = c;
      shortest.appendChild(p);
    }
  }

  balanceMasonry();
  let rt;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(balanceMasonry, 150);
  });
}

getMedia();

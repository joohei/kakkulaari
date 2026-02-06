function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createModals(caption, date, id) {
  const body = document.body;
  const container = document.createElement("div");
  container.className = "modal-container";
  container.id = id;
  container.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title-${id}">
      <div class="modal-header">
        <h2 class="modal-title" id="modal-title-${id}">kuvaus</h2>
        <button class="close-btn" aria-label="Sulje">&times;</button>
      </div>
      <div class="modal-content">
        <p class="modal-text">${escapeHtml((caption.split("#")[0] || "").trim())}</p>
        <br>
        <p class="modal-text">${escapeHtml("#" + caption.split("#").slice(1).join("#"))}</p>
        <h5 class="modal-date">${escapeHtml(date || "")}</h5>
      </div>
    </div>
  `;
  body.appendChild(container);

  const closeBtn = container.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => closeModal(id));

  // Click outside modal to close
  container.addEventListener("click", (e) => {
    if (e.target === container) closeModal(id);
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add("active");
  document.body.classList.add("no-scroll");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

async function getMedia() {
  const filterItem = document.querySelector(".item.is-active");
  const searchInput = (document.getElementById("search")?.value || "").trim();
  const filter =
    searchInput === ""
      ? (
          (filterItem && filterItem.getAttribute("data-class")) ||
          "all"
        ).toLowerCase()
      : searchInput.toLowerCase();

  const data = await fetch("scripts/API.json").then((r) => r.json());
  const gallery = document.querySelector(".gallery");
  if (!gallery || !data || !data.data) return;

  const frag = document.createDocumentFragment();

  for (const item of data.data) {
    const img = document.createElement("img");

    const mediaUrl = item.media_url || "";
    const imgName = mediaUrl.split("/").pop().split("?")[0] || "";
    const caption = item.caption || "";
    let dateText = "";
    if (item.timestamp) {
      const parts = item.timestamp.substring(0, 10).split("-");
      if (parts.length === 3)
        dateText = `Julkaistu: ${parts[2]}.${parts[1]}.${parts[0]}`;
    }
    const id = String(item.id);

    img.loading = "lazy";
    img.decoding = "async";
    img.src = `images/${imgName}`;
    const captionText = (caption.split("#")[0] || "").trim();
    const altText = captionText || dateText || "Leivonnainen";
    img.alt = altText;
    img.setAttribute("img-id", id);
    img.addEventListener("click", () => openModal(id));

    const hashtags = caption
      .split("#")
      .slice(1)
      .map((t) => t.trim())
      .filter(Boolean);
    img.setAttribute("tags", hashtags.join(","));
    const lc = hashtags.map((h) => h.toLowerCase());

    let dataClass = "other";
    if (lc.some((h) => h.includes("sweetpastry"))) dataClass = "sweet";
    else if (lc.some((h) => h.includes("saltypastry"))) dataClass = "salty";
    img.setAttribute("data-class", dataClass);

    if (
      filter === "all" ||
      filter === dataClass ||
      lc.some((t) => t.includes(filter))
    ) {
      img.classList.add("show");
      img.classList.remove("hide");
    } else {
      img.classList.add("hide");
      img.classList.remove("show");
    }

    frag.appendChild(img);
    createModals(caption, dateText, id);
  }

  gallery.appendChild(frag);

  // let filter.js handle applying current filter after images are ready
  if (typeof applyFilter === "function") {
    const active = document.querySelector(".filters .is-active");
    applyFilter(active?.getAttribute("data-class"));
  }
  document.dispatchEvent(new CustomEvent("images:ready"));
}

getMedia();

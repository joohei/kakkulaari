const filters = document.querySelector(".filters");

function applyFilter(filterName) {
  const imgs = document.querySelectorAll(".gallery img");
  const f = (filterName || "all").toLowerCase();
  imgs.forEach((img) => {
    const imgClass = (img.getAttribute("data-class") || "other").toLowerCase();
    if (f === "all" || imgClass === f) {
      img.classList.add("show");
      img.classList.remove("hide");
    } else {
      img.classList.add("hide");
      img.classList.remove("show");
    }
  });
}

if (filters) {
  filters.addEventListener("click", (e) => {
    const item = e.target.closest(".item");
    if (!item) return;
    filters.querySelector(".is-active")?.classList.remove("is-active");
    item.classList.add("is-active");
    applyFilter(item.getAttribute("data-class"));
  });

  // Apply current active filter on load or when images get added
  const active = filters.querySelector(".is-active");
  if (active) applyFilter(active.getAttribute("data-class"));
  document.addEventListener("images:ready", () => {
    const a = filters.querySelector(".is-active");
    if (a) applyFilter(a.getAttribute("data-class"));
  });
}

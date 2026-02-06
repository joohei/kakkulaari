const searchInput = document.querySelector("[data-search]");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.trim().toLowerCase();
    const imgs = document.querySelectorAll(".gallery img");
    const filters = document.querySelector(".filters");
    if (filters && value !== "") {
      filters.querySelector(".is-active")?.classList.remove("is-active");
      const allFilter = filters.querySelector('.item[data-class="all"]');
      if (allFilter) allFilter.classList.add("is-active");
    }

    if (value === "") {
      // restore filtered view
      const active = document.querySelector(".filters .is-active");
      if (typeof applyFilter === "function")
        applyFilter(active?.getAttribute("data-class"));
      return;
    }

    imgs.forEach((img) => {
      const tagsAttr = img.getAttribute("tags") || "";
      const tags = tagsAttr
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);
      const matches = tags.some((t) => t.includes(value));
      if (matches) {
        img.classList.add("show");
        img.classList.remove("hide");
      } else {
        img.classList.add("hide");
        img.classList.remove("show");
      }
    });
  });
}

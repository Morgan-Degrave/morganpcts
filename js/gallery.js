/**
 * Galerie slideshow — images triées par numéro dans le nom de fichier.
 */
(function () {
  const stage = document.querySelector("[data-gallery]");
  if (!stage) return;

  const images = JSON.parse(stage.dataset.images || "[]");
  if (!images.length) return;

  const mainImg = stage.querySelector(".gallery__main img");
  const thumbsContainer = stage.querySelector(".gallery__thumbs");
  const prevBtn = stage.querySelector("[data-prev]");
  const nextBtn = stage.querySelector("[data-next]");

  let index = 0;

  function show(i) {
    index = (i + images.length) % images.length;
    mainImg.classList.remove("is-visible");
    requestAnimationFrame(() => {
      mainImg.src = images[index];
      mainImg.alt = `Photo ${index + 1}`;
      mainImg.onload = () => mainImg.classList.add("is-visible");
      if (mainImg.complete) mainImg.classList.add("is-visible");
    });
    thumbsContainer
      .querySelectorAll(".gallery__thumb")
      .forEach((btn, j) => btn.classList.toggle("is-active", j === index));
  }

  images.forEach((src, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gallery__thumb" + (i === 0 ? " is-active" : "");
    btn.setAttribute("aria-label", `Photo ${i + 1}`);
    const thumb = document.createElement("img");
    thumb.src = src;
    thumb.alt = "";
    btn.appendChild(thumb);
    btn.addEventListener("click", () => show(i));
    thumbsContainer.appendChild(btn);
  });

  prevBtn?.addEventListener("click", () => show(index - 1));
  nextBtn?.addEventListener("click", () => show(index + 1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });

  show(0);
})();

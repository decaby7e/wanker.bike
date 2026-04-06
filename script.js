const merchCards = Array.from(document.querySelectorAll(".merch-card"));
const featuredName = document.getElementById("featured-name");
const featuredCopy = document.getElementById("featured-copy");
const featuredPrice = document.getElementById("featured-price");
const featuredImage = document.getElementById("featured-image");
const shuffleButton = document.getElementById("shuffle-button");

function setFeatured(card) {
  merchCards.forEach((item) => {
    const isActive = item === card;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-pressed", String(isActive));
  });
  featuredName.textContent = card.dataset.name;
  featuredCopy.textContent = card.dataset.copy;
  featuredPrice.textContent = card.dataset.price;
  featuredImage.src = card.dataset.image;
  featuredImage.alt = card.dataset.alt;
}

merchCards.forEach((card) => {
  card.tabIndex = 0;
  card.addEventListener("click", () => setFeatured(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setFeatured(card);
    }
  });
});

shuffleButton.addEventListener("click", () => {
  const inactiveCards = merchCards.filter((card) => !card.classList.contains("is-active"));
  const nextCard = inactiveCards[Math.floor(Math.random() * inactiveCards.length)];
  setFeatured(nextCard);
});

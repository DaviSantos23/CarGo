
let currentIndex = 0;
const slide = document.querySelector(".carousel-slide");
const images = document.querySelectorAll(".carousel-slide img");
const totalSlides = images.length;

function updateCarousel() {
  const containerWidth = document.querySelector(".carousel-container").offsetWidth;
  slide.style.transform = `translateX(${-currentIndex * containerWidth}px)`;
}

document.querySelector(".carousel-btn.next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
});

document.querySelector(".carousel-btn.prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
});

// Auto rotation every 5 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}, 5000);

// Resize handler in case window changes size
window.addEventListener("resize", updateCarousel);

// Initialize
updateCarousel();

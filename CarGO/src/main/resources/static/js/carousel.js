
let currentIndex = 0;
const slide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
const totalSlides = images.length;

function updateCarousel() {
  slide.style.transform = `translateX(${-currentIndex * 100}vw)`;
}

document.querySelector('.carousel-btn.next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
});

document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
});

setInterval(() => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}, 5000);